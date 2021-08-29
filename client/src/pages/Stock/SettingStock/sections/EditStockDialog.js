import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { ButtonGroup, DialogActions,Button } from '@material-ui/core';
import { useSelector } from "react-redux";
import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ListSubheader from '@material-ui/core/ListSubheader';
import AddRoundedIcon from '@material-ui/icons/AddRounded';

import "../../../../styles/css/jobModal.css"

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
      maxWidth: 500,
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
  

function EditStockDialog({ stock }) {

    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const now = new Date().now
        axios.post('/api/stocks',
            {
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <>
            <IconButton color="primary" onClick={handleOpen}><MoreHorizIcon /></IconButton>


            <Modal
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{timeout: 500,}}>


            <Fade in={open}>


        <div className={classes.paper}>
          <div className="card col-lg-12 p-0">

            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">주식수정</h6>
               
            </div>

            <div className="card-body">

            <div className="row py-2">
                            <div className="text-center font-weight-bold mx-2 job-label">주식이름</div>
                            <div className="seperator-gray mx-1"></div>
                            <div className="text-gray-900 text-center mx-2 job-input">{stock.stockName}</div>
                        </div>

                        <div className="row">

                            <div className="text-center font-weight-bold m-2 label job-label">설명</div>
                            <div className="seperator-gray m-1"></div>
                            <div className="text-gray-900 text-center m-2 job-input">{stock.description}</div>

                        </div>
              <hr />
              <div className="row">
              <div className="justify-content-center mb-4"  >
                <List dense className={classes.root} >
                  {[{day:"월",price:10, date:"8/23"},{day:"화",price:11, date:"8/24"},{day:"수",price:9, date:"8/25"},{day:"목",price:10, date:"8/26"},{day:"금",price:12, date:"8/27"}].map((value) =>
                   {
                    const labelId = `checkbox-list-secondary-label-${value.date}`;
                    return (
                      <ListItem key={value} button>
                            <ListSubheader color="primary" >{value.date}</ListSubheader>
                            <ListItemText primary={value.price} className="mx-2"/>
                          <hr/>
                      </ListItem>
                    );
                  })}
                </List>
                </div>

                <div style={{ height: 300, width: 2, background:"#E3E6F0"}}></div>

              <div className="card-body p-0 mx-4">
                  <div className="row justify-content-end">   
                  <ButtonGroup color="primary" variant='text' size="small" >
                <Button ><EditOutlinedIcon /></Button>
                <Button ><AddRoundedIcon /></Button>
                </ButtonGroup>
                </div>

                <div className="row justify-content-ceneter card-body" style={{width:500,height:200,background:"#E3E6F0"}}></div>

<div className="row">

<div className="text-center font-weight-bold m-2 label job-label">날짜</div>  
<div className="text-gray-900 text-center m-2 job-input">2018-8-26</div>  

<div className="text-center font-weight-bold m-2 job-label">현재가</div>  
<div className="text-gray-900 text-center m-2 job-input">10 미소</div>  
</div>


<div className="row py-2">
<div className="text-center font-weight-bold mx-2 job-label">오늘의 뉴스</div>  
<div className="text-gray-900 text-center mx-2 job-input">선생님의 오늘 저녁에 펜트하우스 보면서 치킨 먹을 예정</div>  
</div>

  
              </div>
            </div>
            </div>
          </div>

        </div>

      </Fade>
    </Modal>



{/*
            <Dialog 
                aria-labelledby="stock-dialog-title" 
                open={open}
                onClose={handleClose} style={{}} >
                <div className='card shadow p-0'>
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <DialogTitle id="stock-dialog-title">주식 수정</DialogTitle>
                               
                        <ButtonGroup color="primary" variant='text' size="small" >                               
                            <Button ><EditOutlinedIcon /></Button>
                               </ButtonGroup>

                    </div>
                    <div className="card-body">

                        <div className="row py-2">
                            <div className="text-center font-weight-bold mx-2 job-label">주식이름</div>
                            <div className="seperator-gray mx-1"></div>
                            <div className="text-gray-900 text-center mx-2 job-input">{stock.stockName}</div>
                        </div>

                        <div className="row">

                            <div className="text-center font-weight-bold m-2 label job-label">설명</div>
                            <div className="seperator-gray m-1"></div>
                            <div className="text-gray-900 text-center m-2 job-input">{stock.description}</div>

                        </div>
                        <hr />
                        <div className="row">
                        <div className="justify-content-center mb-4" >
                            <List dense >
                                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => {
                                    const labelId = `checkbox-list-secondary-label-${value}`;
                                    return (
                                        <ListItem key={value} button>
                                            <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </div>
                        </div>
                    </div>
                </div>
                <DialogActions>
                    <button onClick={handleClose} color="primary" autoFocus>
                        닫기
                    </button>
                </DialogActions>
                            </Dialog>*/}
        </>
    )
}

export default EditStockDialog
