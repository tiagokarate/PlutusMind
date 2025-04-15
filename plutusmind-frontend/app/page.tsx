'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { 
  ArrowUpRight, 
  TrendingUp, 
  DollarSign, 
  Brain, 
  AlertTriangle,
  RefreshCw,
  Download,
  Clock,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import ApexChart from '@/components/shared/ApexChart';
import { ApexOptions } from 'apexcharts';
import MainLayout from './components/layout/MainLayout';

interface SignalData {
  plutus_treasury_value: number;
  final_vote: string;
  gpt_justification: string;
  historical_data: {
    date: string;
    value: number;
  }[];
}

interface Alert {
  id: number;
  type: 'warning' | 'error' | 'success';
  message: string;
  timestamp: string;
}

interface OperationHistory {
  id: number;
  timestamp: string;
  signal: string;
  value: number;
  confidence: number;
  status: 'success' | 'pending' | 'failed';
}

interface SignalCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down';
}

const SignalCard: React.FC<SignalCardProps> = ({ title, value, description, icon, trend }) => (
  <Card className="relative overflow-hidden rounded-sm border border-stroke bg-white p-8 shadow-default dark:border-strokedark dark:bg-boxdark">
    <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
      {icon}
    </div>

    <div className="mt-4 flex items-end justify-between">
      <div>
        <h4 className="text-title-sm font-bold text-black dark:text-white">
          {value}
        </h4>
        <span className="text-sm font-medium">{title}</span>
        {description && (
          <p className="mt-1 text-sm font-medium text-meta-3">
            {description}
          </p>
        )}
      </div>

      {trend && (
        <span className={`flex items-center gap-1 text-sm font-medium ${
          trend === 'up' ? 'text-meta-3' : 'text-meta-1'
        }`}>
          {trend === 'up' ? '+' : '-'}12.5%
          <ArrowUpRight className={`${trend === 'down' ? 'rotate-180' : ''}`} />
        </span>
      )}
    </div>
  </Card>
);

export default function DashboardPage() {
  const [signalData, setSignalData] = useState<SignalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeFilter, setTimeFilter] = useState('24h');
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 1,
      type: 'warning',
      message: 'Alta volatilidade detectada no mercado',
      timestamp: '5 minutos atrás'
    },
    {
      id: 2,
      type: 'success',
      message: 'Sinal de compra confirmado pela IA',
      timestamp: '15 minutos atrás'
    },
    {
      id: 3,
      type: 'error',
      message: 'Falha na conexão com API externa',
      timestamp: '1 hora atrás'
    }
  ]);

  const [operations, setOperations] = useState<OperationHistory[]>([
    {
      id: 1,
      timestamp: '2024-01-05 14:30',
      signal: 'COMPRAR',
      value: 235000,
      confidence: 92,
      status: 'success'
    },
    {
      id: 2,
      timestamp: '2024-01-05 10:15',
      signal: 'MANTER',
      value: 230000,
      confidence: 85,
      status: 'success'
    },
    {
      id: 3,
      timestamp: '2024-01-04 16:45',
      signal: 'COMPRAR',
      value: 225000,
      confidence: 78,
      status: 'success'
    }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mockData: SignalData = {
          plutus_treasury_value: 235000,
          final_vote: "COMPRAR",
          gpt_justification: "Análise positiva baseada em tendências de mercado e indicadores técnicos favoráveis.",
          historical_data: [
            { date: "2024-01-01", value: 200000 },
            { date: "2024-01-02", value: 210000 },
            { date: "2024-01-03", value: 215000 },
            { date: "2024-01-04", value: 225000 },
            { date: "2024-01-05", value: 235000 },
          ]
        };
        setSignalData(mockData);
      } catch (err) {
        setError('Falha ao carregar dados do sinal');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return (
    <MainLayout>
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    </MainLayout>
  );

  if (error) return (
    <MainLayout>
      <div className="flex h-full items-center justify-center">
        <div className="text-center text-meta-1">
          <AlertTriangle className="mx-auto h-12 w-12 mb-4" />
          <p>Erro: {error}</p>
        </div>
      </div>
    </MainLayout>
  );

  if (!signalData || !signalData.historical_data) return (
    <MainLayout>
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-600">Nenhum dado disponível</p>
      </div>
    </MainLayout>
  );

  const chartOptions: ApexOptions = {
    chart: {
      type: 'area',
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: 'Satoshi, sans-serif',
      height: 335,
      background: 'transparent',
    },
    colors: ['#3C50E0'],
    stroke: { 
      curve: 'smooth',
      width: 3
    },
    xaxis: {
      type: 'datetime',
      categories: signalData.historical_data.map(item => new Date(item.date).getTime()),
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: '#64748B',
          fontSize: '14px',
          fontWeight: 500,
        },
      },
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return `R$ ${value.toLocaleString('pt-BR')}`;
        },
        style: {
          colors: '#64748B',
          fontSize: '14px',
          fontWeight: 500,
        },
      },
    },
    grid: {
      show: true,
      borderColor: '#E2E8F0',
      strokeDashArray: 5,
      padding: { top: 0, right: 0, bottom: 0, left: 0 },
    },
    tooltip: { 
      enabled: true,
      x: { format: 'dd MMM yyyy' },
      y: {
        formatter: function(value) {
          return `R$ ${value.toLocaleString('pt-BR')}`;
        }
      },
      style: {
        fontSize: '14px',
        fontFamily: 'Satoshi, sans-serif',
      },
    },
    dataLabels: { enabled: false },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100]
      }
    }
  };

  const chartSeries = [
    {
      name: 'PlutusTreasury',
      data: signalData.historical_data.map(item => item.value)
    }
  ];

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-meta-6" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-meta-1" />;
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-meta-3" />;
    }
  };

  const getStatusColor = (status: OperationHistory['status']) => {
    switch (status) {
      case 'success':
        return 'text-meta-3';
      case 'pending':
        return 'text-meta-6';
      case 'failed':
        return 'text-meta-1';
    }
  };

  return (
    <MainLayout>
      {/* Filtros e Ações */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <select 
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
          >
            <option value="24h">Últimas 24h</option>
            <option value="7d">Última semana</option>
            <option value="30d">Último mês</option>
            <option value="custom">Personalizado</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-primary px-6 py-3 font-medium text-white hover:bg-opacity-90">
            <RefreshCw className="h-5 w-5" />
            Atualizar
          </button>
          <button className="inline-flex items-center justify-center gap-2.5 rounded-lg border border-stroke bg-white px-6 py-3 font-medium text-black hover:border-primary hover:bg-primary hover:text-white dark:border-strokedark dark:text-white dark:hover:border-primary">
            <Download className="h-5 w-5" />
            Exportar
          </button>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-8">
        {/* Cards de Métricas - 4 colunas em telas grandes */}
        <div className="col-span-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-8">
            <SignalCard
              title="Valor do Tesouro"
              value={`R$ ${signalData.plutus_treasury_value.toLocaleString('pt-BR')}`}
              icon={<DollarSign className="h-6 w-6 text-primary" />}
              trend="up"
            />
            <SignalCard
              title="Voto Final"
              value={signalData.final_vote}
              icon={<Brain className="h-6 w-6 text-primary" />}
            />
            <SignalCard
              title="Análise de Tendência"
              value="Positivo"
              description="Baseado em dados históricos"
              icon={<TrendingUp className="h-6 w-6 text-primary" />}
            />
            <SignalCard
              title="Performance"
              value="+12.5%"
              description="Aumento do último período"
              icon={<ArrowUpRight className="h-6 w-6 text-primary" />}
              trend="up"
            />
          </div>
        </div>

        {/* Gráfico Principal - 8 colunas */}
        <div className="col-span-12 xl:col-span-8">
          <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-col gap-2 p-6">
              <h4 className="text-xl font-semibold text-black dark:text-white">
                Evolução do PlutusTreasury
              </h4>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Últimos 5 dias
              </p>
            </div>
            <div className="px-6 pb-6">
              <div className="h-[350px] w-full">
                <ApexChart
                  type="area"
                  height={350}
                  options={chartOptions}
                  series={chartSeries}
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Alertas - 4 colunas */}
        <div className="col-span-12 xl:col-span-4">
          <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6 py-5 dark:border-strokedark">
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-semibold text-black dark:text-white">
                  Alertas do Sistema
                </h4>
                <span className="rounded-full bg-meta-1/10 px-3 py-1 text-sm font-medium text-meta-1">
                  {alerts.length} Novos
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-6">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-4 rounded-lg bg-gray-50 p-4 dark:bg-meta-4">
                    {getAlertIcon(alert.type)}
                    <div>
                      <p className="font-medium text-black dark:text-white">
                        {alert.message}
                      </p>
                      <span className="mt-1 block text-sm text-gray-500">
                        {alert.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Histórico de Operações - 12 colunas */}
        <div className="col-span-12">
          <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6 py-5 dark:border-strokedark">
              <h4 className="text-xl font-semibold text-black dark:text-white">
                Histórico de Sinais
              </h4>
              <p className="mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                Últimas operações realizadas
              </p>
            </div>
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                      <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white">
                        Data/Hora
                      </th>
                      <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                        Sinal
                      </th>
                      <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                        Valor
                      </th>
                      <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                        Confiança IA
                      </th>
                      <th className="px-4 py-4 font-medium text-black dark:text-white">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {operations.map((op, index) => (
                      <tr key={op.id} className={`${index % 2 === 0 ? 'bg-gray-50 dark:bg-meta-4/50' : ''}`}>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <p className="text-black dark:text-white">{op.timestamp}</p>
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <span className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success">
                            {op.signal}
                          </span>
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            R$ {op.value.toLocaleString('pt-BR')}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <div className="flex items-center gap-3">
                            <div className="relative h-2 w-24 rounded-full bg-stroke dark:bg-strokedark">
                              <div 
                                className="absolute h-full rounded-full bg-primary"
                                style={{ width: `${op.confidence}%` }}
                              />
                            </div>
                            <p className="text-sm font-medium text-black dark:text-white">
                              {op.confidence}%
                            </p>
                          </div>
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <span className={`text-sm font-medium ${getStatusColor(op.status)}`}>
                            {op.status === 'success' ? 'Concluído' : op.status === 'pending' ? 'Pendente' : 'Falhou'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </div>

        {/* Justificativa GPT - 12 colunas */}
        <div className="col-span-12">
          <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6 py-5 dark:border-strokedark">
              <h4 className="text-xl font-semibold text-black dark:text-white">
                Justificativa GPT
              </h4>
              <p className="mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                Análise detalhada do modelo
              </p>
            </div>
            <div className="p-6">
              <div className="rounded-lg bg-gray-50 p-6 dark:bg-meta-4">
                <p className="text-base font-medium leading-relaxed text-gray-700 dark:text-gray-300">
                  {signalData.gpt_justification}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
