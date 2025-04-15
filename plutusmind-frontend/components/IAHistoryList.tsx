import { Card, Title, Text, List, ListItem, Badge, Flex } from '@tremor/react';
import { ClockIcon } from '@heroicons/react/24/solid';

interface HistoryItem {
  id: string;
  model: string;
  signal: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  timestamp: string;
  performance?: string;
}

interface IAHistoryListProps {
  history: HistoryItem[];
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

const getTimeAgo = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return `${seconds}s atrás`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}min atrás`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h atrás`;
  return `${Math.floor(seconds / 86400)}d atrás`;
};

export default function IAHistoryList({ history }: IAHistoryListProps) {
  return (
    <Card>
      <Title>Histórico de Sinais</Title>
      <List className="mt-4">
        {history.map((item) => (
          <ListItem key={item.id}>
            <div className="space-y-2">
              <Flex>
                <Text className="font-medium">{item.model}</Text>
                <Badge color={getSignalColor(item.signal)} size="sm">
                  {item.signal}
                </Badge>
              </Flex>
              
              <Flex className="gap-4">
                <Text className="text-tremor-label flex items-center gap-1">
                  <ClockIcon className="h-4 w-4 text-gray-500" />
                  {getTimeAgo(item.timestamp)}
                </Text>
                <Text className="text-tremor-label">
                  Confiança: {item.confidence}%
                </Text>
                {item.performance && (
                  <Text className={`text-tremor-label ${
                    item.performance.startsWith('+') ? 'text-emerald-500' : 'text-red-500'
                  }`}>
                    {item.performance}
                  </Text>
                )}
              </Flex>
            </div>
          </ListItem>
        ))}
      </List>
    </Card>
  );
} 