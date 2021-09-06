import React, { useEffect, useState } from "react";
import axios from "axios";
import { withStyles, makeStyles, lighten } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

//modal import
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      border: 'none',
      boxShadow: theme.shadows[5],
      minWidth: 360
    },
  
    root: {
      backgroundColor: theme.palette.background.paper,
      overflow: 'auto',
      maxHeight: 200,
      justifyContent: 'center'
  
    },
  
    inline: {
      display: 'inline',
    },
  
    listSection: {
      backgroundColor: 'inherit',
    },
    ul: {
      backgroundColor: 'inherit',
      padding: 0,
    },
  
    margin: {
      margin: theme.spacing(1),
    },
  
  }));
    

export default function SuggestDetail(props) {

    const classes = useStyles();

    const [err, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const [data, setData] = useState({ 
        title:"직업활동에 붙는 세금을 낮춰주세요",
        student:"배미혜",
        dueDate:10,
        detail:"현재 환경미화원으로 일하고 있는 배미혜입니다. 환경미화원은 월 200미소를 받는데 이중 세금으로 40미소를 내고 있습니다.\n이러한 세율은 지나치게 높다고 생각됩니다. 따라서 세법의 개정을 건의하는 바입니다. \n 상세개정안\n -근로소득의 세율을 현행 20%d에서 15%로 낮춘다. \n -부족한 세수를 확보하기 위하여 현재 세금을 매기지 않고 있는 이자소득에 대해 소득의 5%를 세금으로 부과한다"}
        )

    let classData = useSelector(state => state.classInfo.classData);
    let user = useSelector((state) => state.user);


    const modalClose=()=>{
      props.modalClose()
    }
 
  return (

    
<Modal
      id="billDetailModal"
      className={classes.modal}
      open={props.open}
      onClose={modalClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open}>
      <div className="col-lg-8 card">

                <div className="text-gray-900 font-weight-bold text-center mx-2 h5 my-5">{data.title}</div>

                <div className="row justify-content-center no-gutters align-items-center mb-4">
                                        <div className="col-8 mr-2">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col-auto">
                                                    <div className="h5 mb-0 mr-3 text-gray-600 font-weight-bold">50%</div>
                                                </div>
                                                <div className="col">
                                                    <div className="progress mr-2">
                                                        <div className="progress-bar bg-primary" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>

<div className="row justify-content-center">
  <div className="text-center font-weight-bold m-2 label job-label">발의자</div>
  <div className="seperator-gray m-1"></div>
  <div className="text-gray-900 text-center m-2 job-input">{data.student}</div>
  <div className="text-center font-weight-bold m-2 job-label">마감기간</div>
  <div className="seperator-gray m-1"></div>
  <div className="text-gray-900 text-center m-2 job-input">{"D-"+data.dueDate}</div>
</div>

<hr />

  

<div className="row py-2">
  <div className="text-gray-900 text-center mx-4 job-input">{data.detail}</div>
</div>

<div className="row py-2 justify-content-center">

        <a class="btn btn-success btn-icon-split m-2">
            <span class="icon text-white-50"> <ThumbUpAltRoundedIcon/> </span>
            <span class="text">동의합니다</span></a>



</div>
<hr />
</div>

      </Fade>
    </Modal>

  );
}
