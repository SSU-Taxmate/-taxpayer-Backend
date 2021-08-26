import React, { Component } from 'react';

//Navigation
import Topbar from '../../components/Navigation/Topbar';
import Footer from '../../components/Footer'
import PageHeading from '../../components/PageHeading';
import ScrollToTop from '../../components/Scroll';
import T_market_porduct from './T_market_product'

class MarketProduct extends Component {
  componentWillMount() {
    document.getElementById('body').className = 'page-top'
  }

  render() {
    return (
      <>
        {/* <!-- Page Wrapper --> */}
        <div id="wrapper">

           
           
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
              <T_market_porduct title="가지" comment="가지가지하는 가지입니다" img="https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/2xMI/image/3UsuJyueeNW67kRgvKeERwT-o4s.jpg"></T_market_porduct>
              <T_market_porduct title="양파" comment="까도까도 매력이 넘치는 양파입니다" img="https://lh3.googleusercontent.com/proxy/WTBih9AAfaaad2oIkuwERNaQRsllJqzdvOl0n8wKZgrC0X4rtPU2OTp9uPK9LHlVoCk1Sqvioj7kwH6g29ei37F6Jw6wrCfbTLwLGFzGCDfUN_c77a1fG2BV1xkwLTU2rEG-craOSNU"></T_market_porduct>
              <T_market_porduct title="당근" comment="당근은 당근좋아" img="data:image/jpeg;base64,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"></T_market_porduct>
              <T_market_porduct title="물건추가하기" comment="새로운 물건을 추가할 수 있습니다." img="https://i.ytimg.com/vi/AFXyZa5WfHA/maxresdefault.jpg"></T_market_porduct>
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

export default MarketProduct;