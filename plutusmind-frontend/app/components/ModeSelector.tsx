import React from 'react';
import { Card, Text } from "@tremor/react";

interface ModeSelectorProps {
  currentMode: string;
  onModeChange: (mode: string) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, onModeChange }) => {
  const modes = ['Automático', 'Manual', 'Simulação'];

  return (
    <Card className="p-4">
      <Text className="mb-2 font-medium">Modo de Operação</Text>
      <div className="flex gap-2">
        {modes.map((mode) => (
          <button
            key={mode}
            onClick={() => onModeChange(mode)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentMode === mode
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {mode}
          </button>
        ))}
      </div>
    </Card>
  );
};

export default ModeSelector; 