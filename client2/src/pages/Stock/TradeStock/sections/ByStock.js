import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import axios from 'axios'
import moment from 'moment-timezone';

import Loading from '../../../../components/Loading'
import Error from '../../../../components/Error'

function ByStock() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    let classData = useSelector(state => state.classInfo.classData);
    const [data, setdata] = useState([])
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
            setdata(result.data)

        } catch (error) {
            setIsError(true);
        }
        setIsLoading(false);
    };
    useEffect(() => {
        fetchData();
    }, [])


    return (
        <div className="col-lg-6 account-card shadow bg-white">
            {isError && <Error></Error>}
            {isLoading ? (
                <Loading />
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" className="text-left">주식명</th>
                            <th scope="col" className="text-left">총 매수 금액</th>
                            <th scope="col" className="text-left">총 매수량</th>
                        </tr>
                    </thead>
                    <tbody>

                        {data.map((v, i) => <tr key={i}>
                            <td className="text-left">{v.stock.stockName}</td>
                            <td className="text-left">{v.allpayAmount}</td>
                            <td className="text-left">{v.allquantity}</td>
                        </tr>
                        )}

                    </tbody>

                </table>
            )}
        </div>

    )
}

export default ByStock
