import { Card, Title, Text, TabGroup, TabList, Tab, Flex, Badge } from '@tremor/react';

interface ModeSelectorProps {
  currentMode: string;
  onModeChange: (mode: string) => void;
}

const modes = [
  { value: 'sniper', label: 'Sniper', emoji: '🎯', description: 'Operações precisas e pontuais' },
  { value: 'aggressive', label: 'Agressivo', emoji: '🔥', description: 'Maior exposição ao risco' },
  { value: 'conservative', label: 'Conservador', emoji: '🛡️', description: 'Foco em preservação de capital' },
];

const ModeSelector = ({ currentMode, onModeChange }: ModeSelectorProps) => {
  const currentIndex = modes.findIndex(mode => mode.value === currentMode);

  return (
    <Card>
      <div className="mb-4">
        <Title>Modo de Operação</Title>
        <Text>Selecione a estratégia de trading</Text>
      </div>
      
      <TabGroup index={currentIndex} onIndexChange={(index) => onModeChange(modes[index].value)}>
        <TabList variant="solid">
          {modes.map((mode) => (
            <Tab key={mode.value} className="w-full">
              <Flex justifyContent="start" className="gap-2">
                <span>{mode.emoji}</span>
                <span>{mode.label}</span>
              </Flex>
            </Tab>
          ))}
        </TabList>
      </TabGroup>

      <div className="mt-4 p-4 bg-tremor-background-subtle rounded-tremor-default">
        <Flex>
          <div>
            <Text className="font-medium">Modo Atual:</Text>
            <Text className="mt-2">
              {modes.find(mode => mode.value === currentMode)?.description}
            </Text>
          </div>
          <Badge size="xl" color="blue">
            {modes.find(mode => mode.value === currentMode)?.emoji}{' '}
            {modes.find(mode => mode.value === currentMode)?.label}
          </Badge>
        </Flex>
      </div>
    </Card>
  );
};

export default ModeSelector; 