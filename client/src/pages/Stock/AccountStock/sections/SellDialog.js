import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, useTheme, DialogContentText } from '@material-ui/core';
import { useSelector } from "react-redux";
import axios from 'axios'

function SellDialog(props) {
    const { data, type, color } = props;//data - stockId,stockName, currentPrice * quantity = amount
    const [open, setOpen] = useState(false);
    const joinedUser = useSelector(state => state.classUser);
    let classData = useSelector(state => state.classInfo.classData);
    const [quantity, setquantity] = useState(1)
    const onChange = (e) => {
        setquantity(e.target.value)
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleTradeComplete = () => {
        //console.log('trade complete')
        const sendData = {
            studentId: joinedUser.classUser,
            quantity: quantity,
            currentPrice: data.currentPrice,
            orderType: type,
            classId:classData.classId
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
                {type}
            </button>

            <Dialog aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {type}
                </DialogTitle>
                <DialogContent >
                    <DialogContentText>
                        {data.stockName} {quantity}주를 {data.currentPrice * quantity}에 {type}하시겠습니까?
                    </DialogContentText>
                    <DialogContentText>증권거래세 미포함 금액</DialogContentText>
                    <div className="input-group">
                        <input type="number" readOnly className="form-control" id="currentValue" placeholder="현재가" value={data.currentPrice} />
                        <div className="input-group-append"><span className="input-group-text outline-none">X</span></div>
                        <input type="number" 
                            onChange={onChange}
                            className="form-control" id="tradeShare" placeholder="'판매/구입' 할" value={quantity} />
                        <div className="input-group-append"><span className="input-group-text">주</span></div>
                    </div>
                    <div className="input-group">
                        <div className="input-group-prepend"><span className="input-group-text">=</span></div>
                        <input type="number" readOnly className="form-control" id="tradeAmount" placeholder="총 금액" value={data.currentPrice * quantity} />
                    </div>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleTradeComplete} className="btn btn-outline-info btn-sm float-right m-2 col-*">
                        확인
                    </button>
                    <button autoFocus onClick={handleClose} className="btn btn-outline-info btn-sm float-right m-2 col-*" >
                        취소
                    </button>
                </DialogActions>

            </Dialog>


        </div>
    )
}

export default React.memo(SellDialog)
