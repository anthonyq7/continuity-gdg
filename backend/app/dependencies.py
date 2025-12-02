"""Dependencies for FastAPI routes"""
from fastapi import HTTPException, Header
from typing import Optional
from supabase import Client
from app.config import SUPABASE_URL, SUPABASE_ANON_KEY
from supabase import create_client

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)

# Auth dependency (required)
async def get_current_user(authorization: Optional[str] = Header(None)):
    """
    Get the current authenticated user.
    Raises 401 if no token is provided or token is invalid.
    """
    if not authorization:
        raise HTTPException(status_code=401, detail="No token provided")
    
    try:
        token = authorization.replace("Bearer ", "")
        user = supabase.auth.get_user(token)
        if not user or not user.user:
            raise HTTPException(status_code=401, detail="Invalid token")
        return user.user
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

# Optional auth dependency (returns None if no auth)
async def get_optional_user(authorization: Optional[str] = Header(None)):
    """
    Get user if authenticated, otherwise return None for anonymous access.
    This allows endpoints to work with or without authentication.
    """
    if not authorization:
        return None
    
    try:
        token = authorization.replace("Bearer ", "")
        user = supabase.auth.get_user(token)
        if user and user.user:
            return user.user
    except Exception:
        pass
    
    return None

