from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from database.mongodb import db
from api.v1.ingestion import router as ingestion_router
from api.v1.search import router as search_router

app = FastAPI(
    title="AuditShield AI API",
    description="Backend API for AuditShield AI compliance validation",
    version="0.1.0"
)

@app.on_event("startup")
async def startup_db_client():
    await db.connect_to_storage()

@app.on_event("shutdown")
async def shutdown_db_client():
    await db.close_storage()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Optional middleware for performance tracking
@app.middleware("http")
async def add_process_time_header(request, call_next):
    response = await call_next(request)
    return response

# Register Routers
app.include_router(ingestion_router, prefix="/api/v1")
app.include_router(search_router, prefix="/api/v1")

@app.get("/")
async def root():
    return {"message": "AuditShield AI API is running"}

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "version": "0.1.0",
        "environment": os.getenv("ENV", "development")
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
