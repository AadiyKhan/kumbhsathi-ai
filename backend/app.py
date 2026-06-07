from fastapi import FastAPI
from pydantic import BaseModel

from faq_service import find_faq_answer
from gemini_service import get_ai_response
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):
    question: str
    language: str = "English"


@app.get("/")
def home():
    return {
        "status": "running",
        "message": "KumbhSathi AI Backend"
    }


@app.post("/chat")
def chat(query: Query):

    faq_answer = find_faq_answer(query.question)

    # FAQ found
    if faq_answer:
        return {
            "source": "faq",
            "answer": faq_answer
        }

    # FAQ not found -> Gemini
    ai_answer = get_ai_response(
    query.question,
    query.language
)

    return {
        "source": "gemini",
        "answer": ai_answer
    }