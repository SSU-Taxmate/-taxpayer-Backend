import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import axios from 'axios'
import ChartPie from '../../../../components/Charts/Pie';
import Loading from '../../../../components/Loading'
import Error from '../../../../components/Error'
import NoholdingStocks from './NoholdingStocks'
function ByStudentStock() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    let joinedUser = useSelector(state => state.classUser);
    let classData = useSelector(state => state.classInfo.classData);

    const [data, setdata] = useState()
    const [datalabel, setdatalabel] = useState()

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            try {//학생이 구매한 대한 통계정보
                const result = await axios.get(`/api/students/${joinedUser.classUser}/stocks`,
                    {
                        params: {
                            classId: classData.classId,
                        }
                    })
                console.log('result', result)
                if (result.data.length !== 0) {
                    let sumData = result.data.map((v, i) => v.currentPrice * v.quantity)
                                            .reduce((prev, cur) => prev + cur)
                    setdata(result.data.map((v, i) => Math.round(v.currentPrice * v.quantity / sumData * 100)))
                    setdatalabel(result.data.map((v, i) => v.stockName))
                }

            } catch (error) {
                setIsError(true);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [joinedUser])
    const stock_user_pie_data = [{
        labels: datalabel,
        datasets: [{
            label: '',//입/출금 내역
            data: data,
            backgroundColor: [
                'rgb(75, 192, 192)',
                'rgb(255, 205, 86)',
                'rgb(255, 99, 132)',
                'rgb(153, 102, 255)',
            ],
            hoverOffset: 4
        }]
    }];
    const pieChartField = React.useMemo(
        () => (
            <div style={{ justifyContent: 'space-evenly' }}>
                {stock_user_pie_data.map((v, i) => {
                    return <ChartPie key={i}
                        id={`stock_user_pie_${i}`} title={'보유 비중 (%)'}
                        data={v} />
                })}
            </div>
        ), [datalabel, data]);
    return (
        <>
            {isError ? <Error /> :
                isLoading ? (
                    <Loading />
                ) :
                data?(pieChartField):<NoholdingStocks/>
            }
        </>

    )
}

export default ByStudentStock
