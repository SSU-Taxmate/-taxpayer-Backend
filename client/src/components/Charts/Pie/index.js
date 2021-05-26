import React, { Component } from 'react';
import Chart from "chart.js";

Chart.defaults.global.defaultFontFamily = 'Nunito';
Chart.defaults.global.defaultFontColor = '#858796';
class ChartPie extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: props.title ? props.title : '',
            id: props.id,
            data: props.data
        }
    }
    chartRef = React.createRef();
    componentDidMount() {

        const myChartRef = this.chartRef.current.getContext("2d");
        console.log(this.chartRef);
        //console.log(this.state.data);
        const dataset = this.state.data;
        const title = this.state.title;
        new Chart(myChartRef, {
            type: 'pie',
            data: dataset,
            options: {
                responsive: true,
                maintainAspectRatio: false,

            }

        });
    }
    render() {
        return (
            <div className='chart-area'>
                <div class='h6'>{this.state.title}</div>
                <div className='chart-pie'>
                    <canvas id={`${this.state.id}`} ref={this.chartRef} ></canvas>
                </div>
            </div>
        )
    }
}

export default ChartPie;