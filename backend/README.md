# Continuity GDG Backend

## Setup

1. Install dependencies:
```bash
uv sync
```

2. Create a `.env` file in the backend directory with your OpenAI API key:
```
OPENAI_API_KEY=your_actual_openai_api_key_here
```

3. Run the server:
```bash
uv run python main.py
```

The server will start on http://localhost:8000

## API Endpoints

- `GET /` - Health check
- `POST /chat` - Chat with OpenAI (expects `{"message": "your message"}`)

