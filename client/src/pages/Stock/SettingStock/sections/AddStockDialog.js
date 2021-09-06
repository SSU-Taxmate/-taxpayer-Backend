import React, { useState } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { useSelector } from "react-redux";
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import moment from 'moment-timezone';
import axios from 'axios'
import { DialogContent } from '@material-ui/core';

function AddStockDialog() {

    const [stockName, setstockName] = useState('')
    const [stockDescription, setstockDescription] = useState('')
    const [stockInit, setstockInit] = useState(0)
    const [stockHint,setstockHint]=useState("")
    let classData = useSelector(state => state.classInfo.classData);

    const handleStockName = (e) => {
        setstockName(e.target.value)
    }

    const handleStockDetail = (e) => {
        setstockDescription(e.target.value)
    }
    const handleStockInit = (e) => {
        setstockInit(Number(e.target.value))
    }
    const handleStockHint=(e)=>{
        setstockHint(e.target.value)
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const now = moment().tz('Asia/Seoul').startOf('day').utc().format()
        axios.post('/api/stocks',
            {stockInfo:{
                stockName: stockName,
                description: stockDescription,
                prices: [{ updateDate: now, value: stockInit ,hint:stockHint}],
            },
            classId:classData.classId
            })
            .then(function (response) {
                console.log(response);
                window.location.reload();
                handleClose()
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <>  
            <div className="row d-flex p-3" style={{justifyContent:"space-between"}}>
            <h5 className="mt-1">현재 등록 주식 및 설정</h5>
            <button type="button" className="btn btn-outline-primary "  onClick={handleOpen}> 주식 등록 <AddIcon /></button>
            </div>
            {/* <Button color="primary" onClick={handleOpen}>주식 추가<AddIcon /></Button> */}
            <Dialog fullWidth aria-labelledby="stock-dialog-title" open={open} onClose={handleClose}>
                <DialogTitle id="stock-dialog-title">주식 추가</DialogTitle>
                    <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group row">
                            <label htmlFor="inputstockname" className="col-sm-2 col-form-label">주식명</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="inputstockname" placeholder="주식명" onChange={handleStockName} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputstockinfo" className="col-sm-2 col-form-label">주식설명</label>
                            <div className="col-sm-10">
                                <textarea className="form-control" id="inputstockinfo" placeholder="주식설명" onChange={handleStockDetail} rows="3" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputstockinit" className="col-sm-2 col-form-label">초기값</label>
                            <div className="col-sm-10">
                                <input type="number" className="form-control" id="inputstockinit" placeholder="초기값" onChange={handleStockInit} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputhint" className="col-sm-2 col-form-label">힌트</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="inputhint" placeholder="힌트" onChange={handleStockHint} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col">
                                <button type="submit" className="btn btn-primary float-right">추가</button>
                            </div>
                        </div>
                    </form>
                    </DialogContent>
            </Dialog>
        </>
    )
}

export default AddStockDialog
