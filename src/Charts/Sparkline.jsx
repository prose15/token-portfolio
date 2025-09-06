import ReactApexChart from 'react-apexcharts'

export const Sparkline = ({ series, positive }) => {
    const options = {
      chart: {
        type: "line",
        sparkline: { enabled: true },
      },
      stroke: {
        curve: "smooth",
        width: 2,
        colors: [positive ? "#22c55e" : "#ef4444"],
      },
  
      tooltip: { enabled: false },
    };
  
    return (
      <ReactApexChart
        options={options}
        series={[{ name: "Price", data: series }]}
        type="line"
        width={120}
        height={40}
      />
    );
  };