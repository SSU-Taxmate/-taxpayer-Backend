import React, { Component } from "react";

//Navigation
import Sidebar from "../../components/Navigation/Sidebar";
import Topbar from "../../components/Navigation/Topbar";
import Footer from "../../components/Footer";
import PageHeading from "../../components/PageHeading";

import ScrollToTop from "../../components/Scroll";
import CreditDetail from "./CreditDetail";
class Credit extends Component {
  componentWillMount() {
    document.getElementById("body").className = "page-top";
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

                <PageHeading title="신용 등급" />

                {/* <!-- Content Row --> */}
                <CreditDetail></CreditDetail>
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
        <ScrollToTop />
      </>
    );
  }
}

export default Credit;
