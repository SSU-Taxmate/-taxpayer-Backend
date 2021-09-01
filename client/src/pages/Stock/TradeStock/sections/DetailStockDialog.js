import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Icon } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent'
import ChartLine from '../../../../components/Charts/Line'
import TextField from '@material-ui/core/TextField';
import SelectDate from './SelectDate';
import moment from 'moment-timezone';

function DetailStockDialog({selectedValue}) {
    console.log('DetailStockDialog', selectedValue)
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    /*  */
   

    const adjustData = (data) => {
        return {
            labels: data.map((n, i) => { return moment(n['updateDate']).tz('Asia/Seoul').format('YYYY-MM-DD')}),
            datasets: [{
                label: '주가',
                lineTension: 0.3,
                backgroundColor: "rgba(78, 115, 223, 0.05)",
                borderColor: "rgba(78, 115, 223, 1)",
                pointRadius: 3,
                pointBackgroundColor: "rgba(78, 115, 223, 1)",
                pointBorderColor: "rgba(78, 115, 223, 1)",
                pointHoverRadius: 3,
                pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
                pointHoverBorderColor: "rgba(78, 115, 223, 1)",
                pointHitRadius: 10,
                pointBorderWidth: 2,
                data: data.map((n, i) => { return n['value'] })
            }]
        }
    }
    return (
        <>
            <IconButton onClick={handleOpen} style={{ float: 'right' }}> <Icon color="primary"> chevron_right </Icon></IconButton>

            <Dialog aria-labelledby={`${selectedValue.stockName}dialog-title`} open={open} fullWidth={true} maxWidth='lg'>
                <DialogTitle id={`${selectedValue.stockName}dialog-title`} >
                <div className="row row-cols-2 row-cols-md-2">
                    <div className="col-10 ">
                        <div className="row row-cols-1 row-cols-md-2">
                            <div className="col">
                                <span>'{selectedValue.stockName}' 주식</span>
                            </div>
                            <div className="col">
                                <span  style={{color:'red', fontWeight:'bold'}}>{selectedValue.ondelete?'* 상장 폐지 예정 *':''}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-1 text-center">
                    <IconButton className='float-right' color="primary" onClick={handleClose} style={{width:'1rem'}}>
                        <Icon>close</Icon>
                    </IconButton>
                    </div>
                </div>
                </DialogTitle>
                <DialogContent className='mb-4'>
                    <div className='row justify-content-center'>
                        <div className='col-11'>
                            <ChartLine id={`${selectedValue.stockName} 주가`} title={`${selectedValue.stockName} 주가 그래프`}
                                data={adjustData(selectedValue.prices)} />

                        </div>
                    </div>

                    <div className='row justify-content-center'>
                        <TextField
                            className='col-md-6'
                            fullWidth
                            id="stock-description"
                            label="종목 설명"
                            variant="outlined"
                            defaultValue={selectedValue.description}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </div>
                    <div className='row mt-3 justify-content-center'>
                    <SelectDate selectedValue={selectedValue}/>

                    </div>

                </DialogContent>
            </Dialog>
        </>
    );
}
export default React.memo(DetailStockDialog);
DetailStockDialog.propTypes = {
    selectedValue: PropTypes.object.isRequired,
};