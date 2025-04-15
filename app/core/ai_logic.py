import random

def get_ia_opinions():
    rf = random.choice(["BUY", "SELL", "HOLD"])
    lstm = random.choice(["BUY", "SELL", "HOLD"])
    gpt = random.choice(["BUY", "SELL", "HOLD"])
    justification = "Simulação de justificativa do GPT para o sinal " + gpt
    return {
        "random_forest_opinion": rf,
        "lstm_opinion": lstm,
        "gpt_opinion": gpt,
        "gpt_justification": justification
    }

def vote_signal(opinions):
    votes = [opinions["random_forest_opinion"], opinions["lstm_opinion"], opinions["gpt_opinion"]]
    return max(set(votes), key=votes.count)
