from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from nl_to_sql import generate_sql
from database import execute_query
from datetime import datetime

app = FastAPI(title="SaaS BI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_methods=["*"],
    allow_headers=["*"],
)


query_history = []


class QueryRequest(BaseModel):
    question: str


@app.post("/query")
async def run_query(request: QueryRequest):
    try:
        sql = generate_sql(request.question)
        result = execute_query(sql)

        
        if isinstance(result, dict) and "error" in result:
            raise HTTPException(status_code=400, detail=result["error"])

        entry = {
            "id": len(query_history) + 1,
            "question": request.question,
            "sql": sql,
            "result": result,
            "timestamp": datetime.now().isoformat(),
            "row_count": len(result) if isinstance(result, list) else 0
        }

        query_history.insert(0, entry)  

        return entry

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/history")
async def get_history():
    return query_history


@app.delete("/history")
async def clear_history():
    query_history.clear()
    return {"message": "History cleared"}


@app.get("/health")
async def health():
    return {"status": "ok"}
