import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useSelector } from "react-redux";
import Error from '../../../components/Error'
import Loading from '../../../components/Loading'
function TaxMonth() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    let classData = useSelector(state => state.classInfo.classData);
    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const result = await axios.get(`/api/budget/month`, { params: { classId: classData.classId } })
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
                        <div className="col">
                            <div className=" h-100 py-2">
                                <div className="card-body d-flex justify-content-center">
                                    <div className="row d-flex no-gutters align-items-center" style={{width:"80%",justifyContent:"space-between"}}>
                                        <div className="col-auto">
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">이번 달 세금</div></div>

                                        <div className="col-auto">
                                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                세입</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{data.balance.income +
                                        data.balance.realestate +
                                        data.balance.place +
                                        data.balance.electric +
                                        data.balance.stamp +
                                        data.balance.vat +
                                        data.balance.stock}미소</div>
                                        </div>


                                        <div className="col-auto">
                                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                세출</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{
                                            data.expenditure.culture +
                                        data.expenditure.education +
                                        data.expenditure.environment+
                                        budget.expenditure.etc}미소</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </>

    )
}

export default TaxMonth
