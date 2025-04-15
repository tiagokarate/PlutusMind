import { Card, Text, Metric, Flex, Badge, ProgressBar } from '@tremor/react';

interface SignalCardProps {
  modelName: string;
  signal: 'BUY' | 'SELL' | 'HOLD';
  confidence?: number;
  justification?: string;
}

const getSignalColor = (signal: string) => {
  switch (signal) {
    case 'BUY':
      return 'emerald';
    case 'SELL':
      return 'red';
    default:
      return 'yellow';
  }
};

const getSignalEmoji = (signal: string) => {
  switch (signal) {
    case 'BUY':
      return '📈';
    case 'SELL':
      return '📉';
    default:
      return '⏸️';
  }
};

const getSignalDescription = (signal: string) => {
  switch (signal) {
    case 'BUY':
      return 'Oportunidade de compra identificada';
    case 'SELL':
      return 'Momento favorável para venda';
    default:
      return 'Aguardando melhor momento';
  }
};

export default function SignalCard({ modelName, signal, confidence, justification }: SignalCardProps) {
  const signalColor = getSignalColor(signal);
  const signalEmoji = getSignalEmoji(signal);
  const description = getSignalDescription(signal);

  return (
    <Card className="max-w-full">
      <div className="space-y-4">
        {/* Header */}
        <Flex>
          <div>
            <Text className="text-tremor-default font-medium">{modelName}</Text>
            <Metric className="mt-1 flex items-center gap-2">
              {signalEmoji} {signal}
            </Metric>
          </div>
          <Badge size="xl" color={signalColor}>
            {confidence}% confiança
          </Badge>
        </Flex>

        {/* Signal Description */}
        <div className="p-3 bg-tremor-background-subtle rounded-tremor-default">
          <Text className="text-tremor-default">
            {description}
          </Text>
        </div>
        
        {/* Confidence Level */}
        {confidence && (
          <div>
            <Flex className="mb-2">
              <Text className="font-medium">Nível de Confiança</Text>
              <Text>{confidence}%</Text>
            </Flex>
            <ProgressBar value={confidence} color={signalColor} tooltip={`${confidence}%`} />
          </div>
        )}

        {/* Market Analysis */}
        {justification && (
          <div className="space-y-2">
            <Text className="font-medium">Análise de Mercado</Text>
            <div className="p-3 bg-tremor-background-subtle rounded-tremor-default">
              <Text className="text-tremor-default text-tremor-content">
                {justification}
              </Text>
            </div>
          </div>
        )}

        {/* Additional Metrics */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div>
            <Text className="text-tremor-label">Volume 24h</Text>
            <Text className="font-medium">$2.45M</Text>
          </div>
          <div>
            <Text className="text-tremor-label">Trades</Text>
            <Text className="font-medium">847</Text>
          </div>
          <div>
            <Text className="text-tremor-label">Sucesso</Text>
            <Text className="font-medium text-emerald-500">92%</Text>
          </div>
          <div>
            <Text className="text-tremor-label">Tendência</Text>
            <Text className={signal === 'BUY' ? 'font-medium text-emerald-500' : 'font-medium text-red-500'}>
              {signal === 'BUY' ? 'Bullish' : signal === 'SELL' ? 'Bearish' : 'Neutral'}
            </Text>
          </div>
        </div>
      </div>
    </Card>
  );
} 