import { useState } from 'react';
import ReactApexChart from 'react-apexcharts'

export const DonutChart = () => {
    const [state, setState] = useState({
  
      series: [44, 55, 13, 33, 77, 54],
      options: {
        chart: {
          width: 300,
          type: 'donut',
        },
        labels: ["Bitcoin (BTC)", "Ethereum (ETH)", "Solana (SOL)", "Dogecoin (DOGE)", "Solana (SOL)", "Solana (SOL)"],
        colors: ["#f39c12", "#8e44ad", "#1abc9c", "#3498db", '#FB7185'],
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
        legend: {
          position: "right",
          offsetY: -25,
          height: 180,
          padding: 4,
          itemMargin: {
            vertical: 8,
          },
          labels: {
            useSeriesColors: true,
          },
          markers: {
            width: 0,
            height: 0,
          },
        },
      }
    });
  
    function appendData() {
      var arr = state.series.slice()
      arr.push(Math.floor(Math.random() * (100 - 1 + 1)) + 1)
  
      setState({
        ...state,
        series: arr
      })
    }
  
    function removeData() {
      if (state.series.length === 1) return
  
      var arr = state.series.slice()
      arr.pop()
  
      setState({
        ...state,
        series: arr
      })
    }
  
    function randomize() {
      setState({
        ...state,
        series: state.series.map(function () {
          return Math.floor(Math.random() * (100 - 1 + 1)) + 1
        })
      })
    }
  
    function reset() {
      setState({
        ...state,
        series: [44, 55, 13, 33]
      })
    }
  
    return (
      <div className=''>
        <div>
          <div className="chart-wrap">
            <div id="chart">
              <ReactApexChart options={state.options} series={state.series} type="donut" width={300} />
            </div>
          </div>
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }