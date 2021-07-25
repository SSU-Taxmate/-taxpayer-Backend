import React, { Component } from 'react';

//Navigation
import Sidebar from '../../../../components/Navigation/Sidebar'
import Topbar from '../../../../components/Navigation/Topbar';
import Footer from '../../../../components/Footer'
import PageHeading from '../../../../components/PageHeading';
import NationalTaxDetail from './NationalTaxDetail'
import ScrollToTop from '../../../../components/Scroll';

class NationalTax extends Component {

  render() {
    return (
      <>
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar />
              <div className="container-fluid">
                <PageHeading title="나라 세금 통계" />
                <NationalTaxDetail/>
              </div>
            </div>
           <Footer/>
          </div>
        </div>
        <ScrollToTop/>
      </>
    )
  }
}

export default NationalTax;