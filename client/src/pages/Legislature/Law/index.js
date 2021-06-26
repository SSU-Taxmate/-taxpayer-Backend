import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//Navigation
import Sidebar from '../../../components/Navigation/Sidebar';
import Topbar from '../../../components/Navigation/Topbar';
import PageHeading from '../../../components/PageHeading';
import ScrollToTop from '../../../components/Scroll';
import LogoutModal from '../../../components/Modal/Logout';
import CardCollapse from '../../../components/Cards/Collapse'
import Footer from '../../../components/Footer'
class Law extends Component {
  render() {
    const laws = ['헌법', '질서유지법', '도로교통법', '교육법', '형사법', '환경보호법', '금융거래법']
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

                <PageHeading title="법"><h5>시행일 2021-06-26</h5></PageHeading>

                {/* <!-- Content Row --> */}
                {laws.map((law, i) => (
                  <CardCollapse key={i} title={law} area_id={law}>
                    This is a collapsable card example using Bootstrap's built in collapse
                    functionality. <strong>Click on the card header</strong> to see the card body
                  </CardCollapse>
                ))
                }
  
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

export default Law;