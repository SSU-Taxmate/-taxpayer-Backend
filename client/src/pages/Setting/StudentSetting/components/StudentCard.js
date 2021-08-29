import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Box, Button, ButtonGroup, Paper } from '@material-ui/core';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';


export default function StudentCard(props){


    
    const jobs = props.row.job
 
    return(

<div className="card-body">

<div className="row py-2">
<div className="text-center font-weight-bold mx-2 job-label">이름</div>  
<div className="seperator-gray mx-1"></div>
<div className="text-gray-900 text-center mx-2 job-input">{props.row.name}</div>  
</div>

<div className="row">

<div className="text-center font-weight-bold m-2 label job-label">이메일</div>  
<div className="seperator-gray m-1"></div>
<div className="text-gray-900 text-center m-2 job-input">{props.row.email}</div>  

<div className="text-center font-weight-bold m-2 job-label">계좌</div>  
<div className="seperator-gray m-1"></div>
<div className="text-gray-900 text-center m-2 job-input">{props.row.balance}</div>  
</div>

<hr/>
<div className="row py-2">
<div className="text-center font-weight-bold mx-2 job-label">직업정보</div>  
</div>


{jobs && jobs.map((job) =>
    <div className="row py-2" key={job._id}>
        <div className="text-gray-900 text-center job-input">{job.name} </div>  
        <div className="text-gray-900 text-center job-input">{job.salary} </div>  
        <div className="text-gray-900 text-center job-input">{job.whatdo} </div>  

    </div>)}
      
      </div>
    
    )
}