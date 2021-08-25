import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../../../../styles/css/jobModal.css'


//modal import
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


import { Box, Button, ButtonGroup, Paper } from '@material-ui/core';

import Delete from '@material-ui/icons/Delete';
import axios from 'axios'




const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        border: 'none',
        boxShadow: theme.shadows[5],
        minWidth:360
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


  
  
function JobDeleteModal(props){

    const classes=useStyles();
    
    const modalClose=()=>{

    props.close(false); 

}

const row=props.row

const jobDelete=()=>{


    console.log('/api/jobs/'+ row.id)
    axios.delete('/api/jobs/'+ row.id)
    .then(function (response) {
      console.log(response);
    })
    // 응답(실패)
    .catch(function (error) {
      console.log(error);
    })

    modalClose();

  }


    return(
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
                                        <h6 className="m-0 font-weight-bold text-primary">직업삭제</h6>

                                    </div>
    
    <div className="card-body">

    <div className="h5 mb-0 font-weight-bold text-gray-800 text-center py-3">정말 삭제하시겠습니까</div>    
    
    <div className="justify-content-center">
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<Delete />}
        onClick={jobDelete}
      >
        삭제하기
      </Button>
      </div>
    </div>
    </div>
    </div>
    
    
    </Fade>
    </Modal>
    )

}

export default React.memo(JobDeleteModal)