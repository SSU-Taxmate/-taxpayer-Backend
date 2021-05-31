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
            columns: props.columns ? props.columns : [],
            rows: props.rows ? props.rows : [],

        }
        // console.log("cons",this.state.columns)

    }
    componentDidMount() {
        //console.log("cdm",this.state.columns)
        //console.log(this.state.columns.length)
        if (this.state.columns.length) {
            //console.log("cdm2",this.state.columns)

            $(`#${this.state.id}`).DataTable({
               
                
                data: this.state.rows,
                columns: this.state.columns,
                
                /* function */
                initComplete: function () {
                    this.api().columns().every(function () {
                        var column = this;
                        //console.log(column.footer())

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
                },

                autoWidth:true,
                stateSave: true,
                language: {
                    info: "_PAGE_ / _PAGES_ 페이지",
                    infoFiltered: "( _MAX_개의 데이터 중 조건에 맞는 값만 보여집니다. )",
                    zeroRecords: "해당 조건에 맞는 데이터는 없습니다",
                    "lengthMenu": "_MENU_ 개씩 보기",
                    "paginate": {
                        "first": "맨 앞",
                        "last": "맨 뒤",
                        "next": "다음",
                        "previous": "이전"
                    },

                },

            });
            /*$(`#${this.state.id}`).append(
                $('<tfoot/>').append( $(`#${this.state.id} thead tr`).clone() )
            );*/
        }
    }





    render() {

        return (
            <div className="container">
                <table id={this.state.id} className="display" width="100%">
                  
                </table>
            </div>
        )
    }
}

export default DataTable;