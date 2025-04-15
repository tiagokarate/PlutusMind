import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DonutChart } from "@tremor/react";

interface TargetProgressProps {
  title: string;
  subtitle: string;
  percentage: number;
  target: string;
  revenue: string;
  today: string;
}

const TargetProgress: React.FC<TargetProgressProps> = ({
  title,
  subtitle,
  percentage,
  target,
  revenue,
  today
}) => {
  const data = [
    {
      name: "Completo",
      value: percentage,
    },
    {
      name: "Restante",
      value: 100 - percentage,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-medium">{title}</CardTitle>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {subtitle}
            </p>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full dark:hover:bg-meta-4">
            <svg
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <DonutChart
            data={data}
            category="value"
            index="name"
            colors={["blue", "gray"]}
            showAnimation={true}
            showLabel={false}
            className="h-40 w-40"
          />
        </div>
        <div className="text-center mt-4">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            {percentage}%
          </span>
          <span className="text-sm text-green-500 ml-2">+10%</span>
        </div>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
          Você ganhou R$ 3.287 hoje, maior que o mês passado.
          <br />
          Continue o bom trabalho!
        </p>
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Meta</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {target}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Receita</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {revenue}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Hoje</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {today}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TargetProgress; 