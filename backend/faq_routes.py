from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from supabase import create_client, Client
from typing import Optional, List
import os
from datetime import datetime

# Create router for FAQ endpoints
router = APIRouter(prefix="/api/faqs", tags=["FAQs"])

# Supabase configuration
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Pydantic models for request/response validation
class FAQCreate(BaseModel):
    question: str
    answer: str

class FAQUpdate(BaseModel):
    question: Optional[str] = None
    answer: Optional[str] = None

class FAQResponse(BaseModel):
    id: int
    question: str
    answer: str
    created_at: str
    updated_at: Optional[str] = None

# CREATE - Add new FAQ
@router.post("", response_model=FAQResponse, status_code=201)
async def create_faq(faq: FAQCreate):
    """Create a new FAQ entry"""
    try:
        data = {
            "question": faq.question,
            "answer": faq.answer
        }
        response = supabase.table("faqs").insert(data).execute()
        
        if not response.data:
            raise HTTPException(status_code=400, detail="Failed to create FAQ")
        
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating FAQ: {str(e)}")

# READ ALL - Get all FAQs
@router.get("", response_model=List[FAQResponse])
async def get_all_faqs():
    """Retrieve all FAQ entries"""
    try:
        response = supabase.table("faqs").select("*").execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching FAQs: {str(e)}")

# READ ONE - Get specific FAQ by ID
@router.get("/{faq_id}", response_model=FAQResponse)
async def get_faq(faq_id: int):
    """Retrieve a specific FAQ by ID"""
    try:
        response = supabase.table("faqs").select("*").eq("id", faq_id).execute()
        
        if not response.data:
            raise HTTPException(status_code=404, detail=f"FAQ with id {faq_id} not found")
        
        return response.data[0]
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching FAQ: {str(e)}")

# UPDATE - Update existing FAQ
@router.put("/{faq_id}", response_model=FAQResponse)
async def update_faq(faq_id: int, faq: FAQUpdate):
    """Update an existing FAQ entry"""
    try:
        # Check if FAQ exists
        existing = supabase.table("faqs").select("*").eq("id", faq_id).execute()
        if not existing.data:
            raise HTTPException(status_code=404, detail=f"FAQ with id {faq_id} not found")
        
        # Build update data (only include fields that were provided)
        update_data = {}
        if faq.question is not None:
            update_data["question"] = faq.question
        if faq.answer is not None:
            update_data["answer"] = faq.answer
        
        if not update_data:
            raise HTTPException(status_code=400, detail="No fields to update")
        
        update_data["updated_at"] = datetime.utcnow().isoformat()
        
        response = supabase.table("faqs").update(update_data).eq("id", faq_id).execute()
        
        if not response.data:
            raise HTTPException(status_code=400, detail="Failed to update FAQ")
        
        return response.data[0]
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating FAQ: {str(e)}")

# DELETE - Remove FAQ
@router.delete("/{faq_id}", status_code=204)
async def delete_faq(faq_id: int):
    """Delete an FAQ entry"""
    try:
        # Check if FAQ exists
        existing = supabase.table("faqs").select("*").eq("id", faq_id).execute()
        if not existing.data:
            raise HTTPException(status_code=404, detail=f"FAQ with id {faq_id} not found")
        
        supabase.table("faqs").delete().eq("id", faq_id).execute()
        return None
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting FAQ: {str(e)}")