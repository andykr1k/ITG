from fastapi import FastAPI, UploadFile, File, HTTPException, Header, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
import os
from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv()

app = FastAPI(title="Shared ENV Storage API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
SECRET_TOKEN = os.getenv("UPLOAD_TOKEN", "changeme")
ENV_PATH = "./app/storage/.env"

os.makedirs(os.path.dirname(ENV_PATH), exist_ok=True)

class HealthResponse(BaseModel):
    status: str


@app.get("/")
def root():
    return {"status": "ok", "message": "ENV Storage API running"}

@app.get("/env")
def download_env(    
    token: str = Header(...),
):
    if token != SECRET_TOKEN:
        raise HTTPException(403, "Invalid token")
    """Return the .env file."""
    if not os.path.exists(ENV_PATH):
        raise HTTPException(status_code=404, detail="No env file found.")
    return FileResponse(ENV_PATH, filename=".env")

@app.post("/env")
async def upload_env(
    file: UploadFile = File(...),
    token: str = Header(None)
):
    if token != SECRET_TOKEN:
        raise HTTPException(403, "Invalid token")
    """Upload & replace the env file."""
    if not file.filename.endswith(".env"):
        raise HTTPException(status_code=400, detail="File must end with .env")

    content = await file.read()
    with open(ENV_PATH, "wb") as f:
        f.write(content)

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={"status": "success", "size": len(content)}
    )

@app.get("/health", response_model=HealthResponse)
def health_check():
    return {"status": "active"}