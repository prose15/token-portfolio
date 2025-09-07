
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts'

export const DonutChart = ({data,labels}) => {
    const [state, setState] = useState({
  
      series: data,
      options: {
        chart: {
          width: 300,
          type: 'donut',
        },
        labels: labels,
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 1
        },
        plotOptions: {
          pie: {
            donut: {
              size: "50%",
            },
          },
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              show: false
            }
          }
        }],
        // legend: {
        //   position: "right",
        //   offsetY: -25,
        //   height: 180,
        //   padding: 4,
        //   itemMargin: {
        //     vertical: 8,
        //   },
        //   labels: {
        //     useSeriesColors: true,
        //   },
        //   markers: {
        //     width: 0,
        //     height: 0,
        //   },
        // },
        legend: {
          show: false
        }
      }
    });

    return (
      <div className=''>
        <div>
          <div className="chart-wrap">
            <div id="chart">
              <ReactApexChart options={state.options} series={state.series} type="donut" width={180} />
            </div>
          </div>
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }