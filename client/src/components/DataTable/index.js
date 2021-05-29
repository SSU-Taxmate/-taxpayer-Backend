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
            head:props.head?props.head:[],
            data: props.data,
        }
    }
    componentDidMount() {
        //console.log(this.el)
        //console.log(`#${this.state.id}`)
        console.log(this.state.data,`#${this.state.id}`)
      
        $(`#${this.state.id}`).DataTable({
            data: this.state.data,
        });
    }
    
    addth=()=>{
        const result=[];
        for (let i=0;i<4;i++){
        result.push(
            <th scope="col">{this.state.head[i]}</th>)
        }
        return result
    }
    render() {
        return (
            <div className="container">
                <table id={this.state.id} className="display" width="100%">
                    <thead>
                        <tr>
                           {this.addth()}
                        </tr>
                    </thead>
                </table>
            </div>
        )
    }
}

export default DataTable;