import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles, lighten } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';


//modal import
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


import TextField from '@material-ui/core/TextField';
import { Box, Button, ButtonGroup, Paper } from '@material-ui/core';

import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import axios from 'axios';


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

const jobAdd = (input) => {

  const { name, salary, recruitment, whatdo, } = input; // 비구조화 할당을 통해 값 추출

  axios
    .post("/api/jobs", {

      name, salary, recruitment, whatdo,
      joinPossible: true,
      classId: classData.classId,

    })
    .then(response => {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });


};


function JobEditModal(props) {

  const classes = useStyles();
  const [inputs, setInputs] = useState(props.row)
  let classData = useSelector(state => state.classInfo.classData);

  const modalClose = () => {

    props.close(false);

  }

  const onChange = (e) => {

    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value // name 키를 가진 값을 value 로 설정
    });

  };
 
  const jobUpdate = () => {
    if (props.row.id === undefined)
      jobAdd({...inputs,classId:classData.classId})

    else
      {

        const { name, salary, recruitment, whatdo, joinPossible, } = inputs; // 비구조화 할당을 통해 값 추출

        axios
          .put("/api/jobs", {
      
            name, salary, recruitment, whatdo, joinPossible,
            classId: classData.classId,
            _id: props.row.id,
      
          })
          .then(response => {
            console.log(response);
      
          })
          .catch(function (error) {
            console.log(error);
          });
      }

    modalClose()
  }

  return (

    <Modal
      id="jobEditModal"
      open={props.open}
      className={classes.modal}
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
                  <Button onClick={jobUpdate}><CheckRoundedIcon /></Button>
                </ButtonGroup>
              </div>
            </div>

            <div className="card-body">

              <div className="row py-2">
                <div className="text-center font-weight-bold m-2 job-label">직업이름</div>
                <div className="seperator-gray m-2"></div>
                <TextField
                  className="text-gray-900 text-center m-2 job-input"
                  name="name"
                  defaultValue={props.row.name}
                  required
                  onChange={onChange}
                  variant="outlined"
                  size="small"
                  margin="none"


                />
              </div>

              <div className="row">

                <div className="text-center font-weight-bold m-2 label job-label">월급</div>
                <div className="seperator-gray m-2"></div>
                <TextField
                  className="text-gray-900 text-center m-2 job-input"
                  name="salary"
                  defaultValue={props.row.salary}
                  required
                  onChange={onChange}
                  variant="outlined"
                  size="small"
                  margin="none"

                />

                <div className="text-center font-weight-bold m-2 job-label">모집인원</div>
                <div className="seperator-gray m-2"></div>
                <TextField
                  className="text-gray-900 text-center m-2 job-input"
                  name="recruitment"
                  defaultValue={props.row.recruitment}
                  required
                  onChange={onChange}
                  variant="outlined"
                  size="small"
                  margin="none"

                />
              </div>

              <hr />

              <div className="row py-2">
                <div className="text-center font-weight-bold mx-2 job-label">업무내용</div>
              </div>

              <div className="row py-2">
                <TextField
                  className="text-gray-900 text-center m-2 job-input"
                  name="whatdo"
                  defaultValue={props.row.whatdo}
                  required
                  multiline
                  fullwidth={true}
                  rows={4}
                  onChange={onChange}
                  variant="outlined"
                  size="small"
                  margin="none"

                />
              </div>

            </div></div>
        </div>
      </Fade>
    </Modal>


  )

}

export default React.memo(JobEditModal)