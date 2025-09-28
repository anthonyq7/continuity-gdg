from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Continuity GDG Backend", version="0.1.0")


@app.get("/")
async def root():
    return {"status": "online"}


class HiBody(BaseModel):
    name: str


@app.post("/")
async def hi(body: HiBody):
    return f"hi {body.name}"


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
