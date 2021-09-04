import React, { useState, useEffect, useCallback } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment-timezone';
import axios from 'axios'
import { DialogContent } from '@material-ui/core';
function MangeValueDialog({ type, stockId }) {
  const [data, setdata] = useState({ value: 0, hint: '' ,updateDate:moment().tz('Asia/Seoul').add(1, 'd').format('YYYY-MM-DD')})

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = (e) => {
    e.preventDefault()
    if (type === 'add') {
      data.updateDate = moment(data.updateDate).tz('Asia/Seoul').startOf('day').utc().format()
      axios.put(`/api/stocks/${stockId}/prices`, data)
        .then(function (response) {
          handleClose();
        })
        .catch(function (error) {
          console.log(error);
        });
    }else{
      console.log('edit')
    }
  }
  const onChange = useCallback(
    ({ target: { name, value } }) => setdata(prevdata => ({ ...prevdata, [name]: value })), []
  );

  const dateField = React.useMemo(
    () => (
      <input name='updateDate' defaultValue={data.updateDate}
        min={moment().tz('Asia/Seoul').add(1, 'd').format('YYYY-MM-DD')}
        type='date' onChange={onChange} style={{ marginRight: '3px' }}></input>
    ), [data.updateDate])
  const todayValueField = React.useMemo(
    () => (
      <input type="number" className="form-control" name="value" placeholder="오늘의 주가"
        value={data.value} onChange={onChange} />
    ), [data.value])
  const todayNewsField = React.useMemo(
    () => (
      <textarea className="form-control" name="hint" rows='3' placeholder="뉴스"
        value={data.hint} onChange={onChange} />
    ), [data.hint])

  return (
    <>
      <IconButton color="primary" onClick={handleOpen}>{type==='add'?<AddIcon />:<EditIcon/>}</IconButton>
      <Dialog fullWidth aria-labelledby="stock-dialog-title" open={open} onClose={handleClose}>
        <DialogTitle id="stock-dialog-title">주가 입력</DialogTitle>
        <DialogContent>
          <form onSubmit={onSubmit}>
            <div className='row'>
              <label htmlFor="value" >주가</label>
              <div className='col' id='inputstock'>
                {todayValueField}
              </div>
              <div className='col-*' id='inputDate'>
                {dateField}
              </div>
            </div>
            <label htmlFor="hint" className="col-sm-2 col-form-label">한 줄 뉴스</label>
            {todayNewsField}
            <div className="float-right pr-2">
              <button type="submit" className="btn btn-primary">입력</button>
            </div>
          </form>
          <button className="btn" onClick={handleClose}>취소</button>

        </DialogContent>
      </Dialog>
    </>
  )
}

export default React.memo(MangeValueDialog)
