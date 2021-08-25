import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import Error from '../../../components/Error';
import Loading from '../../../components/Loading';

import AddDepositDialog from './AddDepositDialog';

import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, ButtonGroup } from '@material-ui/core';

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
<div className="row justify-content-center">
        <div className='col-lg-8'>
            <AddDepositDialog />
            {deposits.map((v, i) =>
                <div key={i} className='row'>
                    <div className='card shadow col-12 p-2 mb-3'>
                        <div className="row justify-content-between align-items-center mx-4">
                            <div className="row ">
                                        <div className="text-primary text-center text-lg p-2" >{v.name}</div>
                                        <div className="row m-4"> {v.description}</div>

                            </div>

                            <div className="p-2">
                                <ButtonGroup size="small" variant="text" color="primary" >
                                    <Button  id={v._id} onClick={onhandleClick}> <DeleteIcon/></Button>
                                </ButtonGroup>
                            </div>

                        </div>
                        <hr/>
                        <div className="row m-4"> 
                        <div className="mx-2 p-2" >{v.joinPossible ? <CheckIcon color="primary"/> : <ClearIcon color="primary"/>}</div>

                                        <div style={{ display: 'inline' }}>이율</div>
                                        <div style={{ display: 'inline' }}>{v.interestRate}</div>

                                        <div style={{ display: 'inline' }}>최소가입금액</div>
                                        <div style={{ display: 'inline' }}>{v.minAmount}</div>
                                        <div style={{ display: 'inline' }}>최소 가입기간</div>
                                        <div style={{ display: 'inline' }}>{v.minDuration}</div>
                        </div>





            </div>
                </div>
            )}
        </div></div>

    )
}

export default MangeDeposits
