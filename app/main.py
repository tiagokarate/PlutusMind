from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.endpoints.signal import router as signal_router
from app.endpoints.validate import router as validate_router

app = FastAPI(
    title="PlutusMind API",
    description="API para análise e geração de sinais de trading",
    version="1.0.0"
)

# Configuração CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rotas
app.include_router(signal_router, prefix="/signal")
app.include_router(validate_router, prefix="/validate")

# Health Check
@app.get("/health")
async def health_check():
    return {"status": "healthy", "version": "1.0.0"}
