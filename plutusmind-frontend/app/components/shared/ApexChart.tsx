import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface ApexChartProps {
  type: 'line' | 'area' | 'bar' | 'pie' | 'donut';
  series: any[];
  options: ApexOptions;
  height?: number | string;
  width?: number | string;
}

const ApexChart: React.FC<ApexChartProps> = ({ type, series, options, height = 'auto', width = '100%' }) => {
  return (
    <div className="apex-chart">
      <Chart
        type={type}
        series={series}
        options={options}
        height={height}
        width={width}
      />
    </div>
  );
};

export default ApexChart; 