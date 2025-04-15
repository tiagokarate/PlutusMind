import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface ApexChartProps {
  type: 'line' | 'area' | 'bar' | 'pie' | 'donut' | 'scatter' | 'bubble';
  height: number;
  series: any[];
  options: ApexOptions;
}

const ApexChart: React.FC<ApexChartProps> = ({ type, height, series, options }) => {
  return (
    <Chart
      type={type}
      height={height}
      series={series}
      options={options}
    />
  );
};

export default ApexChart; 