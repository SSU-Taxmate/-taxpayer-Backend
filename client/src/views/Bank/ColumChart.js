import React, { Component } from "react";
import Chart from "react-apexcharts";

export default class ColumChart extends React.Component {
            constructor(props) {
              super(props);
    
              this.state = {
              
                series: [{
                  name: '지출',
                  data: [0, 55, 57, 56, 61, 58, 63]
                },
              
                {
                  name: '지출',
                  data: [44,0,0,0,0,0,0]
                },
                ],
                options: {
                  chart: {
                    type: 'bar',
                    height: 350,
                    stacked: true,
                  },
                  plotOptions: {
                    bar: {
                      horizontal: false,
                      columnWidth: '55%',
                      endingShape: 'rounded'
                    },
                  },
                  dataLabels: {
                    enabled: false
                  },
                
                  xaxis: {
                    categories: ['월', '화','수','목','금','토','일'],
                    style: {

                      fontWeight: 'bold',
                  },
                  },

                  yaxis: {  labels: {
                    show: false,}},
                  
                  fill: {
                    colors: ['#CCE3FF', '#2C98F0']
                  },
                  grid: {
                    show: false,
                    xaxis: {
                      lines: {
                          show: false
                      }
                  },   
                    row: {
                    
                        opacity: 0
                    }, },

                    legend: {
                      show: false,}
                 
                },
              
              
              };
            }
    
          
    
            render() {
              return (
                
    
          <div id="chart">
      <Chart options={this.state.options} series={this.state.series} type="bar" height={250} />
    </div>  );
        }
      }

