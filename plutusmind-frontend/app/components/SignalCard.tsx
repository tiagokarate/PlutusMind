import React from 'react';
import { Card, Text, ProgressBar } from "@tremor/react";
import { Badge } from "@/components/ui/badge";

interface SignalCardProps {
  title: string;
  icon: React.ReactNode;
  signal: string;
  confidence: number;
  justification?: string;
  iconColor?: string;
}

const SignalCard: React.FC<SignalCardProps> = ({
  title,
  icon,
  signal,
  confidence,
  justification,
  iconColor = "text-blue-500"
}) => {
  const getSignalBadgeVariant = (signal: string) => {
    switch (signal.toUpperCase()) {
      case "BUY":
        return "success";
      case "SELL":
        return "danger";
      default:
        return "warning";
    }
  };

  return (
    <Card>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className={iconColor}>{icon}</div>
            <div>
              <h2 className="font-semibold">{title}</h2>
              {justification && (
                <p className="text-xs text-muted-foreground mt-1">
                  {justification}
                </p>
              )}
            </div>
          </div>
          <Badge variant={getSignalBadgeVariant(signal)}>
            {signal.toUpperCase()}
          </Badge>
        </div>
        <div className="mt-4">
          <div className="text-sm text-muted-foreground">Confiança</div>
          <div className="mt-1">
            <ProgressBar value={confidence} color="blue" className="mt-2" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SignalCard; 