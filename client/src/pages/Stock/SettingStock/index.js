import React from 'react'
import Sidebar from '../../../components/Navigation/Sidebar';
import Topbar from '../../../components/Navigation/Topbar';
import Footer from '../../../components/Footer'
import PageHeading from '../../../components/PageHeading';
import ScrollToTop from '../../../components/Scroll'

import TransferList from './sections/TransferList'
export default function SettingStock() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
                  <form>
                    <div class="form-group row">
                      <label for="inputstockname" class="col-sm-2 col-form-label">주식명</label>
                      <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputstockname" placeholder="주식명" />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="inputstockinfo" class="col-sm-2 col-form-label">주식설명</label>
                      <div class="col-sm-10">
                        <textarea class="form-control" id="inputstockinfo" placeholder="주식설명" rows="3"/>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="inputstockname" class="col-sm-2 col-form-label">초기값</label>
                      <div class="col-sm-10">
                        <input type="number" class="form-control" id="inputstockname" placeholder="초기값" />
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="col">
                        <div>추가 버튼 클릭시 사용가능한 주식에 추가됨
                        </div>
                        <div>
                          사용 가능한 주식은 받아오는 데이터 + 직접 생성한 주식
                        </div>
                        <hr />
                        <button type="submit" class="btn btn-primary float-right">추가</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <h5 className='border-top pt-3'>오늘의 뉴스 입력</h5>
              <div className='col'>
                <form>
                  <div class="form-group row">
                    <label for="inputnews" class="col-sm-2 col-form-label">한 줄 뉴스</label>
                    <div class="col-sm-10">
                      <textarea  class="form-control" id="inputnews" rows='3' placeholder="뉴스" />
                    </div>
                  </div>
                  <div class="form-group row float-right pr-2">
                    <button type="submit" class="btn btn-primary">입력</button>
                  </div>
                </form>
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
