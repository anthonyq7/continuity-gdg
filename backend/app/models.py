"""Pydantic models for request/response validation"""

from pydantic import BaseModel, EmailStr


# Auth models
class SignUpRequest(BaseModel):
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


# Chat models
class ChatRequest(BaseModel):
    message: str

# Calendar models
class CalendarEventsRequest(BaseModel):
    year: int
    month: int
