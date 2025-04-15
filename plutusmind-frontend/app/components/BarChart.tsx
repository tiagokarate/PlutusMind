import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart as Chart } from '@tremor/react';

interface BarChartProps {
  title: string;
  data: {
    month: string;
    value: number;
  }[];
}

const BarChart: React.FC<BarChartProps> = ({ title, data }) => {
  return (
    <Card className="border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div>
          <CardTitle className="text-xl font-semibold text-black dark:text-white">
            {title}
          </CardTitle>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button className="rounded bg-white py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
              Dia
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Mês
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Ano
            </button>
          </div>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartOne" className="mt-8">
          <Chart
            className="h-[350px] w-full"
            data={data}
            index="month"
            categories={["value"]}
            colors={["blue"]}
            showAnimation={true}
            showLegend={false}
            valueFormatter={(value) => `R$ ${value.toLocaleString()}`}
          />
        </div>
      </div>
    </Card>
  );
};

export default BarChart; 