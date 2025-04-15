import pandas as pd
from sklearn.ensemble import IsolationForest, RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

class SignalValidator:
    def __init__(self):
        self.anomaly_detector = IsolationForest(n_estimators=100, contamination=0.1)
        self.rf_predictor = RandomForestClassifier(n_estimators=100, random_state=42)
        self.is_trained = False

    def prepare_data(self, df):
        mapping = {'BUY': 0, 'SELL': 1, 'HOLD': 2}
        return df.replace(mapping)

    def detect_anomalies(self, df):
        if not self.is_trained:
            raise ValueError("Modelo não treinado. Use o endpoint /train primeiro.")
        X = self.prepare_data(df[['random_forest_opinion', 'lstm_opinion', 'gpt_opinion']])
        df['anomaly'] = self.anomaly_detector.predict(X)
        df['anomaly_score'] = self.anomaly_detector.score_samples(X)
        return df

    def train_predictor(self, df):
        df_mapped = self.prepare_data(df)
        X = df_mapped[['random_forest_opinion', 'lstm_opinion']]
        y = df_mapped['gpt_opinion']
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
        self.rf_predictor.fit(X_train, y_train)
        self.is_trained = True
        preds = self.rf_predictor.predict(X_test)
        report = classification_report(y_test, preds, output_dict=True)
        return report
