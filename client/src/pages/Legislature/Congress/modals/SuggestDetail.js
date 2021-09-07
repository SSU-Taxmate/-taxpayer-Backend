import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Error from '../../../../components/Error'
import Loading from '../../../../components/Loading'
//modal import
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import moment from 'moment-timezone';

import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded';

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
  //console.log('suggestDetail', props.data)
  const classes = useStyles();

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const quorum = 10
  const [data, setData] = useState({
    title: props.data.title,
    student: props.data.initiator.name,
    dueDate: moment(props.data.createdAt).tz('Asia/Seoul').add(7, 'd').diff(moment().tz('Asia/Seoul'), 'days'),//7일후마감
    content: props.data.content,
    numvoter: props.data.numvoter
  }
  )

  let classData = useSelector(state => state.classInfo.classData);
  let user = useSelector((state) => state.user);


  const modalClose = () => {
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
          {isError ? <Error /> :
            isLoading ?
              <Loading /> : (
                <>
                  <div className="text-gray-900 font-weight-bold text-center mx-2 h5 my-5">{data.title}</div>

                  <div className="row justify-content-center no-gutters align-items-center mb-4">
                    <div className="col-8 mr-2">
                      <div className="row no-gutters align-items-center">
                        <div className="col-auto">
                          <div className="h5 mb-0 mr-3 text-gray-600 font-weight-bold">{Math.round(data.numvoter / quorum * 100)}%</div>
                        </div>
                        <div className="col">
                          <div className="progress mr-2">
                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: `${Math.round(data.numvoter / quorum * 100)}%` }} aria-valuenow={Math.round(data.numvoter / quorum * 100)} aria-valuemin="0" aria-valuemax="100"></div>
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
                    <div className="text-gray-900 text-center m-2 job-input">{"D-" + data.dueDate}</div>
                  </div>

                  <hr />



                  <div className="row py-2">
                    <div className="text-gray-900 text-center mx-4 job-input">{data.content}</div>
                  </div>

                  <div className="row py-2 justify-content-center">

                    <a className="btn btn-success btn-icon-split m-2">
                      <span className="icon text-white-50"> <ThumbUpAltRoundedIcon /> </span>
                      <span className="text">동의합니다</span>
                    </a>



                  </div>
                  <hr />
                </>)}
        </div>

      </Fade>
    </Modal>

  );
}
