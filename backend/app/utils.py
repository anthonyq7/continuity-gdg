"""Utility functions"""

import uuid
from fastapi import Request
from typing import Optional, Any


def get_session_id(request: Request, user: Optional[Any] = None) -> str:
    """
    Get session ID from authenticated user, cookie, or generate a new one.

    Args:
        request: FastAPI Request object
        user: Authenticated user object (optional)

    Returns:
        Session ID string (user ID or anonymous session ID)
    """
    # If user is authenticated, use their user ID
    if user:
        return user.id

    # Try to get from cookie (for anonymous users)
    session_id = request.cookies.get("anonymous_session_id")
    if session_id:
        return session_id

    # Generate new anonymous session ID
    return str(uuid.uuid4())
