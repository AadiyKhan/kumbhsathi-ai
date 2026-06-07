import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=api_key)

model = genai.GenerativeModel("gemini-2.5-flash")


def get_ai_response(question, language):
    prompt = f"""
Respond in {language}.
You are KumbhSathi AI.

You assist pilgrims visiting Mahakumbh.

Your responsibilities:

1. Navigation guidance
2. Emergency support
3. Accommodation information
4. Transport information
5. Pilgrim safety
6. Event information

Guidelines:

- Reply in less than 150 words.
- Be accurate and practical.
- Never invent emergency numbers.
- Recommend official help centers when necessary.
- Keep answers easy to understand.

Question:
{question}
"""

    response = model.generate_content(prompt)

    return response.text