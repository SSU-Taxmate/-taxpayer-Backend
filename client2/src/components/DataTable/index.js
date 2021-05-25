import React, { Component } from 'react';
import $ from 'jquery';
class DataTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: props.id,
            data: props.data
        }
    }
    
    componentDidMount() {
        var tempdata=[
            [
                "2020.05.25",
                "980미소",
                "500미소",
                "500미소",
            ],
            [
                "2021.05.25",
                "980미소",
                "500미소",
                "500미소",
            ]
        ]
        $(document).ready(function () {
            $('#mytable').DataTable({
                data:tempdata,
            });
        });
     }
    render() {
        return (
            <div className="container">
            <table id="mytable" className="display" width="100%">
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