'use client';
import { useTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const CandlestickChart = () => {
  const theme = useTheme();

  // Mock data for the candlestick chart
  const series = [{
    data: [
      { x: new Date('2024-01-01'), y: [6629.81, 6650.5, 6623.04, 6633.33] },
      { x: new Date('2024-01-02'), y: [6632.01, 6643.59, 6620, 6630.11] },
      { x: new Date('2024-01-03'), y: [6630.71, 6648.95, 6623.34, 6635.65] },
      { x: new Date('2024-01-04'), y: [6635.65, 6651, 6629.67, 6638.24] },
      { x: new Date('2024-01-05'), y: [6638.24, 6640, 6620, 6624.47] },
      { x: new Date('2024-01-06'), y: [6624.53, 6636.03, 6621.68, 6624.31] },
      { x: new Date('2024-01-07'), y: [6624.61, 6632.2, 6617, 6626.02] },
      { x: new Date('2024-01-08'), y: [6627, 6627.62, 6584.22, 6603.02] },
      { x: new Date('2024-01-09'), y: [6605, 6608.03, 6598.95, 6604.01] },
      { x: new Date('2024-01-10'), y: [6604.5, 6614.4, 6602.26, 6608.02] },
      { x: new Date('2024-01-11'), y: [6629.81, 6650.5, 6623.04, 6633.33] },
      { x: new Date('2024-01-12'), y: [6632.01, 6643.59, 6620, 6630.11] },
      { x: new Date('2024-01-13'), y: [6630.71, 6648.95, 6623.34, 6635.65] },
      { x: new Date('2024-01-14'), y: [6635.65, 6651, 6629.67, 6638.24] },
      { x: new Date('2024-01-15'), y: [6638.24, 6640, 6620, 6624.47] },
      { x: new Date('2024-01-16'), y: [6624.53, 6636.03, 6621.68, 6624.31] },
      { x: new Date('2024-01-17'), y: [6624.61, 6632.2, 6617, 6626.02] },
      { x: new Date('2024-01-18'), y: [6627, 6627.62, 6584.22, 6603.02] },
      { x: new Date('2024-01-19'), y: [6605, 6608.03, 6598.95, 6604.01] },
      { x: new Date('2024-01-20'), y: [6604.5, 6614.4, 6602.26, 6608.02] },
      { x: new Date('2024-01-21'), y: [6629.81, 6650.5, 6623.04, 6633.33] },
      { x: new Date('2024-01-22'), y: [6632.01, 6643.59, 6620, 6630.11] },
      { x: new Date('2024-01-23'), y: [6630.71, 6648.95, 6623.34, 6635.65] },
      { x: new Date('2024-01-24'), y: [6635.65, 6651, 6629.67, 6638.24] },
      { x: new Date('2024-01-25'), y: [6638.24, 6640, 6620, 6624.47] },
      { x: new Date('2024-01-26'), y: [6624.53, 6636.03, 6621.68, 6624.31] },
      { x: new Date('2024-01-27'), y: [6624.61, 6632.2, 6617, 6626.02] },
      { x: new Date('2024-01-28'), y: [6627, 6627.62, 6584.22, 6603.02] },
      { x: new Date('2024-01-29'), y: [6605, 6608.03, 6598.95, 6604.01] },
      { x: new Date('2024-01-30'), y: [6604.5, 6614.4, 6602.26, 6608.02] },
    ]
  }];

  const options = {
    chart: {
      type: 'candlestick',
      height: 350,
      background: 'transparent',
      foreColor: theme.palette.text.primary,
    },
    title: {
      text: 'Stock Market Price',
      align: 'left',
      style: {
        color: theme.palette.text.primary
      }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: {
          colors: theme.palette.text.primary
        }
      },
      axisBorder: {
        color: theme.palette.divider
      },
      axisTicks: {
        color: theme.palette.divider
      }
    },
    yaxis: {
      tooltip: {
        enabled: true
      },
      labels: {
        style: {
          colors: theme.palette.text.primary
        }
      }
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 5,
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: theme.palette.success?.main || '#00E396',
          downward: theme.palette.error?.main || '#FF4560'
        }
      }
    },
    tooltip: {
      theme: theme.palette.mode
    }
  };

  return (
    <Chart
      options={options}
      series={series}
      type="candlestick"
      height={350}
    />
  );
};

export default CandlestickChart;
