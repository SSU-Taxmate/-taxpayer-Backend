import React, { useState } from "react";
import { makeStyles,  } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';


import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded';
import ThumbDownAltRoundedIcon from '@material-ui/icons/ThumbDownAltRounded';

//modal import
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import moment from 'moment-timezone';

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


export default function BillDetail(props) {

  const classes = useStyles();
  
  // data props로 받기

  const modalClose = () => {
    props.modalClose()
  }
  console.log('BilDetail',props.data)
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
        <div className="card col-lg-8">

          <div className="text-gray-900 font-weight-bold text-center mx-2 h5 my-5">{props.data.title}</div>

          <div className="row justify-content-center no-gutters align-items-center mb-4">
            <div className="col-md-8 mr-2">
              <div className="row no-gutters align-items-center justify-content-between">
                <div className="text-xs font-weight-bold text-uppercase mb-1">{Math.round(props.data.numpros/props.data.numvoter*100)}%</div>
                <div className="font-weight-bold mb-1">투표율 [ {props.numofstudent===0?0:Math.round(props.data.numvoter/props.numofstudent*100)}% ]</div>
                <div className="text-xs font-weight-bold text-uppercase mb-1">{100-Math.round(props.data.numpros/props.data.numvoter*100)}%</div>
              </div>
              <div className="row no-gutters align-items-center">
                <div className="col-auto">
                  <div className="h5 mb-0 mr-3 text-gray-600 font-weight-bold"><ThumbUpAltRoundedIcon /></div>
                </div>
                <div className="col">
                  <div className="progress mr-2 justify-content-between">
                    {/*동의/비동의 비율*/}
                    <div className="progress-bar bg-primary" role="progressbar" style={{ width: `${props.data.numvoter !== 0? Math.round(props.data.numpros/props.data.numvoter*100) : 0}%` }} aria-valuenow={Math.round(props.data.numpros/props.data.numvoter*100)} aria-valuemin="0" aria-valuemax="100"></div>
                    <div className="progress-bar bg-danger" role="progressbar" style={{ width: `${ props.data.numvoter !==0 ? 100-Math.round(props.data.numpros/props.data.numvoter*100) : 0}%` }} aria-valuenow={100-Math.round(props.data.numpros/props.data.numvoter*100)} aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="h5 mb-0 ml-3 text-gray-600 font-weight-bold"><ThumbDownAltRoundedIcon /></div>
                </div>
              </div>
            </div>

          </div>

          <div className="row justify-content-center">
            <div className="text-center font-weight-bold m-2 label job-label">발의자</div>
            <div className="seperator-gray m-1"></div>
            <div className="text-gray-900 text-center m-2 job-input">{props.data.initiator.name}</div>
            <div className="text-center font-weight-bold m-2 job-label">마감기간</div>
            <div className="seperator-gray m-1"></div>
            <div className="text-gray-900 text-center m-2 job-input">{"D-" + moment(props.data.createdAt).tz('Asia/Seoul').add(7,'d').diff(moment().tz('Asia/Seoul'),'days')}</div>
          </div>

          <hr />



          <div className="row py-2">
            <div className="text-gray-900 mx-4 job-input">{props.data.content}</div>
          </div>

          <div className="row py-2 justify-content-center">

            <a className="btn btn-success btn-icon-split m-2">
              <span className="icon text-white-50"> <ThumbUpAltRoundedIcon /> </span>
              <span className="text">동의합니다</span></a>


            <a className="btn btn-danger btn-icon-split m-2">
              <span className="icon text-white-50"><ThumbDownAltRoundedIcon /></span>
              <span className="text">반대합니다.</span></a>
          </div>
          <hr />
        </div>

      </Fade>
    </Modal>



  );
}