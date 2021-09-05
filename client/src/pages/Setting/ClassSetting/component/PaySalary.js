import { Button } from '@material-ui/core'
import axios from 'axios'
import React from 'react'
import { useSelector } from "react-redux";

function PaySalary() {
    let classData = useSelector(state => state.classInfo.classData);

    const onhandleclick=()=>{
        console.log(classData)
        axios.post('/api/jobs/salary',{classId:classData.classId})
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    return (
        <div>
            <div>월급 설정</div>
            {classData.classId&&
            <Button variant="outlined" color="primary" onClick={onhandleclick}>월급 부여하기</Button>
            }
            </div>
    )
}

export default PaySalary
