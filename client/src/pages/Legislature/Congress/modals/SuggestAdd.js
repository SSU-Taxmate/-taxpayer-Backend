import React, { useEffect, useState } from "react";
import axios from "axios";
import { withStyles, makeStyles, lighten } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

//modal import
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import TextField from '@material-ui/core/TextField';

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
    

export default function SuggestAdd(props) {
  const [lawtitle, setlawtitle] = useState("");
  const [lawcontent, setlawcontent] = useState({});
  const handleSubmit = (e) => {
    //e.preventDefault();
    axios
      .post(`/api/congress`, {
        classId: classData.classId,
        title: lawtitle,
        content: lawcontent,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
      id="suggestAddModal"
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
      <form onSubmit={handleSubmit} >
            <div className="card col-lg-8 px-5 py-3">
            <div className="row align-items-center  justify-content-center">
                <div className="text-gray-900 font-weight-bold mr-2">제목</div>
                <TextField
                  className="text-gray-900 text-center col-10"
                  name="whatdo"
                  required
                  variant="outlined"
                  margin="none"
                  size="small"
                /></div>

<hr />

  

<div className="row py-2">
<div className="text-gray-900 font-weight-bold col-auto mb-2">건의내용</div>
  <TextField
                  className="text-gray-900 text-center col-12"
                  name="whatdo"
                  required
                  multiline
                  rows={15}
                  variant="outlined"
                  margin="none"
                /></div>


<hr />

<div className="row py-2 justify-content-center">
<button type="submit" onClick={handleSubmit} class="btn btn-outline-primary mr-2">등록</button>
                  <button type="button" class="btn btn-outline-primary ml-2">취소</button>

</div>
</div>


              
</form>
      </Fade>
    </Modal>


  );
}
