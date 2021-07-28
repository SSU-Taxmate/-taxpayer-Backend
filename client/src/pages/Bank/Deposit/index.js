import React, { Component } from 'react';
import TableTheme from '../../../components/Table/TableTheme';
import Sidebar from '../../../components/Navigation/Sidebar'
import Topbar from '../../../components/Navigation/Topbar';
import Footer from '../../../components/Footer'
import ScrollToTop from '../../../components/Scroll';
import DepositCloseModal from '../../../components/Modal/DepositCloseModal/depositCloseModal';

class Deposit extends Component {

    render() {
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

                                <div >

                                    <div className="row py-4">
                                        <div className="col-md-3"></div>
                                        <div className="account-card shadow justify-content-center col-md-6 bg-white">
                                            <div className="text-sm"> 1등급 똑똑저축 상품 <span className="tooltip"><i class="fas fa-info-circle" ></i></span> </div>
                                            <span class="tooltip-text">이율 10% 뭐시기 뭐시기의 1등급만을 위한 최상위 상품</span>

                                            <div className="text-center py-4" > <h1>예금현황: $ 100,000 </h1></div>
                                            <div className="text-center py-3" > <h3>2021. 03. 21 ~ 2021. 05. 21</h3></div>


                                            <hr />

                                            <DepositCloseModal id='depositCloseModal'> <div> 해지하기</div>
                                            </DepositCloseModal>
                                            <div className="col-md-3"></div>


                                        </div>

                                        <TableTheme
                                            title="예금상품"
                                        />

                                    </div>

                                    {/* <!-- Content Row --> */}
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

                </div></div>







        );
    }

}

export default Deposit;