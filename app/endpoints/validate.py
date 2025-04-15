from fastapi import APIRouter
from app.validator_ml.signal_validator import SignalValidator
from app.models.signal_response import SignalResponse
import pandas as pd

router = APIRouter()
validator = SignalValidator()

@router.post("/analyze")
async def analyze_signals(signals: list[SignalResponse]):
    df = pd.DataFrame([s.dict() for s in signals])
    analysis = validator.detect_anomalies(df)
    return {
        "anomalies": analysis['anomaly'].tolist(),
        "total_signals": len(signals),
        "anomaly_count": sum(analysis['anomaly'] == -1)
    }

@router.post("/train")
async def train_validator(signals: list[SignalResponse]):
    df = pd.DataFrame([s.dict() for s in signals])
    report = validator.train_predictor(df)
    return {"training_report": report}

@router.post("/history")
async def get_signal_history(start_date: str, end_date: str):
    # Implementation of the new endpoint
    return {
        "start_date": start_date,
        "end_date": end_date,
        "signals": []  # TODO: Implementar busca no histórico
    }

@router.post("/metrics")
async def get_signal_metrics(signal_id: str):
    # Implementation of the new endpoint
    return {
        "signal_id": signal_id,
        "metrics": {}  # TODO: Implementar métricas
    }

@router.post("/aggregated_stats")
async def get_aggregated_stats(signal_id: str):
    # Implementation of the new endpoint
    return {
        "signal_id": signal_id,
        "stats": {}  # TODO: Implementar estatísticas agregadas
    } 