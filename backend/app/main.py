"""
Main FastAPI application

This is the entry point for the backend API server.
All routes are organized in separate router modules for better maintainability.

API Structure:
- /api/auth/* - Authentication endpoints (signup, login, logout, me)
- /api/chat/* - Chat endpoints (send message, get history)
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import FRONTEND_URL
from app.routers import auth, chat

# Create FastAPI app
app = FastAPI(
    title="Continuity GDG Backend", version="0.1.0", description="Backend API for Continuity GDG chatbot application"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(chat.router)


# Root endpoint
@app.get("/")
async def root():
    """
    Health check endpoint.

    Returns:
    - status: "online"
    """
    return {"status": "online"}
