import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import sys
import os
from pathlib import Path

# Adiciona o diretório raiz ao PYTHONPATH
root_dir = str(Path(__file__).parent.parent.parent)
sys.path.append(root_dir)

from app.validator_ml.signal_validator import SignalValidator

def plot_treasury_evolution(df):
    fig = px.line(df, y='plutus_treasury_value', title='Evolução do Valor do Tesouro')
    fig.update_layout(yaxis_title='Valor do Tesouro', xaxis_title='Sequência de Sinais')
    return fig

def plot_signal_distribution(df):
    models = ['random_forest_opinion', 'lstm_opinion', 'gpt_opinion']
    fig = go.Figure()
    
    for model in models:
        counts = df[model].value_counts()
        fig.add_trace(go.Bar(name=model.replace('_opinion', ''), x=['BUY', 'SELL', 'HOLD'], 
                           y=[counts.get('BUY', 0), counts.get('SELL', 0), counts.get('HOLD', 0)]))
    
    fig.update_layout(title='Distribuição de Sinais por Modelo',
                     xaxis_title='Tipo de Sinal',
                     yaxis_title='Quantidade',
                     barmode='group')
    return fig

def create_correlation_matrix(df):
    # Converter sinais para números
    mapping = {'BUY': 1, 'SELL': -1, 'HOLD': 0}
    numeric_df = df[['random_forest_opinion', 'lstm_opinion', 'gpt_opinion']].replace(mapping)
    
    # Calcular correlação
    corr = numeric_df.corr()
    
    # Criar heatmap
    fig = px.imshow(corr,
                    labels=dict(x="Modelo", y="Modelo", color="Correlação"),
                    x=['Random Forest', 'LSTM', 'GPT'],
                    y=['Random Forest', 'LSTM', 'GPT'],
                    title="Matriz de Correlação entre Modelos")
    return fig

def calculate_consensus(df):
    # Calcula o número de vezes que todos os modelos concordam
    consensus = df.apply(lambda row: (row['random_forest_opinion'] == row['lstm_opinion']) and 
                                   (row['lstm_opinion'] == row['gpt_opinion']), axis=1)
    return consensus.sum()

def create_dashboard():
    st.title("PlutusMind Analytics Dashboard")
    
    # Upload de dados
    uploaded_file = st.file_uploader("Carregue o histórico de sinais (CSV)", type="csv")
    
    if uploaded_file:
        df = pd.read_csv(uploaded_file)
        validator = SignalValidator()
        
        # Tabs para organizar as visualizações
        tab1, tab2, tab3, tab4 = st.tabs(["Evolução do Tesouro", "Distribuição de Sinais", 
                                         "Correlação entre Modelos", "Análise de Anomalias"])
        
        with tab1:
            st.plotly_chart(plot_treasury_evolution(df))
            
            # Métricas do Tesouro
            col1, col2, col3 = st.columns(3)
            with col1:
                st.metric("Valor Inicial", f"${df['plutus_treasury_value'].iloc[0]:.2f}")
            with col2:
                st.metric("Valor Final", f"${df['plutus_treasury_value'].iloc[-1]:.2f}")
            with col3:
                retorno = ((df['plutus_treasury_value'].iloc[-1] / df['plutus_treasury_value'].iloc[0]) - 1) * 100
                st.metric("Retorno Total", f"{retorno:.2f}%")
        
        with tab2:
            st.plotly_chart(plot_signal_distribution(df))
            
            # Estatísticas de Sinais
            st.subheader("Estatísticas de Sinais")
            col1, col2, col3 = st.columns(3)
            with col1:
                st.metric("Total de Sinais", len(df))
            with col2:
                acertos = sum(df['final_vote'] == df['gpt_opinion'])
                st.metric("Concordância GPT", f"{(acertos/len(df))*100:.1f}%")
            with col3:
                consenso = calculate_consensus(df)
                st.metric("Consenso Total", f"{(consenso/len(df))*100:.1f}%")
        
        with tab3:
            st.plotly_chart(create_correlation_matrix(df))
        
        with tab4:
            try:
                analysis = validator.detect_anomalies(df)
                
                # Gráfico de anomalias
                anomaly_counts = analysis['anomaly'].value_counts()
                st.plotly_chart(px.pie(
                    values=[anomaly_counts.get(1, 0), anomaly_counts.get(-1, 0)],
                    names=['Normal', 'Anomalia'],
                    title='Distribuição de Anomalias'
                ))
                
                # Detalhes das anomalias
                st.subheader("Detalhes das Anomalias")
                anomalias = analysis[analysis['anomaly'] == -1]
                if not anomalias.empty:
                    st.dataframe(anomalias)
                else:
                    st.info("Nenhuma anomalia detectada!")
                    
            except ValueError as e:
                st.error(str(e))
                if st.button("Treinar Modelo"):
                    report = validator.train_predictor(df)
                    st.json(report)
                    st.success("Modelo treinado com sucesso!")

if __name__ == "__main__":
    create_dashboard() 