import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CardBasic from '../../../../components/Cards/Basic'
import ChartPie from './../../../../components/Charts/Pie'
import Error from '../../../../components/Error';
import { useSelector } from "react-redux";
import { DataGrid } from '@material-ui/data-grid';

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
    const makeData=(data)=>{
        let c1=[0,0,0]
        let c2=[0,0,0]
        data.map((v,i)=>{
            console.log(v)
            if(v.submission==true){
                c1[0]+=1
            }else if(v.submission==false){
                c1[1]+=1
            }else{
                c1[2]+=1
            }
            if(v.withinDeadline==true){
                c2[0]+=1
            }else if(v.withinDeadline==false){
                c2[1]+=1
            }else{
                c2[2]+=1
            }
        })
      return c1,c2
    }
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState([])
    const columns=[
        {field:'name',headerName:'숙제명',width:150},
        {field:'detail',headerName:'설명',width:150},
        {field:'submission',headerName:'제출여부',width:150},
        {field:'withinDeadline',headerName:'기한내제출여부',width:150},
        {field:'coupon_id',headerName:'면제여부',width:150},
    ]
    let joinedUser = useSelector(state => state.classUser);
    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const result = await axios.get(`/api/students/${joinedUser.classUser}/homeworks`);
                result.data.map((v,i)=>{
                    v['id']=i
                })
                setData(result.data);
            } catch (error) {
                setIsError(true);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [joinedUser.classUser]);
    return (
        <div >
            <div className="card shadow mb-4">
                {isError && <Error></Error>}

                {isLoading ?
                    <div>loading</div> : (
                        <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={data}
                            columns={columns}
                            pageSize={5}
                            disableSelectionOnClick
                        />
                    </div>)
                }
            </div>
            <CardBasic title='과제현황' className='row'>
                <ChartPie className='col-6' title='제출/미제출' id='학급과제현황' data={hw_pie_data} />
                <ChartPie className='col-6'title='기간내제출' id='학급과제현황' data={hw_pie_data} />
                <div>전체 N회 중 i번 숙제를 미제출하였고, j번 늦게 제출하였습니다.</div>
            </CardBasic>
      
        </div>

    )
}

export default MyStatsDetail
