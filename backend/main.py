from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(title="Continuity GDG Backend", version="0.1.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OpenAI client
api_key = os.getenv("OPENAI_API_KEY")
print(f"API Key loaded: {api_key[:20]}..." if api_key else "No API key found")
openai_client = OpenAI(api_key=api_key)

@app.get("/")
async def root():
    return {"status": "online"}


class HiBody(BaseModel):
    name: str


@app.post("/")
async def hi(body: HiBody):
    return f"hi {body.name}"


class ChatMessage(BaseModel):
    message: str


class ChatResponse(BaseModel):
    response: str


@app.post("/chat", response_model=ChatResponse)
async def chat(body: ChatMessage):
    try:
        print(f"Received chat request: {body.message}")
        
        if not openai_client.api_key:
            print("ERROR: No API key found")
            raise HTTPException(status_code=500, detail="OpenAI API key not configured")
        
        print("Making OpenAI API call...")
        response = openai_client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": body.message}
            ],
            max_tokens=1000,
            temperature=0.7
        )
        
        print(f"OpenAI response received: {response.choices[0].message.content[:100]}...")
        return ChatResponse(response=response.choices[0].message.content)
    
    except Exception as e:
        print(f"ERROR in chat endpoint: {str(e)}")
        print(f"ERROR type: {type(e)}")
        import traceback
        print(f"ERROR traceback: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=f"Error processing chat request: {str(e)}")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
