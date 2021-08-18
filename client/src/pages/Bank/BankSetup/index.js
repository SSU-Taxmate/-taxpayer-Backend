import React from 'react';
import Topbar from '../../../components/Navigation/Topbar';
import Footer from '../../../components/Footer'
import ScrollToTop from '../../../components/Scroll';
import PageHeading from '../../../components/PageHeading';
import MangeDeposits from './MangeDeposits'
import ManageCredit from './ManageCredit';
function BankSetup() {

    return (
        <div>
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
                            <PageHeading title={'은행 설정'} />
                            {/*예금 상품 관리*/}
                            <h5>예금 상품 관리</h5>
                            <MangeDeposits/>
                            
                            {/*신용등급 설정*/}
                            <h5>신용 등급 설정</h5>
                            <ManageCredit/>
                            {/* <!-- Content Row --> */}
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

export default BankSetup
