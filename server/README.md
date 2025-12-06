# ITG Chat API

A minimal FastAPI server for ChatGPT interactions.

## Setup

```bash
pip install -r requirements.txt
```

## Environment Variables

```bash
export OPENAI_API_KEY="your-api-key-here"
```

## Run Locally

```bash
uvicorn app.main:app --reload
```

## API Endpoints

- `GET /` - Health check
- `POST /chat` - Send a message and get a ChatGPT response

### Example Request

```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, how are you?"}'
```

