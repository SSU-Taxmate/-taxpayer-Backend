import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Icon } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent'
import { Button } from '@material-ui/core';
import ChartLine from '../../../../components/Charts/Line'

export default function DetailStockDialog(props) {
    const {selectedValue}=props;
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <IconButton onClick={handleOpen} style={{ float: 'right' }}> <Icon color="primary"> chevron_right </Icon></IconButton>

            <Dialog aria-labelledby={`${selectedValue.stockId}dialog-title`} open={open}>
                <DialogTitle id={`${selectedValue.stockId}dialog-title`} >자세히 주식 보기</DialogTitle>
                <DialogContent>
                    <div className="form-inline mb-3">
                        <label className="mr-2 my-1" htmlFor={`${selectedValue.stockId}title`}>제목</label>
                        <input type="text" className="form-control" id={`${selectedValue.stockId}title`} defaultValue={selectedValue.title}></input>
                    </div>
                    <ChartLine id="tester" title="tester"  />
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleClose}>추가</Button>
                    <Button color="primary" onClick={handleClose}>취소</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

DetailStockDialog.propTypes = {
    selectedValue: PropTypes.object.isRequired,
  };