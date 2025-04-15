import { Card, Title, Text, AreaChart, Metric, Flex, Badge } from '@tremor/react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

interface TreasuryPanelProps {
  treasuryValue: number;
  treasuryHistory: {
    data: number[];
    labels: string[];
  };
  percentageChange: number;
}

export default function TreasuryPanel({ treasuryValue, treasuryHistory, percentageChange }: TreasuryPanelProps) {
  const chartData = treasuryHistory.labels.map((label, index) => ({
    date: label,
    "Valor": treasuryHistory.data[index],
    "Tendência": treasuryHistory.data[index] * 1.05
  }));

  return (
    <Card>
      <div className="mb-4">
        <Title>Evolução do Tesouro</Title>
        <div className="mt-4">
          <Flex>
            <div>
              <Text>Valor Atual</Text>
              <Metric>${treasuryValue.toFixed(2)}</Metric>
            </div>
            <Badge 
              className="flex items-center gap-1"
              color={percentageChange >= 0 ? 'emerald' : 'red'}
            >
              {percentageChange >= 0 ? (
                <ArrowUpIcon className="h-4 w-4" />
              ) : (
                <ArrowDownIcon className="h-4 w-4" />
              )}
              {Math.abs(percentageChange).toFixed(2)}%
            </Badge>
          </Flex>
        </div>
      </div>

      <AreaChart
        className="mt-6 h-72"
        data={chartData}
        index="date"
        categories={["Valor", "Tendência"]}
        colors={["blue", "cyan"]}
        valueFormatter={(number) => `$${number.toFixed(2)}`}
        showLegend={true}
        showGridLines={true}
        showAnimation={true}
        curveType="monotone"
      />

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <Text className="text-tremor-label">Volume 24h</Text>
          <Text className="font-medium">$4.28M</Text>
        </div>
        <div>
          <Text className="text-tremor-label">Trades</Text>
          <Text className="font-medium">992</Text>
        </div>
        <div>
          <Text className="text-tremor-label">Retorno 24h</Text>
          <Text className={`font-medium ${percentageChange >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
            {percentageChange >= 0 ? '+' : ''}{percentageChange.toFixed(2)}%
          </Text>
        </div>
        <div>
          <Text className="text-tremor-label">Drawdown</Text>
          <Text className="font-medium text-red-500">-1.2%</Text>
        </div>
      </div>
    </Card>
  );
} 