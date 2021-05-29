import React from 'react'
import CardBasic from '../../../../components/Cards/Basic'
import DataTable from '../../../../components/DataTable'
import ChartPie from './../../../../components/Charts/Pie'
function MyStatsDetail() {
    return (
        <div className="col">
            <CardBasic title='표로로'>
                <ChartPie></ChartPie>

                <div>학생들에게 보여질 부분. 전체 N회 중 i번 숙제를 미제출하였고, j번 늦게 제출하였습니다. 진행중인 과제는 2개입니다.</div>

            </CardBasic>
            <CardBasic title='날짜, 내용, 제출여부, 면제여부'>
                <div className="table-responsive">
                    <table className="table table-bordered dataTable " id="S_dataTable" width="50%" cellspacing="0"
                        role="grid" aria-describedby="dataTable_info" >
                        <thead>
                            <tr role="row" className="text-center text-primary">
                                <th ></th>
                                <th className="sorting" tabindex="0" aria-controls="S_dataTable" rowspan="1" colspan="1"
                                    aria-label="Name: activate to sort column descending" aria-sort="ascending"
                                >날짜</th>
                                <th className="sorting" tabindex="0" aria-controls="S_dataTable" rowspan="1" colspan="1"
                                    aria-label="Age: activate to sort column ascending" >내용
                        </th>
                                <th className="sorting" tabindex="0" aria-controls="S_dataTable" rowspan="1" colspan="1"
                                    aria-label="Age: activate to sort column ascending" >제출여부
                        </th>

                                <th className="sorting" tabindex="0" aria-controls="S_dataTable" rowspan="1" colspan="1"
                                    aria-label="Age: activate to sort column ascending" >면제여부
                        </th>

                            </tr>
                        </thead>

                        <tbody>

                            <tr role="row" className="odd">
                                <td></td>
                                <td className="sorting_1">20.03.08</td>
                                <td>일기</td>
                                <td>O</td>
                                <td>쿠폰사용</td>

                            </tr>
                            <tr role="row" className="even">
                                <td></td>
                                <td className="sorting_1">20.03.12</td>
                                <td>일기</td>

                                <td>O</td>
                                <td>33</td>
                            </tr>
                            <tr role="row" className="odd">
                                <td></td>
                                <td className="sorting_1">20.03.11</td>
                                <td>일기</td>
                                <td>O</td>
                                <td>33</td>
                            </tr>

                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <th>날짜</th>
                                <th>내용</th>
                                <th>제출여부</th>
                                <th>면제여부</th>
                            </tr>
                        </tfoot>
                    </table>

                </div>

            </CardBasic>

        </div>

    )
}

export default MyStatsDetail
