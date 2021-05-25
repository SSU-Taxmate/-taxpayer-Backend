import React, { Component } from 'react';
import Chart from "chart.js";

Chart.defaults.global.defaultFontFamily = 'Nunito';
Chart.defaults.global.defaultFontColor = '#858796';
class ChartPie extends Component {
    constructor(props){
        super(props)
        this.state={
            title: props.title ? props.title : 'title없음' ,
            id:props.id,
            data:props.data
        }
    }
    chartRef = React.createRef();
    componentDidMount(){
        
        const myChartRef = this.chartRef.current.getContext("2d");
        console.log(this.chartRef);
        //console.log(this.state.data);
        console.log(this.state.title);
        const dataset=this.state.data;
        new Chart(myChartRef, {
            type: 'pie',
            data: dataset,
            options: {
                responsive:true,
                maintainAspectRatio: false,
                plugins: {
                  title: {
                    display: true,
                    text: `${this.state.title}`,
                    padding: {
                      top: 5,
                      bottom: 5
                    }
                  }
            
                }
              }
            
        });
    }
    render() {
        return (
              <div className='chart-area'>
                <div className='chart-pie'>
                <canvas id={`${this.state.id}`} ref={this.chartRef} ></canvas>
                </div>
                </div>
       )
    }
}

export default ChartPie;