import React, { useEffect } from "react";
import Chart from "chart.js";

Chart.defaults.global.defaultFontFamily = "Nunito";
Chart.defaults.global.defaultFontColor = "#858796";

function ChartPie(props) {
  //class로 바꾸었을 때는? 몇번이나..?
  const chartRef = React.createRef();
  useEffect(() => {
<<<<<<< HEAD
    console.log('useEffect-ChartPie',props.data)
=======
    console.log("useEffect-ChartPie", props.data);
>>>>>>> 0ba7923da5bfaa660aeb4b294b9cf873cb322ecd

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
<<<<<<< HEAD
      <div className="h6">{props.title}</div>
=======
      <div className="h5">{props.title}</div>
>>>>>>> 0ba7923da5bfaa660aeb4b294b9cf873cb322ecd
      <div className="chart-pie">
        <canvas id={`${props.id}`} ref={chartRef}></canvas>
      </div>
    </div>
  );
}
<<<<<<< HEAD
export default ChartPie
=======
export default ChartPie;
>>>>>>> 0ba7923da5bfaa660aeb4b294b9cf873cb322ecd
