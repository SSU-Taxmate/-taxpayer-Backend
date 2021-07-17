import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Draft from '../../../../components/Editor';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent'
import { Button } from '@material-ui/core';


export default function DetailStockDialog(props) {
    const { onClose, selectedValue, open } = props;
    const handleClose = (type) => {
        onClose();
    };
    //console.log(props)


    return (
        
        <Dialog aria-labelledby={`${selectedValue.stockId}dialog-title`} open={open}>
            <DialogTitle id={`${selectedValue.stockId}dialog-title`} >자세히 주식 보기</DialogTitle>
            <DialogContent>
            <div className="form-inline mb-3">
                    <label className="mr-2 my-1" htmlFor={`${selectedValue.stockId}title`}>제목</label>
                    <input type="text" className="form-control" id={`${selectedValue.stockId}title`} defaultValue={selectedValue.title}></input>
                </div>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={() => handleClose('add')}>추가</Button>
                <Button color="primary" onClick={() => handleClose('cancel')}>취소</Button>
            </DialogActions>
        </Dialog>
        
    );
}

DetailStockDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.object.isRequired,
};

