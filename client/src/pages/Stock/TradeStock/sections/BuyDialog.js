import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@material-ui/core';
import { useSelector } from "react-redux";
import axios from 'axios'


function BuyDialog(props) {
    const { data, type, color ,quantity } = props;//data - stockId,stockName, price * quantity = amount
    const [open, setOpen] = useState(false);
    const joinedUser = useSelector(state => state.classUser);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleTradeComplete = (e) => {
        e.preventDefault();
        //console.log('trade complete')
        const sendData={
            studentId:joinedUser.classUser,
            quantity:quantity,
            currentPrice:data.price,
            orderType:type
        }
        axios.post(`/api/stocks/${data.stockId}/orders`, sendData)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

            handleClose();
    }
    return (
        <div>
            <button className={`btn btn-outline-${color} btn-sm float-right m-2 col-*`} onClick={handleClickOpen}>
                {data.stockName}-{type}
            </button>
            {data &&
                <Dialog aria-labelledby="customized-dialog-title" open={open}>
                    
                        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                            {type}
                        </DialogTitle>
                        <DialogContent >

                            <DialogContentText>
                                {data.price}x{quantity}={data.price*quantity}
                                매수 하시겠습니까?
                            </DialogContentText>
                        
                        </DialogContent>
                        <DialogActions>
                            <button  onClick={handleTradeComplete} className="btn btn-outline-info btn-sm float-right m-2 col-*">
                                확인
                            </button>
                            <button autoFocus onClick={handleClose} className="btn btn-outline-info btn-sm float-right m-2 col-*" >
                                취소
                            </button>
                        </DialogActions>
                    
                </Dialog>

            }
        </div>
    )
}

export default React.memo(BuyDialog)
