# SaaS BI Tool

Natural language to SQL query engine for SaaS analytics.

## Stack
- **Backend:** FastAPI + Groq (LLaMA 3.3 70B)
- **Frontend:** React + Vite + Recharts
- **Database:** MySQL

## Setup

### Backend
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env  # add your GROQ_API_KEY
python -m uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Usage
Open http://localhost:5173 and ask questions like:
- "Revenue by quarter"
- "Top 5 companies by MRR"
- "Churn rate this month"