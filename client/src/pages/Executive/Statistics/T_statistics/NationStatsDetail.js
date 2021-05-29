import React from 'react'
import CardBasic from '../../../../components/Cards/Basic'
import DataTable from '../../../../components/DataTable'
import ChartPie from './../../../../components/Charts/Pie'
function NationStatsDetail() {
    const hw_pie_data = {
        labels: [
          '제출완료',
          '미제출',
          '진행중',
         
        ],
        datasets: [{
          data: [30, 15, 30],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(75, 192, 192)',
            'rgb(255, 205, 86)',
          ],
          hoverOffset: 2
        }],
    
      };
    return (
        <div className="col">
            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered dataTable " id="dataTable" width="50%" cellspacing="0"
                            role="grid" aria-describedby="dataTable_info" >
                            <thead>
                                <tr role="row" className="text-center text-primary">
                                    <th className="sorting" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1"
                                        aria-label="Name: activate to sort column descending" aria-sort="descending"
                                    >날짜</th>
                                    <th className="sorting" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1"
                                        aria-label="Name: activate to sort column descending" aria-sort="ascending"
                                    >학번</th>
                                    <th className="sorting" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1"
                                        aria-label="Name: activate to sort column descending" aria-sort="ascending"
                                    >이름</th>
                                    <th className="sorting" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1"
                                        aria-label="Age: activate to sort column ascending">제출
                                    </th>
                                    <th className="sorting" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1"
                                        aria-label="Age: activate to sort column ascending" >미제출
                                    </th>
                                    <th className="sorting" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1"
                                        aria-label="Age: activate to sort column ascending">면제
                                    </th>

                                </tr>
                            </thead>

                            <tbody>


                                <tr role="row" className="odd">
                                    <td className='data-content'>20.03.08</td>
                                    <td className='sorting_1'>3</td>
                                    <td>Airi Satou</td>
                                    <td>33</td>
                                    <td>33</td>
                                    <td>33</td>
                                </tr>
                                <tr role="row" className="even">
                                    <td className='data-content'>20.03.08</td>
                                    <td className='sorting_1'>4</td>
                                    <td>Airi Satou</td>
                                    <td>33</td>
                                    <td>33</td>
                                    <td>33</td>
                                </tr>
                                <tr role="row" className="odd">
                                    <td className='data-content'>20.03.08</td>
                                    <td className='sorting_1'>5</td>
                                    <td >Airi Satou</td>
                                    <td>33</td>
                                    <td>33</td>
                                    <td>33</td>
                                </tr>
                                <tr role="row" className="even">
                                    <td className='data-content'>20.03.08</td>
                                    <td className='sorting_1'>6</td>
                                    <td>Airi Satou</td>
                                    <td>33</td>
                                    <td>33</td>
                                    <td>33</td>
                                </tr>
                                <tr role="row" className="odd">
                                    <td className='data-content'>20.03.07</td>
                                    <td className='sorting_1'>5</td>
                                    <td >Airi Satou</td>
                                    <td>33</td>
                                    <td>33</td>
                                    <td>33</td>
                                </tr>
                                <tr role="row" className="even">
                                    <td className='data-content'>20.03.07</td>
                                    <td className='sorting_1'>6</td>
                                    <td>Airi Satou</td>
                                    <td>33</td>
                                    <td>33</td>
                                    <td>33</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>날짜</th>
                                    <th>학번</th>
                                    <th>이름</th>
                                    <th>제출</th>
                                    <th>미제출</th>
                                    <th>면제여부</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
            <CardBasic title='표로로'>
            <DataTable></DataTable>
            </CardBasic>

            <CardBasic title='상황'>
                <div className="row">
                    <ChartPie title='학급과제현황' id='학급과제현황' data={hw_pie_data}/>
                </div>
            
            </CardBasic>
    

        </div>
    )
}

export default NationStatsDetail
