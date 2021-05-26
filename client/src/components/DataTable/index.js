import React, { Component } from 'react';
import $ from 'jquery';
//datatable
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
class DataTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: props.id ? props.id : 'temp',
            data: props.data
        }
    }
    componentDidMount() {
        //console.log(this.el)
        //console.log(`#${this.state.id}`)
        var tempdata=[
            [
                "2020.05.25",
                "980미소",
                "500미소",
                "500미소",
            ],
            [
                "2021.05.25",
                "1미소",
                "500미소",
                "500미소",
            ]
        ]
            $(`#${this.state.id}`).DataTable({
                data:tempdata,
            });
       
     }
    render() {
        return (
            <div className="container">
            <table id={this.state.id} className="display" width="100%">
            <thead>
              <tr>
                <th scope="col">날짜</th>
                <th scope="col">내용</th>
                <th scope="col">이유</th>
                <th scope="col">금액</th>
              </tr>
            </thead>
            </table>
         </div>
        )
    }
}

export default DataTable;