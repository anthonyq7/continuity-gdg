"""
Chat endpoints

Endpoints:
- POST /api/chat - Send a message to the chatbot (works with or without authentication)
- GET /api/chat/history - Get chat history (works with or without authentication)
- GET /api/chat/recent - Get most recent 20 messages from all users
"""

from fastapi import APIRouter, HTTPException, Depends, Request
from fastapi.responses import JSONResponse
from typing import Optional, Any
import httpx
from app.models import ChatRequest
from app.dependencies import get_optional_user, supabase
from app.utils import get_session_id
from app.config import N8N_CHAT_WEBHOOK_URL

router = APIRouter(prefix="/api/chat", tags=["chat"])


@router.post("")
async def chat(request: ChatRequest, http_request: Request, user: Optional[Any] = Depends(get_optional_user)):
    """
    Send a message to the chatbot.

    Works with or without authentication:
    - With auth: Uses authenticated user's session ID
    - Without auth: Creates/generates anonymous session ID (stored in cookie)

    Request body:
    - message: The chat message to send

    Returns:
    - Chatbot response (from n8n webhook)

    Note: For anonymous users, a cookie is set to maintain session continuity.
    """
    try:
        # Get session ID (from authenticated user or anonymous)
        session_id = get_session_id(http_request, user)
        email = user.email if user else None

        # Call n8n webhook with user context
        async with httpx.AsyncClient() as client:
            webhook_data = {
                "sessionId": session_id,
                "message": request.message,
            }
            if email:
                webhook_data["email"] = email

            response = await client.post(N8N_CHAT_WEBHOOK_URL, json=webhook_data, timeout=30.0)

            result = response.json()

            # Set cookie for anonymous users so they can retrieve their history
            if not user:
                json_response = JSONResponse(content=result)
                json_response.set_cookie(
                    key="anonymous_session_id",
                    value=session_id,
                    max_age=60 * 60 * 24 * 30,  # 30 days
                    httponly=True,
                    samesite="lax",
                )
                return json_response

            return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chat failed: {str(e)}")


@router.get("/history")
async def get_chat_history(http_request: Request, user: Optional[Any] = Depends(get_optional_user)):
    """
    Get chat history for the current session.

    Works with or without authentication:
    - With auth: Returns messages for authenticated user
    - Without auth: Returns messages for anonymous session (from cookie)

    Returns:
    - messages: Array of chat messages

    Each message contains:
    - type: Message type ("human" or "ai")
    - content: Message content text
    """
    try:
        # Get session ID (from authenticated user or anonymous cookie)
        session_id = get_session_id(http_request, user)

        response = (
            supabase.table("n8n_chat_histories").select("*").eq("session_id", session_id).order("id", desc=False).execute()
        )

        return {"messages": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Could not fetch history: {str(e)}")


@router.get("/recent")
async def get_recent_messages():
    """
    Get the most recent 20 chat messages from all users.

    Returns the latest 20 messages across all sessions, ordered by ID descending.

    Returns:
    - messages: Array of the 20 most recent chat messages

    Each message contains:
    - message: Message content
    - type: Message type ("human" or "ai")
    - content: Message content text
    """
    try:
        response = (
            supabase.table("n8n_chat_histories")
            .select("*")
            .order("id", desc=True)
            .limit(20)
            .execute()
        )

        # Reverse to show oldest first (most recent at the end)
        raw_messages = list(reversed(response.data))

        # Transform to only include type and content
        messages = []
        for msg in raw_messages:
            msg_data = msg.get("message", {})
            messages.append(
                {
                    "type": msg_data.get("type", ""),
                    "content": msg_data.get("content", ""),
                }
            )

        return {"messages": messages}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Could not fetch recent messages: {str(e)}")
