import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from "react-redux";
import axios from 'axios'
import moment from 'moment-timezone';
function AddValuePanel() {
  const [customStocks, setcustomStocks] = useState([])//custom 주식
  const [selectedValue, setSelectedValue] = useState()//선택한 주식

  const [data, setdata] = useState({ price: 0, description: '' })

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  let classData = useSelector(state => state.classInfo.classData);

  const onSubmit = (e) => {
    e.preventDefault()
    console.log('선택한 stock', data, 'setSelectedValue')
    axios.put('/api/stocks', { ...data, _id: selectedValue })
      .then(function (response) {
        console.log(response);
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
    return () => {
    }
  }, [classData.classId])
  const dateField = React.useMemo(
    () => (
        <input name='updateDate' defaultValue={data.updateDate}
          min={moment().add(1, 'd').format('YYYY-MM-DD')}
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
    <div>

      <h5 className='pt-3'>오늘의 뉴스 입력</h5>
      <div className='col'>
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
          <div className="form-group row float-right pr-2">
            <button type="submit" className="btn btn-primary">입력</button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default AddValuePanel
