import React, { Component } from 'react'
import Sidebar from '../../../components/Navigation/Sidebar';
import Topbar from '../../../components/Navigation/Topbar';
import Footer from '../../../components/Footer'
import PageHeading from '../../../components/PageHeading';
import ScrollToTop from '../../../components/Scroll'
import CardBasic from '../../../components/Cards/Basic'
import TradeSection from './sections/TradeSection'
import SingleLineStockList from './sections/SingleLineStockList'
import LogoutModal from '../../../components/Modal/Logout';
import SingleLineMyInvest from './sections/SingleLineMyInvest'
export default class TradeStock extends Component {
  render() {
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
                <h4>오늘의 주식</h4>
                <SingleLineStockList data={[{ title: 'kosdaq', stockId: 'id1', currentValue: 100 }, { title: 'kospi', stockId: 'id2', 'currentValue': 1550 }, { title: 'kosdaq', stockId: 'id3', 'currentValue': 100 }, { title: 'kospi', stockId: 'id4', 'currentValue': 1550 }, { title: 'gold', stockId: '300', 'currentValue': 150 }, { title: 'gold', stockId: '300', 'currentValue': 150 }, { title: 'kosdaq', stockId: '100', 'currentValue': 100 }, { title: 'kospi', stockId: '200', 'currentValue': 1550 }, { title: 'gold', stockId: '300', '현재가': 150 }]} />
                <div className='row'>
                  <div className="col-6">
                    <h4>오늘의 주식 브리핑</h4>
                    <CardBasic title='실시간 Best'></CardBasic>

                  </div>
                  <div className="col-6">

                  </div>
                </div>
                <h4>주식 매도 매수 창</h4>
                <div className="card shadow py-2">
                  <TradeSection></TradeSection>
                </div>

                <h4 className='ml-1'>내 투자 현황</h4>
                <div className='row ml-1'>
                  <div className="card shadow py-1 col-auto">
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
                  <div className='col'>
                    <SingleLineMyInvest />
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
        <LogoutModal />
      </div>

    )
  }
}
