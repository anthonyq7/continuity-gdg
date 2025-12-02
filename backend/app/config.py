"""Configuration and environment variables"""

import os
from dotenv import load_dotenv

load_dotenv()

# Supabase configuration
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY")

# Frontend configuration
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

# N8N webhook configuration
N8N_CHAT_WEBHOOK_URL = os.getenv("N8N_CHAT_WEBHOOK_URL")

# Google Calendar configuration
GOOGLE_SERVICE_ACCOUNT_FILE = os.getenv("GOOGLE_SERVICE_ACCOUNT_FILE", "service_account.json")
GOOGLE_CALENDAR_ID = os.getenv("GOOGLE_CALENDAR_ID", "primary")
GOOGLE_SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"]
