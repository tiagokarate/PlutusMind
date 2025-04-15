# PlutusMind Backend - Fase 1

## Requisitos
- Python 3.10+
- Uvicorn

## Como executar

1. Crie e ative o ambiente virtual:
```bash
python -m venv venv
source venv/bin/activate  # ou venv\Scripts\activate no Windows
```

2. Instale as dependências:
```bash
pip install -r requirements.txt
```

3. Rode a aplicação:
```bash
uvicorn app.main:app --reload
```

## Endpoints Disponíveis

- `GET /signal` - Obtém um novo sinal de trading
- `POST /validate/analyze` - Analisa um conjunto de sinais em busca de anomalias
- `POST /validate/train` - Treina o modelo de validação
- `GET /health` - Verifica o status da API

## Dashboard de Visualização

Para acessar o dashboard:

```bash
streamlit run app/visualization/dashboard.py
```

O dashboard permite:
- Carregar histórico de sinais
- Visualizar anomalias
- Treinar o modelo de validação
- Analisar resultados

## Documentação da API

Acesse a documentação interativa da API em:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
