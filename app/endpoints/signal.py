from fastapi import APIRouter
from app.core.ai_logic import get_ia_opinions, vote_signal
from app.core.treasury_simulation import update_treasury
from app.models.signal_response import SignalResponse
from app.config import settings

router = APIRouter()

@router.get("/", response_model=SignalResponse)
def get_signal():
    opinions = get_ia_opinions()
    final_vote = vote_signal(opinions)
    treasury = update_treasury(final_vote)
    return {
        **opinions,
        "final_vote": final_vote,
        "plutus_treasury_value": treasury
    }
