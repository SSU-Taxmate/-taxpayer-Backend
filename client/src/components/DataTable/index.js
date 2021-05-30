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
            hData: props.hData ? props.hData : [],
            hSize: props.hSize?props.hSize:0,
            data: props.data,
        }
    }

    
    componentDidMount() {
        //console.log(this.el)
        //console.log(`#${this.state.id}`)
        //console.log(this.state.data, `#${this.state.id}`)
        
        $(`#${this.state.id}`).DataTable({
            data: this.state.data,
            initComplete: function () {
                this.api().columns().every(function () {
                    var column = this;
                    var select = $('<select><option value=""></option></select>')
                        .appendTo($(column.footer()).empty())
                        .on('change', function () {
                            var val = $.fn.dataTable.util.escapeRegex(
                                $(this).val()
                            );

                            column
                                .search(val ? '^' + val + '$' : '', true, false)
                                .draw();
                        });

                    column.data().unique().sort().each(function (d, j) {
                        select.append('<option value="' + d + '">' + d + '</option>')
                    });
                });
            }
        });

    }

    addth = () => {
        const result = [];
        for (let i = 0; i < 4; i++) {
            result.push(
                <th scope="col" key={i}>{this.state.hData[i]}</th>)
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
                    <tfoot>
                        <tr>
                            {this.addth()}
                        </tr>
                    </tfoot>
                </table>
            </div>
       )
    }
}

export default DataTable;