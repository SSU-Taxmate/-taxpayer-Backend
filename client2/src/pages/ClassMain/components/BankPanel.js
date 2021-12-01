import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from "react-redux";
import moment from 'moment-timezone';
import Loading from '../../../components/Loading'
import Error from '../../../components/Error'

function BankPanel() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setdata] = useState()
    const joinedUser = useSelector(state => state.classUser);

    const month = moment().tz('Asia/Seoul').month() + 1
    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const result = await axios.get(`/api/dashboard/bank`, { params: { studentId: joinedUser.classUser } })
                /*1) 이번달 수입 */
                let income;
                if (result.data.income.exist) {
                    income = result.data.income.income.filter((v) => v._id === month)
                    income=income[0].sum
                }else{
                    console.log('false!!')
                    income=0
                }
                /*2) 디데이*/
                let dday;
                //최소 가입기간 만족하는 날짜
                if (result.data.deposit.exist) {
                    const createdAt = result.data.deposit.createdAt
                    const duration = result.data.deposit.duration
                    const mindate = moment(createdAt).tz('Asia/Seoul').add(duration, 'd')
                    //오늘
                    const current = moment().tz('Asia/Seoul')
                    //디데이
                    dday = mindate.diff(current, 'days') + 1
                } else {
                    dday = '없음'
                }
                /* 3) 계좌 잔액*/

                setdata({ balance: result.data.balance, income: income, deposit: 0, dday: dday })
            } catch (error) {
                setIsError(true);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [joinedUser.classUser])
    return (
        <>  {isError && <Error />}
            {isLoading ?
                <Loading /> : (
                    data &&
                    <div>
                        <div className="row justify-content-center">
                            <div className="col-xl-10 col-md-10 ">
                                <div className=" h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col-auto d-none d-sm-inline">
                                                <i className="fas fas fa-university fa-2x text-gray-300 "></i>
                                            </div>
                                            <div className="px-2  d-none d-sm-inline"></div>
                                            <div className="col">
                                                <div className="text-xs font-weight-bold text-success text-uppercase mb-1">은행</div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800 ">내 계좌 잔액</div>
                                            </div>
                                            <div className="px-3 "></div>
                                            <div className="col-auto">
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">${data.balance}</div>    </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>

                        <hr className="m-0" />

                        <div className="row justify-content-center">

                            <div className="col-xl-5 col-md-5 ">
                                <div className=" h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                    이번 달 수입</div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">{data.income} 미소</div>
                                            </div>
                                            <div className="col-auto  "> <i className="fas fa-calendar fa-2x text-gray-300"></i></div></div></div></div></div>

                            <div className="seperator-gray py-5 m-0 px-0 d-none d-sm-inline"></div>

                            <div className="col-xl-5 col-md-5">
                                < div className="h-100 py-2" >
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                    예금</div>
                                                {data.dday === '없음' ? <div className="h5 mb-0 font-weight-bold text-gray-800">없음</div>
                                                    : <div className="h5 mb-0 font-weight-bold text-gray-800">D-{data.dday}</div>}

                                            </div>
                                            <div className="col-auto"><i className="fas  fa-money-check fa-2x text-gray-300"></i></div></div></div></div></div>

                        </div>
                    </div>
                )}
        </>

    )


}



export default BankPanel;
