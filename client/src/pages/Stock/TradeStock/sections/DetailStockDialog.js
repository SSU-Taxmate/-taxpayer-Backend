import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Icon } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent'
import ChartLine from '../../../../components/Charts/Line'
import TextField from '@material-ui/core/TextField';

import SelectDate from './SelectDate';

function DetailStockDialog({selectedValue}) {
    //console.log('DetailStockDialog', props)
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
            labels: data.map((n, i) => { return n['updateDate'].split('T')[0] }),
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
                    자세히 '{selectedValue.stockName}' 보기
                    <IconButton className='float-right' color="primary" onClick={handleClose}>
                        <Icon>close</Icon>
                    </IconButton>
                </DialogTitle>
                <DialogContent className='mb-4'>
                    <div className='row'>
                        <div className='col-11'>
                            <ChartLine id={`${selectedValue.stockName} 주가`} title={`${selectedValue.stockName} 주가 그래프`}
                                data={adjustData(selectedValue.prices)} />

                        </div>
                    </div>

                    <div className='row'>
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