import React, { Component } from 'react';
import Sidebar from '../../../components/Navigation/Sidebar'
import Topbar from '../../../components/Navigation/Topbar';
import Footer from '../../../components/Footer'
import PageHeading from '../../../components/PageHeading';
import LogoutModal from '../../../components/Modal/Logout'
import ScrollToTop from '../../../components/Scroll';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};




function Bank() {

    const [modalIsOpen, setIsOpen] = React.useState(false);


    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
    }

    function closeModal(props) {
        setIsOpen(false);
    }


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

                            <div>

                                <div className="row py-3 justify-content-center">
                                    <div className="account-card shadow justify-content-center col-md-6 bg-white">

                                        <div className="text-sm">    홍길동님의 계좌</div>

                                        <div className="text-center py-4" > <h1> $ 100,000 </h1></div>

                                        <hr />



                                        <ul className="nav nav-tabs" id="account_tabs" role="tablist">
                                            <li className="nav-item">
                                                <a className="nav-link" id="transfer_tab" data-toggle="tab" href="#transfer" role="tab"
                                                    aria-controls="transfer" aria-selected="true">이체</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="bank_statement" data-toggle="tab" href="#bank_statement" role="tab"
                                                    aria-controls="bank_statement" aria-selected="false">이용내역</a>
                                            </li>
                                        </ul>



                                        <div className="row">
                                            <div className="col-md-5 text-centernav-link collapsed" href="#" data-toggle="collapse" data-target="#collapse_transfer" aria-controls="collapseTwo"> 이체 </div>
                                            <div className="col-md-2 py-2"></div>

                                            <div className="col-md-5 text-centernav-link collapsed" href="#" data-toggle="collapse" data-target="#collapse_bank_statement" aria-controls="collapseTwo"> 이용내역 </div>


                                            <div id="collapse_transfer" className='collapse' aria-labelledby="headingTwo" data-parent="#accordionSidebar">


                                                <div className="input-group input-group-newsletter col-lg-12 py-3">
                                                    <input className="form-control nav-item dropdown nav-link" type="text" placeholder="이름" aria-describedby="submit-button"
                                                        id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></input>

                                                    <div className="dropdown-menu dropdown-menu animated--grow-in" aria-labelledby="navbarDropdown">
                                                        <a className="dropdown-item" href="#">김승주</a>
                                                        <a className="dropdown-item" href="#">박은정</a>
                                                        <a className="dropdown-item" href="#">배미혜</a>

                                                    </div>
                                                </div>



                                                <div className="input-group input-group-newsletter col-lg-12 py-3">
                                                    <input className="form-control nav-item dropdown nav-link" type="text"
                                                        placeholder="0.0$" aria-describedby="submit-button"
                                                        id="navbarDropdown" role="button" data-toggle="dropdown"
                                                        aria-haspopup="true" aria-expanded="false"></input></div></div>

                                        </div>



                                        <div id="collapse_bank_statement" className='collapse' aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                                            테이블
                                        </div>




                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="account-card shadow justify-content-center col-md-6 bg-white nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapse_deposit" aria-controls="collapseTwo">
                                        <div className="row">
                                            <div className="col-lg-4">예금 계좌</div>
                                            <div className="col-lg-8" style={{ textAlign: 'right', }}>100,000</div>
                                        </div>

                                        <div id="collapse_deposit" className='collapse' aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                                            <div className="bg-white py-2 collapse-inner rounded">

                                                <div className="text-center py-4" > 만기시: $ 101,000 </div>
                                                <div className="text-center py-4" > 지금 해지시: $ 100,000 </div>

                                                <a href="#"
                                                    className="btn btn-primary btn-icon-split btn-lg font-weight-bold">
                                                    <span className="text">해지하기</span>
                                                </a>

                                            </div>
                                        </div>


                                    </div>
                                </div>

                                <div className="row py-3 justify-content-center">
                                    <div className="account-card shadow justify-content-center col-md-6 bg-white">
                                        <div className="text-center" onClick={openModal}>
                                            <i class="fas fa-plus"></i>

                                        </div>
                            

                                        <div>

                                        </div>
                                    </div>
                                </div>

                                <div className="row justify-content-center">
                                    <div className="account-card shadow justify-content-center col-md-6 bg-white">
                                        <div className="text-center">

                                            <a className='nav-link collapsed' href="#" data-toggle="collapse" data-target="#collapse_bank_statics" aria-controls="collapseTwo">
                                                <i class="fas fa-chevron-down"></i>            <span>내정보 보기</span>
                                            </a>


                                            <div id="collapse_bank_statics" className='collapse' aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                                                <div className="bg-white py-2 collapse-inner rounded">
                                                    <h1>1등급</h1>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>



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
            <LogoutModal />

        </div>







    )

}

export default Bank;