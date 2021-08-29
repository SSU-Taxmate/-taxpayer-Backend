import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import moment from 'moment-timezone';
import ChartBar from '../../../../components/Charts/Bar'
import Loading from '../../../../components/Loading'
import Error from '../../../../components/Error'

import axios from 'axios'
function BuyStockStat() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    let classData = useSelector(state => state.classInfo.classData);

    const [data, setdata] = useState();
    const [datalabel, setdatalabel] = useState();
    const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);
        try {
            const result = await axios.get(`/api/stocks/statistics`,
                {
                    params: {
                        classId: classData.classId,
                        startDate: moment().subtract(1, 'weeks').startOf('isoWeek').format('YYYY-MM-DD'),//지난주 월~
                        endDate: moment().subtract(1, 'weeks').endOf('isoWeek').add(1, 'd').format('YYYY-MM-DD')//일
                    }
                })
            console.log(result.data)
            setdata(result.data.map((v, i) => v.allquantity))
            setdatalabel(result.data.map((v, i) => v.stock.stockName))

        } catch (error) {
            setIsError(true);
        }
        setIsLoading(false);
    };
    useEffect(() => {
        fetchData();
    }, [])

    const buy_stock_bar = [{
        labels: datalabel,
        datasets: [{
            label: '매수량(주)',
            data: data,
            backgroundColor: [
                'rgba(255, 99, 132)',
                'rgba(255, 159, 64)',
                'rgba(255, 205, 86)',
                'rgba(75, 192, 192)',
                'rgba(54, 162, 235)',
                'rgba(153, 102, 255)',
                'rgba(201, 203, 207)'
            ],
            hoverOffset: 4
        }]
    }];
    const barChartField = React.useMemo(
        () => (
            <>
                {buy_stock_bar.map((v, i) => {
                    return <ChartBar key={i}
                        id={`buy_stock_bar_${i}`} data={v} title='지난주 매수 통계' />
                })}
            </>
        ), [data, datalabel]);
    return (
        <div>
            {isError && <Error></Error>}
            {isLoading ?
                <Loading /> : barChartField}
        </div>
    )
}

export default BuyStockStat
