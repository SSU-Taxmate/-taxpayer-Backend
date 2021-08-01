import React, { useState, useEffect } from 'react'
import Sidebar from '../../../components/Navigation/Sidebar';
import Topbar from '../../../components/Navigation/Topbar';
import Footer from '../../../components/Footer'
import PageHeading from '../../../components/PageHeading';
import ScrollToTop from '../../../components/Scroll'
import axios from 'axios'
import TransferList from './sections/TransferList'
export default function SettingStock() {
  const [stockName, setstockName] = useState('')
  const [stockDescription, setstockDescription] = useState('')
  const [stockInit, setstockInit] = useState(0)

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [stocks, setstocks] = useState()
  const [selectedValue, setSelectedValue] = useState()

  const handleAddrTypeChange = (e) => {
    setSelectedValue(e.target.value)
  }
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios.get('/api/classes/:classId/stocks');
        setstocks(result.data)

      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);

    };
    fetchData();
    return () => {
    }
  }, [])
  const handleStockName = (e) => {
    //e.preventDefault()
    setstockName(e.target.value)
  }
  const handleStockDetail = (e) => {
    setstockDescription(e.target.value)
  }
  const handleStockInit = (e) => {
    setstockInit(Number(e.target.value))
  }
  const handleSubmit = (e) => {
    const now = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString()
    axios.post('/api/classes/:classId/stocks',
      {
        stockName: stockName,
        description: stockDescription,
        prices: [{ updateDate: now, value: stockInit }]
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div>
      {/* <!-- Page Wrapper --> */}
      <div id="wrapper">

        {/* <!-- Sidebar --> */}
        <Sidebar />
        {/* <!-- End of Sidebar --> */}

        {/* <!-- Content Wrapper --> */}
        <div id="content-wrapper" className="d-flex flex-column">

          {/* <!-- Main Content --> */}
          <div id="content">

            {/* <!-- Topbar --> */}
            <Topbar />
            {/* <!-- End of Topbar --> */}

            {/* <!-- Begin Page Content --> */}
            <div className="container-fluid">

              {/* <!-- Page Heading --> */}

              <PageHeading title="주식설정" />

              {/* <!-- Content Row --> */}
              <div className='row'>
                <div className="col-sm-6 border-right">
                  <h5>선택 추가</h5>
                  <TransferList />

                </div>
                <div className="col-sm-6">
                  <h5>직접 추가</h5>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group row">
                      <label htmlFor="inputstockname" className="col-sm-2 col-form-label">주식명</label>
                      <div className="col-sm-10">
                        <input type="text" className="form-control" id="inputstockname" placeholder="주식명" onChange={handleStockName} />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputstockinfo" className="col-sm-2 col-form-label">주식설명</label>
                      <div className="col-sm-10">
                        <textarea className="form-control" id="inputstockinfo" placeholder="주식설명" onChange={handleStockDetail} rows="3" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputstockinit" className="col-sm-2 col-form-label">초기값</label>
                      <div className="col-sm-10">
                        <input type="number" className="form-control" id="inputstockinit" placeholder="초기값" onChange={handleStockInit} />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col">
                        <div>추가 버튼 클릭시 사용가능한 주식에 추가됨
                        </div>
                        <div>
                          사용 가능한 주식은 받아오는 데이터 + 직접 생성한 주식
                        </div>
                        <hr />
                        <button type="submit" className="btn btn-primary float-right">추가</button>
                      </div>
                    </div>
                  </form>
                  <div>값 입력</div>

                  <h5 className='border-top pt-3'>오늘의 뉴스 입력</h5>
                  <div className='col'>
                    <form>
                      {stocks ?
                        < select
                          className="form-control"
                          onChange={e => handleAddrTypeChange(e)}>
                          {
                            stocks.map((stock, i) => <option key={stock._id} value={stock._id}>{stock.stockName}</option>)
                          }
                        </select >
                        : <select className="form-control"></select>
                      }
                      <input type="number" className="form-control" id="dailyvalue" placeholder="오늘의 주가"
                        onChange={handleStockName} />
                      <label htmlFor="inputnews" className="col-sm-2 col-form-label">한 줄 뉴스</label>
                      <div className="col-sm-10">
                        <textarea className="form-control" id="inputnews" rows='3' placeholder="뉴스" />
                      </div>
                      <div className="form-group row float-right pr-2">
                        <button type="submit" className="btn btn-primary">입력</button>
                      </div>
                    </form>
                  </div>

                </div>
              </div>


            </div>
            {/* <!-- /.container-fluid --> */}

          </div>
          {/* <!-- End of Main Content --> */}

          {/* <!-- Footer --> */}
          <Footer />
          {/* <!-- End of Footer --> */}

        </div>
        {/* <!-- End of Content Wrapper --> */}

      </div>
      {/* <!-- End of Page Wrapper --> */}

      {/* <!-- Scroll to Top Button--> */}
      <ScrollToTop />
    </div>

  )
}
