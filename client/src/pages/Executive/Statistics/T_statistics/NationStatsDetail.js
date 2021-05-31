import React, { useEffect, useState } from 'react'
import CardBasic from '../../../../components/Cards/Basic'
import DataTable from '../../../../components/DataTable'
import ChartPie from './../../../../components/Charts/Pie'

import axios from 'axios';

const NationStatsDetail = () => {
    const [isLoading, setIsLoading]=useState(false)
    const [columns,setColumns]=useState([])
    const [rows,setRows]=useState([])
    const [err, setIsError] = useState(false);

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

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);

            try {
                const result = await axios.get('/api/stats/nation');
                setRows(result.data['rows']);
                setColumns(result.data['columns'])
            //지금 이렇게 보내지고 있기 때문에...! 더 잘 생각해보자 
            //console.log('NationalStatsDetail',result.data['headings'])
            } catch (error) {
                setIsError(true);
            }

            setIsLoading(false);
        };
        fetchData();
    }, []);

    return (
        <div className="col">
            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-responsive">
                        {isLoading ?
                            <div>loading</div> : (
                                <DataTable id='debt' columns={columns} rows={rows}/>
                            )}

                    
                    </div>
                </div>
            </div>
            <CardBasic title='표로로'>
            </CardBasic>

            <CardBasic title='상황'>
                <div className="row">
                    <ChartPie title='학급과제현황' id='학급과제현황' data={hw_pie_data} />
                </div>

            </CardBasic>


        </div>
    )
}

export default NationStatsDetail
