import axios from 'axios';

const API_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
});

export const fetchSignal = async () => {
  try {
    const response = await api.get('/signal');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar sinal:', error);
    throw error;
  }
};

export const fetchTreasuryHistory = async () => {
  try {
    const response = await api.get('/treasury/history');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar histórico do tesouro:', error);
    throw error;
  }
};

export const fetchModelPerformance = async () => {
  try {
    const response = await api.get('/models/performance');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar performance dos modelos:', error);
    throw error;
  }
};

export default api; 