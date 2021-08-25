import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import moment from 'moment-timezone';
import Loading from '../../../../components/Loading'
import Error from '../../../../components/Error'

import axios from 'axios'
import ChartBar from '../../../../components/Charts/Bar';
function ByDate() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    //bydate
    const week = { 1: '일', 2: '월', 3: '화', 4: '수', 5: '목', 6: '금', 7: '토' }
    const [bydate, setbydate] = useState();
    const [bydatelabel, setbydatelabel] = useState()
    
    const joinedUser = useSelector(state => state.classUser);
    const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);
        try {
            const result = await axios.get(`/api/students/${joinedUser.classUser}/account/statistics`,
                {
                    params: {
                        type:'bydate',
                        startDate:moment().subtract(1, 'weeks').startOf('isoWeek').format('YYYY-MM-DD'),//지난주 월~
                        endDate:moment().subtract(1, 'weeks').endOf('isoWeek').add(1, 'd').format('YYYY-MM-DD')//일
                    }
                })
            setbydate(result.data.map((v, i) => v.sum))
            setbydatelabel(result.data.map((v, i) => week[v._id]))
        } catch (error) {
            setIsError(true);
        }
        setIsLoading(false);
    };
    useEffect(() => {
        fetchData();
    }, [])
    const bank_bar_data = [{
        labels: bydatelabel,
        datasets: [{
            label: '요일별 거래 금액',
            data: bydate,
            backgroundColor: [
                'rgb(75, 192, 192)',
                'rgb(255, 205, 86)',
                'rgb(255, 99, 132)',
                'rgb(153, 102, 255)',
            ],
            hoverOffset: 4
        }]
    }];
    const barChartField = React.useMemo(
        () => (
            <>
                {bank_bar_data.map((v, i) => {
                    return <ChartBar key={i}
                        id={`bank_bar_${i}`} title={v.datasets[0].label}
                        data={v} />
                })}
            </>
        ), [bydate, bydatelabel]);
    return (
        <div> 
            
            {isError && <Error></Error>}
            {isLoading ?
                <Loading /> : barChartField}
        </div>
    )
}

export default ByDate
