import React from 'react';
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

import { Box, Button, ButtonGroup, Paper } from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';

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

  const classes = useStyles();


  const modalRow = props.row;

  const modalClose = () => {

    props.close(false);

  }

  const jobEditModalOpen = () => {

    modalClose();
    props.jobEditModalOpen();

  }

  const jobJoinPossibleChange = () => {

    props.jobJoinPossibleChange({ joinPossible: !props.row.joinPossible })
    modalClose();

  }


  const jobDeleteModalOpen = () => {

    props.jobDeleteModalOpen();

  }



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
                <ButtonGroup color="primary" variant='text' size="small" >
                  {props.row.joinPossible ? <Button><RemoveRoundedIcon onClick={jobJoinPossibleChange} /></Button> : null}
                  {!props.row.joinPossible ? <Button onClick={jobDeleteModalOpen}><Delete /></Button> : null}
                  {!props.row.joinPossible ? <Button><RestoreFromTrashIcon onClick={jobJoinPossibleChange} /></Button> : null}
                  <Button onClick={jobEditModalOpen}><EditIcon /></Button>
                </ButtonGroup>
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
                <List dense className={classes.root}>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => {
                    const labelId = `checkbox-list-secondary-label-${value}`;
                    return (
                      <ListItem key={value} button>
                        <ListItemAvatar>
                          <Avatar
                            alt={`Avatar n°${value + 1}`}
                            src={`/static/images/avatar/${value + 1}.jpg`}
                          />
                        </ListItemAvatar>
                        <ListItemText id={labelId} primary={`Line item ${value + 1}`} />

                      </ListItem>
                    );
                  })}
                </List>
              </div>
            </div>
          </div>

        </div>

      </Fade>
    </Modal>

  )

}

export default React.memo(JobDetailModal)