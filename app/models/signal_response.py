from pydantic import BaseModel

class SignalResponse(BaseModel):
    random_forest_opinion: str
    lstm_opinion: str
    gpt_opinion: str
    gpt_justification: str
    final_vote: str
    plutus_treasury_value: float
