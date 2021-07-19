import React from 'react'
import Button from '@material-ui/core/Button';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
function TradeDialog(props) {
    const { data,title,color } = props;//data - stockId,stockName, price * quantity = amount
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <button className={`btn btn-outline-${color} btn-sm float-right m-2 col-*`} onClick={handleClickOpen}>
                {title}
            </button>
            <Dialog aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                '삼성전자-종목 이름{}' {title}
                </DialogTitle>
                <DialogContent >

                    <div >
                        <div className="input-group">
                            <input type="number" readOnly className="form-control" id="tradeShare" placeholder="현재가"  value={'data.price'} />
                            <div className="input-group-append"><span className="input-group-text outline-none">X</span></div>
                            <input type="number" readOnly className="form-control" id="tradeShare" placeholder="'판매/구입' 할" value={'data.quantity'} />
                            <div className="input-group-append"><span className="input-group-text">주</span></div>
                        </div>
                    </div>
                    <div >
                        <div className="input-group">
                            <div className="input-group-prepend"><span className="input-group-text">=</span></div>
                            <input type="number" readOnly className="form-control" id="tradeShare" placeholder="총 금액" value={'data.amount'}/>
                        </div>
                    </div>

                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose} className="btn btn-outline-info btn-sm float-right m-2 col-*">
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

export default TradeDialog
