import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Icon } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent'
import ChartLine from '../../../../components/Charts/Line'

export default function DetailStockDialog(props) {
    const { selectedValue } = props;
    const [open, setOpen] = useState(false);

    const [selectedHint, setSelected] = useState('')//선택된 날짜의 값과 선생님 hint를 보여줘야 함
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleAddrTypeChange = (e) => {
        setSelected(e.target.value)
        console.log(selectedHint)
    }
    return (
        <>
            <IconButton onClick={handleOpen} style={{ float: 'right' }}> <Icon color="primary"> chevron_right </Icon></IconButton>

            <Dialog aria-labelledby={`${selectedValue.stockName}dialog-title`} open={open} fullWidth={true} maxWidth='lg'>
                <DialogTitle id={`${selectedValue.stockName}dialog-title`} >
                    자세히 '{selectedValue.stockName}' 보기
                    <IconButton className='float-right'color="primary" onClick={handleClose}>
                        <Icon>close</Icon>
                    </IconButton>
                </DialogTitle>
                <DialogContent className='mb-4'>
                    <div className='row'>
                        <div className='col-11'>
                            <ChartLine id="tester" title={`${selectedValue.stockName} 주가 그래프`} />
                        </div>
                        <div className='col-1'>
                            <div className='float-right'>
                                <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                    <label className="btn btn-sm btn-outline-primary active">
                                        <input type="radio" name="options" id="Week" autoComplete="off" defaultChecked />
                                        Week
                                    </label>
                                    <label className="btn btn-sm btn-outline-primary">
                                        <input type="radio" name="options" id="Month" autoComplete="off" />
                                        Month
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-4'>
                            <label htmlFor={`${selectedValue.stockName}date`}>날짜</label>
                            < select
                                id={`${selectedValue.stockName}date`}
                                onChange={e => handleAddrTypeChange(e)}
                                className="form-control" >
                                <option key='default' value='default'>선택해주세요</option>
                                {
                                    selectedValue.prices.map((detail, i) => <option key={detail._id} value={detail.hint}>{detail.updateDate.split('T')[0]}</option>)
                                }
                            </select >
                            <label htmlFor={`${selectedValue.stockName}hint`}>뉴스 </label>
                            <textarea readOnly type="text"
                                defaultValue={selectedHint === 'default' ? "" : selectedHint}
                                className="form-control" id={`${selectedValue.stockName}hint`}
                                style={{ backgroundColor: "transparent" }}>
                            </textarea>
                        </div>
                        <div className='col-8'>

                        </div>
                    </div>

                </DialogContent>
            </Dialog>
        </>
    );
}

DetailStockDialog.propTypes = {
    selectedValue: PropTypes.object.isRequired,
};