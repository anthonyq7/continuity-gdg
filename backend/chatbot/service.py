import os
from openai import OpenAI


def get_openai_client() -> OpenAI:
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        # Defer raising to caller; they can map to HTTP error
        raise RuntimeError("OpenAI API key not configured")
    return OpenAI(api_key=api_key)


def generate_chat_response(user_message: str) -> str:
    client = get_openai_client()
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": user_message},
        ],
        max_tokens=1000,
        temperature=0.7,
    )
    return response.choices[0].message.content


