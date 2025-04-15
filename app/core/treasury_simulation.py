treasury = 10000.0

def update_treasury(signal):
    global treasury
    if signal == "BUY":
        treasury *= 1.01
    elif signal == "SELL":
        treasury *= 0.99
    return round(treasury, 2)
