import axios from 'axios';
import React, {  useState ,useEffect} from 'react';
import { useSelector } from "react-redux";

import Error from '../../../../components/Error';
import Loading from '../../../../components/Loading';
function InvestStatus() {
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [data, setdata] = useState()    
    const joinedUser = useSelector(state => state.classUser);

    //console.log(data)//로그인 한 사람의 sum[currentPrice, allPayAmount] 

    const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);
        try {
            const result = await axios.get(`/api/students/${joinedUser.classUser}/stocks/statistics`)
            setdata(result.data)
            console.log(result.data)
        } catch (error) {
            setIsError(true);
        }
        setIsLoading(false);
    };
    useEffect(() => {
        fetchData();
    }, [joinedUser.classUser])
    return (
        <>
          
            
            {isError && <Error />}
            {isLoading ? <Loading /> :
                <div className="card py-1 col-md-4 border-0" style={{justifyContent:'space-evenly'}}>
                    <table className='m-3 border-right'>
                        <tbody>
                            <tr>
                                <td>총 매입</td>
                                <td>{data?data.allPay:''} 미소</td>
                            </tr>
                            <tr>
                                <td>총 평가</td>
                                <td>{data?data.allEvaluated:''} 미소</td>
                            </tr>
                            <tr>
                                <td>평가 손익</td>
                                <td>{data?data.evaluatedIncome:''} 미소</td>
                            </tr>
                            <tr>
                                <td>평가 수익률</td>
                                <td>{data?data.evaluatedProfit:''} %</td>
                            </tr>
                        </tbody>
                    </table>
                    
                </div>
            }
            
        </>

    )
}

export default InvestStatus
