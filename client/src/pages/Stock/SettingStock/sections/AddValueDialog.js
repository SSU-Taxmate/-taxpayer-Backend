import React, { useState,useEffect,useCallback } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { useSelector } from "react-redux";
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import moment from 'moment-timezone';
import axios from 'axios'
import { DialogContent } from '@material-ui/core';
function AddValueDialog() {
    const [customStocks, setcustomStocks] = useState([])//custom 주식
    const [selectedValue, setSelectedValue] = useState()//선택한 주식
    const [data, setdata] = useState({ price: 0, description: '' })
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false);
    let classData = useSelector(state => state.classInfo.classData);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const onSubmit = (e) => {
      e.preventDefault()
      //console.log('선택한 stock', data, 'setSelectedValue')
      //2021-08-31 보냈을 때
      //console.log(moment(data.updateDate).tz('Asia/Seoul').format(),moment(data.updateDate).tz('Asia/Seoul').utc().format())
      //2021-08-31T00:00:00+09:00 2021-08-30T15:00:00Z
      //console.log(moment(data.updateDate).tz('Asia/Seoul').startOf('day').utc().format())
      data.updateDate=moment(data.updateDate).tz('Asia/Seoul').startOf('day').utc().format()
      axios.put('/api/stocks', { ...data, _id: selectedValue })
        .then(function (response) {
          console.log(response);
          handleClose();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    const onChange = useCallback(
      ({ target: { name, value } }) => setdata(prevdata => ({ ...prevdata, [name]: value })), []
    );
    const handleSelected = (e) => {
      setSelectedValue(e.target.value)
    }
   
    useEffect(() => {
      const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);
        try {
          //custom 주식만 가져오기
          const result = await axios.get('/api/stocks', { params: { classId: classData.classId } });
          console.log(result.data)
          setcustomStocks(result.data)
          
        } catch (error) {
          setIsError(true);
        }
        setIsLoading(false);
  
      };
      fetchData();
      
    }, [classData.classId])
    const dateField = React.useMemo(
      () => (
          <input name='updateDate' defaultValue={data.updateDate}
            min={moment().tz('Asia/Seoul').add(1, 'd').format('YYYY-MM-DD')}
            type='date' onChange={onChange} style={{ marginRight: '3px' }}></input>
      ), [data.updateDate])
    const todayValueField = React.useMemo(
      () => (
        <input type="number" className="form-control" name="price" placeholder="오늘의 주가"
          value={data.price} onChange={onChange} />
      ), [data.price])
    const todayNewsField = React.useMemo(
      () => (
        <textarea className="form-control" name="description" rows='3' placeholder="뉴스"
          value={data.description} onChange={onChange} />
      ), [data.description])
   
    return (
        <>
            <IconButton color="primary" onClick={handleOpen}><AddIcon/></IconButton>
            <Dialog fullWidth aria-labelledby="stock-dialog-title" open={open} onClose={handleClose}>
                <DialogTitle id="stock-dialog-title">주가 입력</DialogTitle>
                <DialogContent>
                    <form onSubmit={onSubmit}>
                        <div className='row'>
                            <div className='col' >
                                {customStocks ?
                                    < select
                                        className="form-control"
                                        onChange={e => handleSelected(e)}
                                        defaultValue="default"
                                    >
                                        <option value="default" disabled>선택해주세요</option>
                                        {
                                            customStocks.map((stock, i) => <option key={stock._id} value={stock._id}>{stock.stockName}</option>)
                                        }
                                    </select >
                                    : <select className="form-control"></select>
                                }
                            </div>
                            <label htmlFor="price" >주가</label>
                            <div className='col' id='inputstock'>
                                {todayValueField}
                            </div>
                            <div className='col-*' id='inputDate'>
                                {dateField}
                            </div>
                        </div>
                        <label htmlFor="description" className="col-sm-2 col-form-label">한 줄 뉴스</label>
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

export default React.memo(AddValueDialog)
