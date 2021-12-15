import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../../../../styles/css/jobModal.css'


//modal import
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import { Button, ButtonGroup } from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';

import axios from 'axios';
import Error from '../../../../components/Error'
import Loading from '../../../../components/Loading';
import { useSelector } from "react-redux";

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


function JobDetailModal(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const classes = useStyles();
  const modalRow = props.row;
  const [employee, setemployee] = useState()
  let user = useSelector((state) => state.user);

  const modalClose = () => {
    props.close(false);
  }
  const jobEditModalOpen = () => {
    modalClose();
    props.jobEditModalOpen();
  }
  const onhandlefire = (studentId) => {
    axios.delete(`/api/students/${studentId}/jobs/${modalRow._id}`)
      .then(function (response) {
        console.log(response);
        window.location.reload();
      })
      // 응답(실패)
      .catch(function (error) {
        console.log(error);
      })
  }
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios.get(`/api/jobs/${modalRow._id}/students`, { params: { classId: modalRow.classId } })
        setemployee(result.data)
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [modalRow._id])

  return (
    <Modal
      id="jobDetailModal"
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
        <div className={classes.paper}>
          <div className="card col-lg-12 p-0">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">직업정보 조회</h6>
              <div className="dropdown no-arrow">
                {user.userData.role === 0 ?
                  <ButtonGroup color="primary" variant='text' size="small" >
                    <Button onClick={jobEditModalOpen}><EditIcon /></Button>
                  </ButtonGroup>
                  : <></>}
              </div>
            </div>

            <div className="card-body">

              <div className="row py-2">
                <div className="text-center font-weight-bold mx-2 job-label">직업이름</div>
                <div className="seperator-gray mx-1"></div>
                <div className="text-gray-900 text-center mx-2 job-input">{modalRow.name}</div>
              </div>

              <div className="row">
                <div className="text-center font-weight-bold m-2 label job-label">월급</div>
                <div className="seperator-gray m-1"></div>
                <div className="text-gray-900 text-center m-2 job-input">{modalRow.salary}</div>
                <div className="text-center font-weight-bold m-2 job-label">모집인원</div>
                <div className="seperator-gray m-1"></div>
                <div className="text-gray-900 text-center m-2 job-input">{modalRow.recruitment}</div>
              </div>

              <hr />

              <div className="row py-2">
                <div className="text-center font-weight-bold mx-2 job-label">업무내용</div>
              </div>

              <div className="row py-2">
                <div className="text-gray-900 text-center mx-4 job-input">{modalRow.whatdo}</div>
              </div>

              <hr />
              <div className="justify-content-center mb-4" >
                {isError && <Error />}
                {user.userData.role === 0 ?
                  isLoading ?
                    <Loading /> : (
                      <List dense className={classes.root}>
                        {employee &&
                          employee.map((value, index) => {
                            const labelId = `checkbox-list-secondary-label-${index}`;
                            return (
                              <ListItem key={index}>
                                <ListItemAvatar>
                                  <Avatar />
                                </ListItemAvatar>

                                <ListItemText id={labelId} primary={value.name} />
                                <ListItemSecondaryAction>
                                  <IconButton onClick={() => onhandlefire(value._id)} edge="end" aria-label="delete">
                                    <DeleteIcon />
                                  </IconButton>
                                </ListItemSecondaryAction>
                              </ListItem>
                            );
                          })}
                      </List>
                    )
                  : null}
              </div>
            </div>
          </div>

        </div>

      </Fade>
    </Modal>

  )

}

export default React.memo(JobDetailModal)