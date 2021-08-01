import React, { useEffect } from 'react';
import Chart from "chart.js";

export default function ChartDonut(props) {
    const chartRef = React.createRef();
    useEffect(() => {
        const myChartRef = chartRef.current.getContext("2d");
        var donutChart;
        donutChart=new Chart(myChartRef, {
            type: 'doughnut',
            data: props.data,
            options: {
                responsive:true,
                maintainAspectRatio: false,
                tooltips: {
                    backgroundColor: "rgb(255,255,255)",
                    bodyFontColor: "#858796",
                    borderColor: '#dddfeb',
                    borderWidth: 1,
                    xPadding: 15,
                    yPadding: 15,
                    displayColors: false,
                    caretPadding: 10,
                },
                legend: {
                    display: false
                },
                cutoutPercentage: 80,
            },
        });


        return () => {
            donutChart.destroy()

        }
    })
    return (
        <div className='chart-area'>
        <div className="chart-pie">
            <canvas id={`${props.id}`} ref={chartRef}></canvas>
        </div>

    </div>
    )
}


/*class ChartDonut extends Component {
    constructor(props){
        super(props)
        this.state={
            title: props.title ? props.title : 'title없음' ,
            id:props.id,
            data:props.data
        }
    }
    chartRef = React.createRef();
    componentDidMount() {

        const myPieChart = this.chartRef.current.getContext("2d");
        console.log(this.chartRef);
        const dataset=this.state.data;
        new Chart(myPieChart, {
            type: 'doughnut',
            data: dataset,
            options: {
                responsive:true,
                maintainAspectRatio: false,
                tooltips: {
                    backgroundColor: "rgb(255,255,255)",
                    bodyFontColor: "#858796",
                    borderColor: '#dddfeb',
                    borderWidth: 1,
                    xPadding: 15,
                    yPadding: 15,
                    displayColors: false,
                    caretPadding: 10,
                },
                legend: {
                    display: false
                },
                cutoutPercentage: 80,
            },
        });
    }

    render() {
        return (
            <div className='chart-area'>
                <div className="chart-pie">
                    <canvas id={`${this.state.id}`} ref={this.chartRef}></canvas>
                </div>

            </div>

        )
    }
}

export default ChartDonut;
*/