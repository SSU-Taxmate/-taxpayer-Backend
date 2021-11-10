import React, { useState, useCallback } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment-timezone';
import axios from 'axios'
import { DialogContent } from '@material-ui/core';
function MangeValueDialog({ type, stockId,price}) {
  const [data, setdata] = useState(
     {
      value: type==='edit'?price.value:0,
      hint: type==='edit'?price.hint:'',
      updateDate: type==='edit'?moment(price.updateDate).tz('Asia/Seoul').format('YYYY-MM-DD'):moment().tz('Asia/Seoul').add(1, 'd').format('YYYY-MM-DD')
    }
  )

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = (e) => {
    e.preventDefault()
    data.updateDate = moment(data.updateDate).tz('Asia/Seoul').startOf('day').utc().format()
    if (type === 'add') {
      axios.post(`/api/stocks/${stockId}/prices`, data)
        .then(function (response) {
          handleClose();
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios.put(`/api/stocks/${stockId}/prices`,data)
      .then(function(response){
        handleClose();
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
  const onChange = useCallback(
    ({ target: { name, value } }) => setdata(prevdata => ({ ...prevdata, [name]: value })), []
  );

  const dateField = React.useMemo(
    () => (
      <input name='updateDate' 
        readOnly={type==="edit"?true:false}
        defaultValue={data.updateDate}
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
      <IconButton color="primary" onClick={handleOpen} style={{padding:"0"}}>{type === 'add' ? <AddIcon/> : <EditIcon />}</IconButton>
      <Dialog fullWidth aria-labelledby="stock-dialog-title" open={open} onClose={handleClose}>
        <DialogTitle id="stock-dialog-title">주가 입력</DialogTitle>
        <DialogContent>
          <form onSubmit={onSubmit}>
            <div className='row p-2'>
              <div className="col-sm-1 col-md-1 col-lg-1 p-0 mt-1">
              <span >주가</span></div>
              <div className='col-sm-9 col-md-7 col-lg-7 p-0 mr-1' id='inputstock'>
                {todayValueField}
              </div>
              <div className='col-sm-12 col-md-3 col-lg-3 p-0 mt-1' id='inputDate'>
                {dateField}
              </div>
            </div>
            <label htmlFor="hint" className="col-form-label">한 줄 뉴스</label>
            {todayNewsField}
            <div className="row d-flex pl-2 pr-2 mt-3" style={{justifyContent:"flex-end"}}>
              <button className="btn mr-2" onClick={handleClose}>취소</button>
              <button type="submit" className="btn btn-primary">입력</button>
            </div>
          </form>

        </DialogContent>
      </Dialog>
    </>
  )
}

export default React.memo(MangeValueDialog)
