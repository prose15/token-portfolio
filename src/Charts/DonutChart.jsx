
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts'
import { useSelector } from 'react-redux';

export const DonutChart = ({data = [],labels = []}) => {
  const [state, setState] = useState({
    series: data,
    options: {
      chart: {
        width: 300,
        type: "donut",
      },
      labels: labels,
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 1,
      },
      plotOptions: {
        pie: {
          donut: {
            size: "50%",
          },
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              show: false,
            },
          },
        },
      ],
      legend: {
        show: false,
      },
    },
  });

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      series: data,
      options: {
        ...prev.options,
        labels: labels,
      },
    }));
  }, [data, labels])

    return (
      <>
      {!data || data.length === 0 ? (
        <div className="relative grid place-items-center">
          <div className="h-32 w-32 rounded-full shimmer" />
          <div className="absolute h-16 w-16 rounded-full bg-[#27272a]" />
        </div>
      ) : (
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="donut"
          width={180}
        />
      )}
      </>
    );
  }