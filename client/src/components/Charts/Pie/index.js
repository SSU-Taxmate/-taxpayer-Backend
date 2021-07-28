import React, { useEffect } from "react";
import Chart from "chart.js";

Chart.defaults.global.defaultFontFamily = "Nunito";
Chart.defaults.global.defaultFontColor = "#858796";

export default function ChartPie(props) {
  //class로 바꾸었을 때는? 몇번이나..?
  const chartRef = React.createRef();
  useEffect(() => {
    //console.log('useEffect-ChartPie',props.data)

    const myChartRef = chartRef.current.getContext("2d");
    var pieChart;
    pieChart = new Chart(myChartRef, {
      type: "pie",
      data: props.data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
    return () => {
      //console.log('useEffect-CleanUP-ChartPie',pieChart)
      pieChart.destroy();
    };
  }, [props.data]);
  return (
    <div className="chart-area">
      <div className="h4">{props.title}</div>
      <div className="chart-pie">
        <canvas id={`${props.id}`} ref={chartRef}></canvas>
      </div>
    </div>
  );
}
