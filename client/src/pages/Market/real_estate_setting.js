import React, { Component } from 'react';

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import Footer from '../../components/Footer'
import PageHeading from '../../components/PageHeading';
import ScrollToTop from '../../components/Scroll';
import SingleLineStockList from './sections/SingleLineStockList'

class EstateSetting extends Component {
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

                <PageHeading title="부동산" />
                <SingleLineStockList data={[{ title: '귀염핫도그', stockId: 'id1', currentValue: 100, img : "https://media-cdn.tripadvisor.com/media/photo-s/0f/ec/70/9c/photo0jpg.jpg"  }, { title: '신나문구점', stockId: 'id2', 'currentValue': 1550, img : "https://mblogthumb-phinf.pstatic.net/20150213_136/startceo_1423795314664H0yxf_JPEG/2015-02-13_11-40-18.jpg?type=w2" }, { title: '앗매워떡볶이', stockId: 'id3', 'currentValue': 100, img : "https://cdnweb01.wikitree.co.kr/webdata/editor/202007/07/img_20200707090644_7ebc248e.webp" }, { title: '앗차가아이스크림', stockId: 'id4', 'currentValue': 1550, img : "https://t1.daumcdn.net/cfile/tistory/993FDF405D4533F204" }, { title: '으쌰으쌰체육관', stockId: '300', 'currentValue': 150, img : "https://www.igangdong.or.kr/page/images/contents/ch/ch_010204_rent1.jpg" }]} />
               

               {/* <!-- Content Row --> */}
               <div className="row">
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

export default EstateSetting;