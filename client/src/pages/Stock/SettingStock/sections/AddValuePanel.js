import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import axios from 'axios'

function AddValuePanel() {
  const [selectedValue, setSelectedValue] = useState()
  const [stocks, setstocks] = useState([])
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  let classData = useSelector(state => state.classInfo.classData);

  const onhandledailydata = (e) => {
    e.preventDefaultValue()
  }
  const handleDailyData = (e) => {
    console.log(e.target.value)
  }
  const handleDailyNews = (e) => {
    console.log(e.target.value)
  }
  const handleAddrTypeChange = (e) => {
    setSelectedValue(e.target.value)
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        //custom 주식만 가져오기
        const result = await axios.get('/api/stocks/custom', { params: { classId: classData.classId } });
        console.log(result.data)
        setstocks(result.data)

      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);

    };
    fetchData();
    return () => {
    }
  }, [classData])

  return (
    <div>

      <h5 className='pt-3'>오늘의 뉴스 입력</h5>
      <div className='col'>
        <form onSubmit={onhandledailydata}>
          <div className='row'>
            <div className='col' >
              {stocks ?
                < select
                  className="form-control"
                  onChange={e => handleAddrTypeChange(e)}>
                  <option value="" disabled selected>선택해주세요</option>
                  {
                    stocks.map((stock, i) => <option key={stock._id} value={stock._id}>{stock.stockName}</option>)
                  }
                </select >
                : <select className="form-control"></select>
              }
            </div>
            <label htmlFor="inputstock" >주가</label>
            <div className='col'  id='inputstock'>
              <input type="number" className="form-control" id="dailyvalue" placeholder="오늘의 주가"
                onChange={handleDailyData} />
            </div>
          </div>
          <label htmlFor="inputnews" className="col-sm-2 col-form-label">한 줄 뉴스</label>
            <textarea className="form-control" id="inputnews" rows='3' placeholder="뉴스"
              onChange={handleDailyNews} />
          <div className="form-group row float-right pr-2">
            <button type="submit" className="btn btn-primary">입력</button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default AddValuePanel
