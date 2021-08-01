import React, { useState, useEffect } from 'react'
import SingleLineMyInvest from './SingleLineMyInvest'
import Sidebar from '../../../components/Navigation/Sidebar';
import Topbar from '../../../components/Navigation/Topbar';
import Footer from '../../../components/Footer'
import PageHeading from '../../../components/PageHeading';
import ScrollToTop from '../../../components/Scroll'
function AccountStock() {
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

                            <PageHeading title="투자 현황" />

                            {/* <!-- Content Row --> */}
                            <h4 className='pt-2'>내 투자 현황</h4>
                            <div className="card shadow py-1 col-lg-4">
                                <table className='m-3'>
                                    <tbody>
                                        <tr>
                                            <td>투자 가능 금액</td>
                                            <td>1000원</td>
                                        </tr>
                                        <tr>
                                            <td>손익</td>
                                            <td>1000원</td>
                                        </tr>
                                        <tr>
                                            <td>수익률</td>
                                            <td>1.26%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h4 className='pt-2'>내 보유 주식</h4>
                            <SingleLineMyInvest data={'mydata'}/>

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
        </div>)
        
}

export default AccountStock
