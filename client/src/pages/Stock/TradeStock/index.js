import React, { Component } from 'react'
import Sidebar from '../../../components/Navigation/Sidebar';
import Topbar from '../../../components/Navigation/Topbar';
import Footer from '../../../components/Footer'
import PageHeading from '../../../components/PageHeading';
import ScrollToTop from '../../../components/Scroll'
import CardBasic from '../../../components/Cards/Basic'
import SingleLineGridList from './SingleLineGridList'
import LogoutModal from '../../../components/Modal/Logout';
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
                <SingleLineGridList data={[{ title: 'kosdaq', stockId: 'id1', currentValue: 100 }, { title: 'kospi', stockId: 'id2', 'currentValue': 1550 }, { title: 'kosdaq', stockId: 'id3', 'currentValue': 100 }, { title: 'kospi', stockId: 'id4', 'currentValue': 1550 }, { title: 'gold', stockId: '300', 'currentValue': 150 }, { title: 'gold', stockId: '300', 'currentValue': 150 }, { title: 'kosdaq', stockId: '100', 'currentValue': 100 }, { title: 'kospi', stockId: '200', 'currentValue': 1550 }, { title: 'gold', stockId: '300', '현재가': 150 }]} />
                <div className='row'>
                <div className="col-6">
                <h4>오늘의 주식 브리핑</h4>
                <CardBasic title='실시간 Best'></CardBasic>
                <h4>내 투자 현황</h4>
                <CardBasic title='내 잔고'></CardBasic>
                </div>
                <div className="col-6">
                <h4>주식 매도 매수 창</h4>
                <CardBasic title='매도, 매수 창'></CardBasic>

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
