import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useSelector } from "react-redux";
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Error from '../../../components/Error';
import Loading from '../../../components/Loading'

function TodayRate() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState();

    let classData = useSelector(state => state.classInfo.classData);
    const joinedUser = useSelector(state => state.classUser);
    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const result = await axios.get(`/api/dashboard/stock/rate`, { params: { classId: classData.classId, studentId: joinedUser.classUser } })
                setData(result.data)
            } catch (error) {
                setIsError(true);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [])
    return (
        <>
            {isError && <Error/>}
            {isLoading ?
                <Loading /> : (
                    data &&
                    <div className="row justify-content-center">
                        <div className="col-xl-10 col-md-10 ">
                            <div className="row justify-content-center">
                                <div className="col-xl-6 col-md-6 col-6 ">
                                    <div className=" h-100 py-2">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                                    평가 수익률</div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">{data.evaluatedProfit}%</div>    </div>

                                            <div className="col-auto d-flex">
                                                {data.evaluatedProfit >= 0 ?
                                                    <ArrowDropUpIcon fontSize="large" className="text-danger" /> : <ArrowDropDownIcon fontSize="large" className="text-primary" />}
                                            </div>


                                        </div></div></div>
                                <div className="col-xl-6 col-md-6 col-6">
                                    <div className=" h-100 py-2">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                                    평균 등락률</div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">{data.fluctuation}%</div>    </div>

                                            <div className="col-auto d-flex">
                                                {data.fluctuation >= 0 ?
                                                    <ArrowDropUpIcon fontSize="large" className="text-danger" /> : <ArrowDropDownIcon fontSize="large" className="text-primary" />}
                                            </div>


                                        </div></div></div>

                            </div></div>
                    </div>
                )}
        </>
    )
}

export default TodayRate
