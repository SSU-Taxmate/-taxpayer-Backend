import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Sidebar from '../../../components/Navigation/Sidebar';
import Topbar from '../../../components/Navigation/Topbar';
import Footer from '../../../components/Footer'
import PageHeading from '../../../components/PageHeading';
import ScrollToTop from '../../../components/Scroll'
import CardBasic from '../../../components/Cards/Basic'
import TradeSection from './sections/TradeSection'
import StockList from './sections/StockList'
import SingleLineMyInvest from './sections/SingleLineMyInvest'
export default function TradeStock() {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [stocks, setstocks] = useState()
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

              <PageHeading title="주식거래창" />

              {/* <!-- Content Row --> */}
              <h4 className='pt-2'>오늘의 주식</h4>
              {/*{[{ title: 'A엔터', stockId: 'id1', currentValue: 100 }, { title: 'gold', stockId: 'id9', '현재가': 150 }]}  */}
              {isError && <div>Something went wrong ...</div>}
              {isLoading? <div>로딩중</div> :
                <StockList data={stocks} />}
              <h4 className='pt-2'>오늘의 주식 브리핑</h4>
              <div className='row'>
                <div className="col-6">
                  <CardBasic title='지난주 매도/매수 Best'></CardBasic>
                </div>
              </div>
              <h4 className='pt-2'>주식 매도 매수 창</h4>
              <div className="card shadow py-2">
                <TradeSection stocks={stocks}></TradeSection>
              </div>

              <h4 className='pt-2'>내 투자 현황</h4>
              <div className="card shadow py-1 col-lg-4">
                <table className='m-3'>
                  <tbody>
                    <tr>
                      <td>투자 가능 금액</td>
                      <td>1000원</td>
                    </tr>
                    <tr>
                      <td>손익</td>
                      <td>1000원</td>
                    </tr>
                    <tr>
                      <td>수익률</td>
                      <td>1.26%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h4 className='pt-2'>내 보유 주식</h4>
              <SingleLineMyInvest />
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
