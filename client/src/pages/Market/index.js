import React, { Component } from 'react';

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import Footer from '../../components/Footer'
import PageHeading from '../../components/PageHeading';
import ScrollToTop from '../../components/Scroll';
import T_market_porduct from './T_market_product'

class Market extends Component {
  componentWillMount() {
    document.getElementById('body').className = 'page-top'
  }

  render() {
    return (
      <>
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

                <PageHeading title="시장관리" />

               {/* <!-- Content Row --> */}
               <div className="row">
              <T_market_porduct title="야채시장" comment="야채를 팔아요 근데 신선함을 곁들인 " img="https://www.kyeonggi.com/news/photo/201907/2126550_917024_5351.jpg" href="./pages/Market/Market_add"></T_market_porduct>
              <T_market_porduct title="고기시장" comment="고기를 팔아요 근데 신선함을 곁들인 " img="http://www.lamb.international/news/photo/202003/724_555_637.jpg"></T_market_porduct>
              <T_market_porduct title="장난감시장" comment="장난감을 팔아요 근데 재미를 곁들인 " img="https://i.ytimg.com/vi/AFXyZa5WfHA/maxresdefault.jpg"></T_market_porduct>
              </div>
              </div>
              {/* <!-- /.container-fluid --> */}

            </div>
            {/* <!-- End of Main Content --> */}

            {/* <!-- Footer --> */}
           <Footer></Footer>
            {/* <!-- End of Footer --> */}

          </div>
          {/* <!-- End of Content Wrapper --> */}

        </div>
        {/* <!-- End of Page Wrapper --> */}

        {/* <!-- Scroll to Top Button--> */}
        <ScrollToTop/>
      </>
    )
  }
}

export default Market;