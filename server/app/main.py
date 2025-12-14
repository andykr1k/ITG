from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
import os

from app.ai import ITGAssistant

load_dotenv()

app = FastAPI(title="ITG Chat API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SECRET_TOKEN = os.getenv("UPLOAD_TOKEN", "changeme")

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# AI Assistant instance (in production, manage per-user sessions)
assistant = ITGAssistant(model=client)

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str


class StepRequest(BaseModel):
    goal: str


class Step(BaseModel):
    step_number: int
    title: str
    description: str


class StepsResponse(BaseModel):
    goal: str
    steps: list[Step]

@app.get("/")
def root():
    return {"status": "ok", "message": "ITG Chat API running"}

@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest, token: str = Header(...)):
    if token != SECRET_TOKEN:
        raise HTTPException(403, "Invalid token")
    """Send a message to ChatGPT and get a response."""
    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "user", "content": request.message}
            ]
        )
        reply = response.choices[0].message.content
        return ChatResponse(reply=reply)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/get_steps", response_model=StepsResponse)
def get_steps(request: StepRequest, token: str = Header(...)):
    """Break down a goal into manageable steps using foundation model."""
    if token != SECRET_TOKEN:
        raise HTTPException(403, "Invalid token")
    try:
        steps = assistant.generate_steps(request.goal)
        return StepsResponse(goal=request.goal, steps=steps)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
