from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from pathlib import Path
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Allow CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

# Load Knowledge Base — path is relative to this file so it works on any server
_ROOT = Path(__file__).parent.parent
try:
    with open(_ROOT / "public" / "KNOWLEDGEBASE.md", "r", encoding="utf-8") as f:
        knowledge_base = f.read()
except FileNotFoundError:
    knowledge_base = "No KNOWLEDGEBASE.md found."

# Initialize Gemini Client
api_key = os.getenv("GEMINI_API_KEY")
client = None
if api_key:
    client = genai.Client(api_key=api_key)

SYSTEM_PROMPT = f"""You are TS-AI, the personal AI assistant for Tlili Soulaymen.
Answer questions accurately based on the CV information below.
Be concise (2-4 sentences max), professional, and friendly.
If asked something not in the CV, say you don't know but suggest contacting him directly.

CV INFORMATION:
{knowledge_base}
"""

# ── Health / wake-up endpoint ────────────────────────────────────────────────
# Called by the frontend when the chat sidebar opens to warm up the Render
# instance before the user sends their first message, eliminating cold-start hangs.
@app.get("/")
@app.get("/health")
async def health_check():
    return {"status": "ok"}

# ── Chat endpoint ────────────────────────────────────────────────────────────
@app.post("/chat")
async def chat_endpoint(req: ChatRequest):
    if not client:
        return {
            "response": (
                "Error: GEMINI_API_KEY is not set in the backend environment. "
                "Please add it to your Render environment variables."
            )
        }

    try:
        # gemini-2.0-flash: low-latency, no thinking overhead — ideal for chat
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=req.message,
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_PROMPT,
                temperature=0.3,
                max_output_tokens=512,   # cap to prevent slow runaway responses
            ),
        )
        return {"response": response.text}
    except Exception as e:
        print(f"Error during generation: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
