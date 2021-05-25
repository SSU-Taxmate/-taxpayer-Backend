import React, { Component } from 'react';

import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import PageHeading from '../../components/PageHeading';
import ChartPie from '../../components/Charts/Pie'

import ChartBar from '../../components/Charts/Bar'
class Charts extends Component {
    render() {
        return (
            <div>
                {/* <!-- Page Wrapper --> */}
                <div id="wrapper" >

                    {/* <!-- Sidebar --> */}
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
                                <ChartPie/>
                                <ChartBar/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Charts;