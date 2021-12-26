import React, { Component } from "react";
import Chart from "react-apexcharts";

export default class ColumChart extends React.Component {
            constructor(props) {
              super(props);
    
              this.state = {
              
                series: [{
                  name: 'Net Profit',
                  data: [44, 55, 57, 56, 61, 58, 63]
                }, ],
                options: {
                  chart: {
                    type: 'bar',
                    height: 350
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
                  stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                  },
                  xaxis: {
                    categories: ['월', '화','수','목','금','토','일'],
                  },
                  
                  fill: {
                    opacity: 1
                  },
                  tooltip: {
                    y: {
                      formatter: function (val) {
                        return "$ " + val + " thousands"
                      }
                    }
                  }
                },
              
              
              };
            }
    
          
    
            render() {
              return (
                
    
          <div id="chart">
      <Chart options={this.state.options} series={this.state.series} type="bar" height={200} />
    </div>  );
        }
      }

