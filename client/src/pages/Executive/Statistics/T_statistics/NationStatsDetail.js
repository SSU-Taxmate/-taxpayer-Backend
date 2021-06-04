import React, { useEffect, useState } from 'react'
import CardBasic from '../../../../components/Cards/Basic'
import ChartPie from './../../../../components/Charts/Pie'
import DefaultTable from '../../../../components/Table/Default';
import DetailTable from '../../../../components/Table/Detail'
import axios from 'axios';

const NationStatsDetail = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [columns, setColumns] = useState([])
    const [data, setData] = useState([])
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
                setData(result.data['data']);
                setColumns(result.data['columns'])
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
                {isLoading ?
                    <div>loading</div> : (
                        <DefaultTable
                            title="제출여부"
                            columns={columns[0]}
                            data={data[0]}
                            options={{
                                sorting: true, filtering: true,exportButton: true,
                                grouping:true,
                            }}
                        />
                        )}
            </div>
            <CardBasic title='숙제입력'>
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
