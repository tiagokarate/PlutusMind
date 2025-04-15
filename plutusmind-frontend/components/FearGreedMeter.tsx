import { Card, Title, Text, Metric, Flex, ProgressBar } from '@tremor/react';

interface FearGreedMeterProps {
  value: number; // 0-100
  previousValue?: number;
}

const getSentimentText = (value: number) => {
  if (value <= 20) return 'Medo Extremo';
  if (value <= 40) return 'Medo';
  if (value <= 60) return 'Neutro';
  if (value <= 80) return 'Ganância';
  return 'Ganância Extrema';
};

const getSentimentColor = (value: number) => {
  if (value <= 20) return 'red';
  if (value <= 40) return 'orange';
  if (value <= 60) return 'yellow';
  if (value <= 80) return 'emerald';
  return 'green';
};

export default function FearGreedMeter({ value, previousValue }: FearGreedMeterProps) {
  const sentimentText = getSentimentText(value);
  const sentimentColor = getSentimentColor(value);
  const change = previousValue ? value - previousValue : 0;

  return (
    <Card>
      <Title>Índice Medo & Ganância</Title>
      <div className="mt-6">
        <Flex>
          <Text>Sentimento Atual</Text>
          <Text className="font-medium">{sentimentText}</Text>
        </Flex>
        
        <div className="mt-4">
          <Metric className="text-center">{value}</Metric>
          <ProgressBar
            value={value}
            color={sentimentColor}
            className="mt-2"
            tooltip={`${value}/100`}
          />
        </div>

        {previousValue && (
          <div className="mt-4">
            <Flex>
              <Text>Variação 24h</Text>
              <Text className={change >= 0 ? 'text-emerald-500' : 'text-red-500'}>
                {change >= 0 ? '+' : ''}{change.toFixed(1)}
              </Text>
            </Flex>
          </div>
        )}

        <div className="mt-6 grid grid-cols-5 gap-2 text-center text-xs">
          <div className="text-red-500">
            <div className="h-2 bg-red-500 rounded-full mb-1" />
            <Text>Medo Extremo</Text>
          </div>
          <div className="text-orange-500">
            <div className="h-2 bg-orange-500 rounded-full mb-1" />
            <Text>Medo</Text>
          </div>
          <div className="text-yellow-500">
            <div className="h-2 bg-yellow-500 rounded-full mb-1" />
            <Text>Neutro</Text>
          </div>
          <div className="text-emerald-500">
            <div className="h-2 bg-emerald-500 rounded-full mb-1" />
            <Text>Ganância</Text>
          </div>
          <div className="text-green-500">
            <div className="h-2 bg-green-500 rounded-full mb-1" />
            <Text>Ganância Extrema</Text>
          </div>
        </div>
      </div>
    </Card>
  );
} 