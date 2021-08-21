import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import axios from 'axios'
function TradeDialog(props) {
    const { data, quantity, type, color } = props;//data - stockId,stockName, price * quantity = amount
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleTradeComplete = (e) => {
        e.preventDefault();
        //console.log('trade complete')
        if(type==='매수'){
            axios.post('/api/stocks/')
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        
        }else if (type==='매도'){

        }else{
            return '잘못된 type입니다'
        }
       
    }
    return (
        <div>
            <button className={`btn btn-outline-${color} btn-sm float-right m-2 col-*`} onClick={handleClickOpen}>
                {type}
            </button>
            {data &&
                <Dialog aria-labelledby="customized-dialog-title" open={open}>
                    <form onSubmit={handleTradeComplete}>
                        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                            {type}
                        </DialogTitle>
                        <DialogContent >

                            <div >
                                <div className="input-group">
                                    <input type="number" readOnly className="form-control" id="currentValue" placeholder="현재가" value={data.price} />
                                    <div className="input-group-append"><span className="input-group-text outline-none">X</span></div>
                                    <input type="number" readOnly className="form-control" id="tradeShare" placeholder="'판매/구입' 할" value={quantity} />
                                    <div className="input-group-append"><span className="input-group-text">주</span></div>
                                </div>
                            </div>
                            <div >
                                <div className="input-group">
                                    <div className="input-group-prepend"><span className="input-group-text">=</span></div>
                                    <input type="number" readOnly className="form-control" id="tradeAmount" placeholder="총 금액" value={data.price * quantity} />
                                </div>
                            </div>

                        </DialogContent>
                        <DialogActions>
                            <button type='submit' onClick={handleClose} className="btn btn-outline-info btn-sm float-right m-2 col-*">
                                확인
                            </button>
                            <button autoFocus onClick={handleClose} className="btn btn-outline-info btn-sm float-right m-2 col-*" >
                                취소
                            </button>
                        </DialogActions>
                    </form>
                </Dialog>

            }
        </div>
    )
}

export default React.memo(TradeDialog)
