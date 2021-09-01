import React, { useEffect } from "react";

import Chart from "chart.js";

Chart.defaults.global.defaultFontFamily = "Nunito";
Chart.defaults.global.defaultFontColor = "#858796";

export default function ChartBar(props) {

    const chartRef = React.createRef();
    useEffect(() => {
        const myChartRef = chartRef.current.getContext("2d");
        var barChart;
        barChart=new Chart(myChartRef, {
            type: 'bar',
            data: props.data,
            options: {
                responsive:true,
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        left: 10,
                        right: 10,
                        top: 20,
                        bottom: 0
                    }
                },
                scales: {
                    xAxes: [{
                        time: {
                            unit: 'week'
                        },
                        gridLines: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            maxTicksLimit: 7
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            maxTicksLimit: 5,
                            padding: 10,
                            // Include a dollar sign in the ticks
                        },
                        gridLines: {
                            color: "rgb(234, 236, 244)",
                            zeroLineColor: "rgb(234, 236, 244)",
                            drawBorder: false,
                            borderDash: [2],
                            zeroLineBorderDash: [2]
                        }
                    }],
                },
                legend: {
                    display: true
                },
                tooltips: {
                    backgroundColor: "rgb(255,255,255)",
                    bodyFontColor: "#858796",
                    titleMarginBottom: 10,
                    titleFontColor: '#6e707e',
                    titleFontSize: 14,
                    borderColor: '#dddfeb',
                    borderWidth: 1,
                    xPadding: 15,
                    yPadding: 15,
                    displayColors: false,
                    intersect: false,
                    mode: 'index',
                    caretPadding: 10,
                    callbacks: {
                        label: function (tooltipItem, chart) {
                            var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                            return datasetLabel + ':' + tooltipItem.yLabel;
                        }
                    }
                }
            }
        });
        return () => {
            barChart.destroy()
        }
    }, )

  return (
    <div className="chart-area">
      <div className="h4 mt-1">{props.title}</div>
      <div className="chart-bar">
        <canvas id="myBarChart" ref={chartRef}></canvas>
      </div>
    </div>
  );
}
