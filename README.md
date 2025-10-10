# Continuity GDG - OpenAI Chatbot

A full-stack application with a Next.js frontend and FastAPI backend, featuring an OpenAI-powered chatbot.

## 🚀 Quick Start

### Prerequisites
- Node.js (for frontend)
- Python 3.12+ (for backend)
- OpenAI API key

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
uv sync
```

3. Create a `.env` file in the backend directory:
```bash
echo "OPENAI_API_KEY=your_actual_openai_api_key_here" > .env
```
Replace `your_actual_openai_api_key_here` with your actual OpenAI API key.

4. Start the backend server:
```bash
uv run python main.py
```
The backend will run on http://localhost:8000

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd continuity-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```
The frontend will run on http://localhost:3000

## 🎯 Features

- **AI Chatbot**: Powered by OpenAI's GPT-3.5-turbo model
- **Real-time Chat**: Interactive chat interface with typing indicators
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, dark-mode compatible interface
- **CORS Enabled**: Backend configured for frontend communication

## 🛠️ API Endpoints

- `GET /` - Health check
- `POST /chat` - Send message to OpenAI (expects `{"message": "your message"}`)

## 📁 Project Structure

```
continuity-gdg/
├── backend/
│   ├── main.py              # FastAPI backend with OpenAI integration
│   ├── pyproject.toml       # Python dependencies
│   └── README.md           # Backend setup instructions
├── continuity-frontend/
│   ├── src/
│   │   └── app/
│   │       ├── components/
│   │       │   └── ChatBot.tsx    # Chat interface component
│   │       ├── page.tsx           # Main page with chatbot
│   │       └── layout.tsx         # App layout
│   └── package.json        # Frontend dependencies
└── README.md              # This file
```

## 🔧 Configuration

### Environment Variables

**Backend (.env file):**
```
OPENAI_API_KEY=your_openai_api_key_here
```

### CORS Configuration

The backend is configured to allow requests from `http://localhost:3000`. If you change the frontend port, update the CORS settings in `backend/main.py`.

## 🚀 Deployment

### Backend
- The FastAPI backend can be deployed to any Python hosting service
- Make sure to set the `OPENAI_API_KEY` environment variable
- Update CORS origins for production domain

### Frontend
- The Next.js frontend can be deployed to Vercel, Netlify, or any static hosting service
- Update the API URL in `ChatBot.tsx` to point to your production backend

## 🔮 Future Enhancements

- Database integration for conversation history
- User authentication
- Custom AI prompts and context
- File upload support
- Multiple chat sessions
- Admin dashboard

## 📝 Notes

- The chatbot uses OpenAI's gpt-4o-mini
- All conversations are stateless (no history is stored)
- The backend includes error handling for API failures
- The frontend includes loading states and error messages

