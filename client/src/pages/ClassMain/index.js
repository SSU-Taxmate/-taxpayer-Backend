import React from "react";
//Navigation
import Topbar from "../../components/Navigation/Topbar";
import Footer from "../../components/Footer";
import PageHeading from "../../components/PageHeading";
import ClassMainDetail from "./ClassMainDetail";
import ScrollToTop from "../../components/Scroll";

function ClassMain() {
  return (
    <div>
      {/* <!-- Page Wrapper --> */}
      <div id="wrapper">
        {/* <!-- Sidebar --> */}

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

              <PageHeading title="클래스 Dashboard" />

              {/* <!-- Content Row --> */}

              <ClassMainDetail />
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
      {/* <!-- Scroll to Top Button--> */}
      <ScrollToTop />
    </div>
  );
}

export default ClassMain;
