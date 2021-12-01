import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useSelector } from "react-redux";
import {  Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import Error from '../../../../components/Error';
import Loading from '../../../../components/Loading';
function StudentJob() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const joinedUser = useSelector((state) => state.classUser);
    const [userjob, setuserjob] = useState()
    const onhandleclick=(jobId)=>{
        axios.delete(`/api/students/${joinedUser.classUser}/jobs/${jobId}`)
        .then(function (response) {
            console.log(response);
            fetchData();
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);
        try {
            const result = await axios.get(`/api/students/${joinedUser.classUser}/jobs`);
            setuserjob(result.data.Job)
            console.log(result.data.Job)
        } catch (error) {
            setIsError(true);
        }
        setIsLoading(false);
    };
    useEffect(() => {
        fetchData();
    }, [joinedUser.classUser]);
    return (
        <div className="col-lg-4">
            <div>나의 직업</div>
            {isError&&<Error/>}
            {isLoading?<Loading/>:
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>신청한 직업명</TableCell>
                        <TableCell>지원 취소</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userjob && userjob.map((v, i) => 
                    <TableRow key={i}>
                        <TableCell>{v.name}</TableCell>
                        <TableCell><IconButton onClick={()=>onhandleclick(v._id)}><CloseIcon/></IconButton></TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
            }
        </div>
    )
}

export default StudentJob
