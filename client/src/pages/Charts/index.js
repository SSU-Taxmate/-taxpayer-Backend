import React, { Component } from 'react';
import ChartPie from '../../components/Charts/Pie'
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import PageHeading from '../../components/PageHeading';
import ScrollToTop from '../../components/Scroll'

import ChartBar from '../../components/Charts/Bar'
class Charts extends Component {
    render() {
        return (
            <div>
                {/* <!-- Page Wrapper --> */}
                <div id="wrapper" >

                     
                    < Sidebar />
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
                                <PageHeading title="Charts" />
                                <ChartPie />
                                <ChartBar />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Scroll to Top Button--> */}
                <ScrollToTop />
            </div>

        )
    }
}

export default Charts;