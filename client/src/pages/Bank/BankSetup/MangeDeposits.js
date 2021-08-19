import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import Error from '../../../components/Error';
import Loading from '../../../components/Loading';

import AddDepositDialog from './AddDepositDialog';

function MangeDeposits() {
    let classData = useSelector(state => state.classInfo.classData);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [deposits, setdeposits] = useState([]);
    const onhandleClick = (e) => {
        //e.preventDefault();
        axios.delete(`/api/bank/deposits/${e.target.id}`)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);
        try {
            const result = await axios.get(`/api/bank/deposits`, { params: { classId: classData.classId } })
            setdeposits(result.data)
            // console.log(result.data)//Alert로 사용자에게 보여주기
        } catch (error) {
            setIsError(true);
        }
        setIsLoading(false);
    };
    useEffect(() => {
        fetchData();
    }, [])
    return (

        <div className='col'>
            <AddDepositDialog />
            {deposits.map((v, i) =>
                <div key={i} className='row'>
                    <div className='col-11 p-2 mb-3' style={{ backgroundColor: '#ffffff', border: 1 }}>
                        <div className='row p-2'>
                            <div className='col-md-6'>
                                <div className='mb-2'>
                                    <p style={{ display: 'flex', justifyContent: 'space-between', alignItems:'center' }}>
                                        <span className="text-primary" style={{fontSize: '5vw'}}>{v.name}</span>
                                        <span style={{fontSize: '3vw'}}>가입가능 {v.joinPossible ? "O" : "X"}</span>
                                    </p>
                                </div>
                                <div className="row-4"> {v.description}</div>
                            </div>
                            <div className='col-md-4'>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item list-inline" style={{ display: 'flex', "justifyContent": 'space-between' }}>
                                        <div style={{ display: 'inline' }}>이율</div>
                                        <div style={{ display: 'inline' }}>{v.interestRate}</div>
                                    </li>
                                    <li className="list-group-item" style={{ display: 'flex', "justifyContent": 'space-between' }}>
                                        <div style={{ display: 'inline' }}>최소가입금액</div>
                                        <div style={{ display: 'inline' }}>{v.minAmount}</div>
                                    </li>
                                    <li className="list-group-item" style={{ display: 'flex', "justifyContent": 'space-between' }}>
                                        <div style={{ display: 'inline' }}>최소 가입기간</div>
                                        <div style={{ display: 'inline' }}>{v.minDuration}</div>
                                    </li>

                                </ul>
                            </div>
                            <div className='col-md-2 text-right' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <button id={v._id} onClick={onhandleClick} className='btn btn-outline-primary mb-3' >-</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}

export default MangeDeposits
