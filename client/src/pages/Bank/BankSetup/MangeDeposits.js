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


import "../../../styles/css/jobModal.css"

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
                                        <div className="text-primary text-center text-lg p-2" >{v.name} </div>
                                        <div className="seperator-gray m-2"></div>
                                        <div className="mx-2 p-2"> {v.description}</div>

                            </div>

                            <div className="p-2">
                                <ButtonGroup size="small" variant="text" color="primary" >
                                    <Button  id={v._id} onClick={onhandleClick}> <DeleteIcon/></Button>
                                </ButtonGroup>
                            </div>

                        </div>
                        <div className="row m-4"> 
                        <table className="table">
                        <thead>
                                <th scope="col" className="text-center font-weight-bold m-2">가입가능 여부</th>
	                            <th scope="col" className="text-center font-weight-bold m-2">이율</th>
                                <th scope="col" className="text-center font-weight-bold m-2 ">최소가입금액</th>
	                            <th scope="col" className="text-center font-weight-bold m-2 ">최소가입기간</th>
                                </thead>
                            <tbody>
	                        <tr>
                                <td className="text-center">{v.joinPossible ? <CheckIcon color="primary"/> : <ClearIcon color="primary"/>}</td>
                                <td className="text-center">{v.interestRate}</td>
                                <td className="text-center">{v.minAmount}</td>
                                <td className="text-center">{v.minDuration}</td>
	                            
	                        </tr>
                            </tbody>
                        </table>

                    </div>

            </div>
                </div>
            )}
        </div></div>

    )
}

export default MangeDeposits
