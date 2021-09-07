import React, { useState ,useCallback} from 'react';
import axios from 'axios';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent'
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';

function AddDepositDialog() {
    const [data, setdata] = useState({
        name:'',
        description:'',
        interestRate:0,
        minAmount:0,
        minDuration:0
    })
    const [open, setOpen] = useState(false);
    let classData = useSelector(state => state.classInfo.classData);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const res = {
            classId: classData.classId,
            ...data
        }
        axios.post(`/api/bank/deposits`, res)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const onChange = useCallback(
        ({target:{name,value}}) => setdata(prevdata => ({ ...prevdata, [name]:value })), []
      );
   
    const nameField = React.useMemo(
        () => (
            <TextField
                className="col m-1"
                name="name"
                label="상품명"
                variant="outlined"
                size="small"
                onChange={onChange}
            />
        ), []);
    const descriptionField = React.useMemo(
        () => (
            <TextField
                className="col m-1"
                name="description"
                label="내용"
                multiline
                rows={2}
                variant="outlined"
                size="small"
                onChange={onChange}
            />
        ), []);
    const rateField = React.useMemo(
        () => (
            <TextField
                className="col m-1"
                name="interestRate"
                label="만기시 이율(%)"
                variant="outlined"
                size="small"
                onChange={onChange}
            />
        ), []
    )
    const minAmountField = React.useMemo(
        () => (
            <TextField
                className="col m-1"
                name="minAmount"
                label="최소 가입 금액"
                variant="outlined"
                size="small"
                onChange={onChange} />

        ), []
    )
    const minDurationField = React.useMemo(
        () => (
            <TextField
                className="col m-1"
                name="minDuration"
                label="최소 가입 기간(일)"
                variant="outlined"
                size="small"
                onChange={onChange}
            />
        ),[]
    )
    return (
        <>
            <button onClick={handleOpen} className='col-2 col-md-1 btn btn-outline-primary mb-3'>+</button>
            <Dialog open={open}>
                <DialogTitle >예금 상품 추가</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        {nameField}
                        {descriptionField}
                        {rateField}
                        {minAmountField}
                        {minDurationField}
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={handleClose} type="submit">추가</Button>
                        <Button color="primary" onClick={handleClose}>취소</Button>
                    </DialogActions>
                </form>

            </Dialog>
        </>
    )
}

export default AddDepositDialog
