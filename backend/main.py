import os
from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from supabase import create_client, Client
import httpx
from typing import Optional
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Continuity GDG Backend", version="0.1.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Supabase
supabase: Client = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_ANON_KEY")
)

# Pydantic models
class SignUpRequest(BaseModel):
    email: EmailStr
    password: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class ChatRequest(BaseModel):
    message: str

# Auth dependency
async def get_current_user(authorization: Optional[str] = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="No token provided")
    
    try:
        token = authorization.replace("Bearer ", "")
        user = supabase.auth.get_user(token)
        if not user or not user.user:
            raise HTTPException(status_code=401, detail="Invalid token")
        return user.user
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid token")

# Routes
@app.get("/")
async def root():
    return {"status": "online"}

@app.post("/api/auth/signup")
async def signup(request: SignUpRequest):
    try:
        response = supabase.auth.sign_up({
            "email": request.email,
            "password": request.password
        })
        return {
            "user": response.user,
            "session": response.session
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/auth/login")
async def login(request: LoginRequest):
    try:
        response = supabase.auth.sign_in_with_password({
            "email": request.email,
            "password": request.password
        })
        return {
            "user": response.user,
            "session": response.session
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/auth/logout")
async def logout(user=Depends(get_current_user)):
    try:
        supabase.auth.sign_out()
        return {"success": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/auth/me")
async def get_me(user=Depends(get_current_user)):
    return {"user": user}

@app.post("/api/chat")
async def chat(request: ChatRequest, user=Depends(get_current_user)):
    try:
        # Call n8n webhook with user context
        async with httpx.AsyncClient() as client:
            response = await client.post(
                os.getenv("N8N_CHAT_WEBHOOK_URL"),
                json={
                    "sessionId": user.id,
                    "message": request.message,
                    "email": user.email
                },
                timeout=30.0
            )
            return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chat failed: {str(e)}")

@app.get("/api/chat/history")
async def get_chat_history(user=Depends(get_current_user)):
    try:
        # Filter by session_id which contains user.id (sent to n8n as sessionId)
        # This returns all messages for a user across all sessions
        response = supabase.table("n8n_chat_histories")\
            .select("*")\
            .eq("session_id", user.id)\
            .order("id", desc=False)\
            .execute()
        
        return {"messages": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Could not fetch history: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)