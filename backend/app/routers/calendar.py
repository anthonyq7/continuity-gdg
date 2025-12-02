"""
Google Calendar endpoints

Endpoints:
- GET /api/calendar/events?year=2024&month=1 - Get all events for a given month and year

Uses service account authentication (no OAuth required).
"""

from datetime import datetime, timezone
from fastapi import APIRouter, HTTPException, Query
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from app.config import GOOGLE_SERVICE_ACCOUNT_FILE, GOOGLE_CALENDAR_ID, GOOGLE_SCOPES
import os

router = APIRouter(prefix="/api/calendar", tags=["calendar"])


def get_google_credentials():
    """
    Get Google credentials using service account.
    Service account doesn't require OAuth flow or redirect URI setup.
    """
    if not GOOGLE_SERVICE_ACCOUNT_FILE:
        raise HTTPException(
            status_code=500,
            detail="GOOGLE_SERVICE_ACCOUNT_FILE not configured. Please set it in your .env file.",
        )

    if not os.path.exists(GOOGLE_SERVICE_ACCOUNT_FILE):
        raise HTTPException(
            status_code=500,
            detail=f"Service account file not found: {GOOGLE_SERVICE_ACCOUNT_FILE}",
        )

    try:
        creds = service_account.Credentials.from_service_account_file(
            GOOGLE_SERVICE_ACCOUNT_FILE, scopes=GOOGLE_SCOPES
        )
        return creds
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to load service account: {str(e)}"
        )


def get_calendar_service():
    """Get Google Calendar service instance using service account"""
    creds = get_google_credentials()

    try:
        service = build("calendar", "v3", credentials=creds)
        return service
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create calendar service: {str(e)}")


@router.get("/events")
async def get_calendar_events(
    year: int = Query(..., description="Year (e.g., 2024)"),
    month: int = Query(..., description="Month (1-12)"),
):
    """
    Get all events for a given month and year.

    Query parameters:
    - year: The year (e.g., 2024)
    - month: The month (1-12)

    Returns:
    - events: Array of calendar events

    Each event contains:
    - id: Event ID
    - summary: Event title
    - start: Start date/time
    - end: End date/time
    - description: Event description (if available)
    - location: Event location (if available)
    """
    # Validate month
    if month < 1 or month > 12:
        raise HTTPException(status_code=400, detail="Month must be between 1 and 12")

    try:
        # Calculate time range for the month
        start_date = datetime(year, month, 1, tzinfo=timezone.utc)
        if month == 12:
            end_date = datetime(year + 1, 1, 1, tzinfo=timezone.utc)
        else:
            end_date = datetime(year, month + 1, 1, tzinfo=timezone.utc)

        # Get calendar service
        service = get_calendar_service()

        # Call the Calendar API
        events_result = (
            service.events()
            .list(
                calendarId=GOOGLE_CALENDAR_ID,
                timeMin=start_date.isoformat(),
                timeMax=end_date.isoformat(),
                singleEvents=True,
                orderBy="startTime",
            )
            .execute()
        )

        events = events_result.get("items", [])

        # Format events for response
        formatted_events = []
        for event in events:
            formatted_event = {
                "id": event.get("id"),
                "summary": event.get("summary", "No Title"),
                "start": event.get("start", {}).get("dateTime") or event.get("start", {}).get("date"),
                "end": event.get("end", {}).get("dateTime") or event.get("end", {}).get("date"),
            }

            # Add optional fields if they exist
            if "description" in event:
                formatted_event["description"] = event.get("description")
            if "location" in event:
                formatted_event["location"] = event.get("location")

            formatted_events.append(formatted_event)

        return {"events": formatted_events, "count": len(formatted_events)}

    except HttpError as error:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(error)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch calendar events: {str(e)}")


@router.get("/calendars")
async def list_calendars():
    """
    List all calendars accessible by the service account.
    Useful for finding the correct calendar ID.
    """
    try:
        service = get_calendar_service()

        # List all calendars
        calendar_list = service.calendarList().list().execute()

        calendars = []
        for calendar_item in calendar_list.get("items", []):
            calendars.append(
                {
                    "id": calendar_item.get("id"),
                    "summary": calendar_item.get("summary"),
                    "description": calendar_item.get("description"),
                    "accessRole": calendar_item.get("accessRole"),
                }
            )

        return {"calendars": calendars, "count": len(calendars)}

    except HttpError as error:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(error)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to list calendars: {str(e)}")


