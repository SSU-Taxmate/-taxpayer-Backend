import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CardBasic from '../../../../components/Cards/Basic'
import DefaultTable from '../../../../components/Table/Default';
import ChartPie from './../../../../components/Charts/Pie'
import Error from '../../../../components/Error';
function MyStatsDetail() {
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
    const [isLoading, setIsLoading] = useState(false)
    const [columns, setColumns] = useState([])
    const [data, setData] = useState([])
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const result = await axios.get('/api/stats/nation');
                setData(result.data['data']);
                setColumns(result.data['columns'])
            } catch (error) {
                setIsError(true);
            }
            setIsLoading(false);
        };
        fetchData();
        console.log(data)
    }, []);
    return (
        <div >
            <div className="card shadow mb-4">
                {isError && <Error></Error>}

                {isLoading ?
                    <div>loading</div> : (
                        <DefaultTable title='새로운 과제'
                            columns={columns[0]}
                            data={data[0]} />)
                }
            </div>
            <CardBasic title='과제현황'>
                <ChartPie title='학급과제현황' id='학급과제현황' data={hw_pie_data} />

                <div>전체 N회 중 i번 숙제를 미제출하였고, j번 늦게 제출하였습니다.</div>

            </CardBasic>
            <div className="card shadow mb-4">
                {isLoading ?
                    <div>loading</div> : (
                        <DefaultTable title="날짜 내용 제출여부 면제여부"
                            columns={columns[1]}
                            data={data[1]}
                        />)}
            </div>
            <div className="table-responsive">
                <table className="table table-bordered dataTable " id="S_dataTable" width="50%" cellSpacing="0"
                    role="grid" aria-describedby="dataTable_info" >
                    <thead>
                        <tr role="row" className="text-center text-primary">
                            <th className="sorting" tabIndex="0" aria-controls="S_dataTable" rowSpan="1" colSpan="1"
                                aria-label="Name: activate to sort column descending" aria-sort="ascending"
                            >날짜</th>
                            <th className="sorting" tabIndex="0" aria-controls="S_dataTable" rowSpan="1" colSpan="1"
                                aria-label="Age: activate to sort column ascending" >내용
                            </th>
                            <th className="sorting" tabIndex="0" aria-controls="S_dataTable" rowSpan="1" colSpan="1"
                                aria-label="Age: activate to sort column ascending" >제출여부
                            </th>

                            <th className="sorting" tabIndex="0" aria-controls="S_dataTable" rowSpan="1" colSpan="1"
                                aria-label="Age: activate to sort column ascending" >면제여부
                            </th>

                        </tr>
                    </thead>

                    <tbody>

                        <tr role="row" className="odd">
                            <td className="sorting_1">20.03.08</td>
                            <td>일기</td>
                            <td>O</td>
                            <td>쿠폰사용</td>

                        </tr>
                        <tr role="row" className="even">
                            <td className="sorting_1">20.03.12</td>
                            <td>일기</td>

                            <td>O</td>
                            <td>33</td>
                        </tr>
                        <tr role="row" className="odd">
                            <td className="sorting_1">20.03.11</td>
                            <td>일기</td>
                            <td>O</td>
                            <td>33</td>
                        </tr>

                    </tbody>
                    <tfoot>
                        <tr>
                            <th>날짜</th>
                            <th>내용</th>
                            <th>제출여부</th>
                            <th>면제여부</th>
                        </tr>
                    </tfoot>
                </table>

            </div>


        </div>

    )
}

export default MyStatsDetail
