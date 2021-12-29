import { margin } from "@mui/system";
import React, { Component } from "react";
import Chart from "react-apexcharts";

export default class DonutChart extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [44, 55, 41, 17],
        options: {
          chart: {
            type: 'donut',
          },
          legend:{  
            show: false,
          },
        fill: {
            colors: ['#1C5085', '#3E80CE','#64D5FF','#54A0FF', ]
          },

          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: "100%",
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        }
        }
       

      }
      

    render() {
      return (
        

  <div id="chart" style={{padding:2, marginTop:30}}>
<Chart options={this.state.options} series={this.state.series} type="donut" />
</div>


      );
    }
  }
