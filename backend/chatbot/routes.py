from fastapi import APIRouter, HTTPException

from .schemas import ChatMessage, ChatResponse
from .service import generate_chat_response


router = APIRouter(prefix="/chat", tags=["chatbot"])


@router.post("/", response_model=ChatResponse)
async def chat(body: ChatMessage) -> ChatResponse:
    try:
        response_text = generate_chat_response(body.message)
        return ChatResponse(response=response_text)
    except RuntimeError as e:
        # Configuration error like missing API key
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing chat request: {str(e)}")


