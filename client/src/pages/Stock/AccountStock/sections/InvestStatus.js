import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import Error from '../../../../components/Error';
import Loading from '../../../../components/Loading';

function InvestStatus({data}) {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const joinedUser = useSelector(state => state.classUser);
    const [balance, setbalance] = useState()
    
    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const result = await axios.get(`/api/students/${joinedUser.classUser}/account`);
                setbalance(result.data.currentBalance)
            } catch (error) {
                setIsError(true);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [joinedUser.classUser])
    return (
        <>
            {isError && <Error />}
            {isLoading ? <Loading /> :
                <div className="card shadow py-1 col-lg-4">
                    <table className='m-3'>
                        <tbody>
                            <tr>
                                <td>투자 가능 금액</td>
                                <td>{balance} 미소</td>
                            </tr>
                            <tr>
                                <td>손익</td>
                                <td>{1000} 미소</td>
                            </tr>
                            <tr>
                                <td>수익률</td>
                                <td>{1.25} %</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }
        </>

    )
}

export default InvestStatus
