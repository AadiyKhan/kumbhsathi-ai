# 🕉️ KumbhSathi AI

An AI-powered multilingual assistant designed to help pilgrims during Mahakumbh by providing navigation guidance, emergency support, accommodation assistance, safety information, and multilingual communication.

## 🚀 Features

- 💬 AI-powered chat assistant using Gemini
- 🌐 Multilingual support
  - English
  - Hindi
  - Tamil
  - Telugu
  - Bengali
- 🎤 Voice input using Speech Recognition
- 🚑 Quick emergency assistance
- 👮 Police support guidance
- 👨‍👩‍👧 Missing person assistance
- 🏨 Accommodation guidance
- 📍 Navigation assistance
- 📱 Responsive web interface

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- React Markdown

### Backend
- FastAPI
- Python
- Google Gemini API

---

## 📂 Project Structure

```text
kumbhsathi-ai/
│
├── backend/
│   ├── app.py
│   ├── gemini_service.py
│   ├── faq_service.py
│   ├── faq_data.json
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## ⚙️ Installation

### Backend

```bash
cd backend

python -m venv venv

source venv/bin/activate

pip install -r requirements.txt

uvicorn app:app --reload
```

Backend runs on:

```text
http://127.0.0.1:8000
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## 🎯 Problem Statement

Pilgrims visiting Mahakumbh come from diverse linguistic and cultural backgrounds. Accessing accurate information can be difficult, especially for first-time visitors.

KumbhSathi AI provides an intelligent assistant capable of answering questions related to:

- Navigation
- Safety
- Emergency support
- Accommodation
- Local services
- General pilgrimage guidance

---

## 🔮 Future Enhancements

- Real-time maps integration
- Nearby medical camp locator
- Lost & found tracking system
- Offline support
- Weather information
- Emergency hotline integration
- Live event schedules

---

## 👨‍💻 Developer

**Aadiy Khan**

Built for the **Mahakumbh Innovation Hackathon 2028** organized by Expert Hire in collaboration with VIT Bhopal.
