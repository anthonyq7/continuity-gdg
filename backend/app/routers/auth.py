"""
Authentication endpoints

Endpoints:
- POST /api/auth/signup - Create a new user account
- POST /api/auth/login - Login with email and password
- POST /api/auth/logout - Logout current user
- GET /api/auth/me - Get current user information
"""
from fastapi import APIRouter, HTTPException, Depends
from app.models import SignUpRequest, LoginRequest
from app.dependencies import get_current_user, supabase

router = APIRouter(prefix="/api/auth", tags=["auth"])

@router.post("/signup")
async def signup(request: SignUpRequest):
    """
    Create a new user account.
    
    Request body:
    - email: User email address
    - password: User password
    
    Returns:
    - user: User object
    - session: Session object with access_token
    """
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

@router.post("/login")
async def login(request: LoginRequest):
    """
    Login with email and password.
    
    Request body:
    - email: User email address
    - password: User password
    
    Returns:
    - user: User object
    - session: Session object with access_token
    """
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

@router.post("/logout")
async def logout(user=Depends(get_current_user)):
    """
    Logout the current user.
    
    Requires authentication.
    
    Returns:
    - success: Boolean indicating success
    """
    try:
        supabase.auth.sign_out()
        return {"success": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/me")
async def get_me(user=Depends(get_current_user)):
    """
    Get current user information.
    
    Requires authentication.
    
    Returns:
    - user: Current user object
    """
    return {"user": user}

