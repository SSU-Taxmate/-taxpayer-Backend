import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useSelector } from "react-redux";
import Error from '../../../components/Error'
import Loading from '../../../components/Loading'
function TaxBalance() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    let classData = useSelector(state => state.classInfo.classData);
    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const result = await axios.get(`/api/budget`, { params: { classId: classData.classId } })
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
            {isError && <Error></Error>}
            {isLoading ?
                <Loading /> : (
                    data &&
                    <div className="row justify-content-center">
                        <div className="col-xl-10 col-md-10 ">
                            <div className=" h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col-auto d-none d-sm-inline">
                                            <i className="fas fas fa-coins fa-2x text-gray-300 "></i>
                                        </div>
                                        <div className="px-2  d-none d-sm-inline"></div>
                                        <div className="col">
                                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1">국세청</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800 ">국가 자산</div>
                                        </div>
                                        <div className="px-3 "></div>
                                        <div className="col-auto">
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{data.balance+data.debet}미소</div>    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </>
    )
}

export default TaxBalance
