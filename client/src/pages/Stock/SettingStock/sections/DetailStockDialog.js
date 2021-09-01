import React, { useState } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Button, DialogActions, DialogContent } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import NewsItem from './NewsItem'
import AddValueDialog from './AddValueDialog'

function DetailStockDialog({ stock }) {
    console.log('DetailStockDialog',stock)
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <IconButton color="primary" onClick={handleOpen}><ArrowForwardIosIcon /></IconButton>
            <Dialog aria-labelledby="detailStock-dialog-title" open={open}>
                <DialogTitle id="detailStock-dialog-title">주식 설정 확인<AddValueDialog/></DialogTitle>
                <DialogContent>
                    <div className="row py-2">
                        <div className="font-weight-bold mx-2 job-label">주식이름</div>
                        <div className="seperator-gray mx-1"></div>
                        <div className="text-gray-900 mx-2 job-input">{stock.stockName}</div>
                    </div>
                    <div className="row py-2">
                        <div className="font-weight-bold m-2 job-label">설명</div>
                        <div className="seperator-gray m-1"></div>
                        <div className="text-gray-900 m-2 job-input">{stock.description}</div>
                    </div>
                    <hr />
                    <List dense>
                        {stock.prices.map((value,i) => {
                            return (
                                <ListItem key={i}>
                                    <NewsItem />
                                </ListItem>
                            );
                        })}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        닫기
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DetailStockDialog
