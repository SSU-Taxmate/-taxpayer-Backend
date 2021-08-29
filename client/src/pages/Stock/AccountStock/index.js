import React, { useState, useEffect } from 'react'
import Topbar from '../../../components/Navigation/Topbar';
import Footer from '../../../components/Footer'
import PageHeading from '../../../components/PageHeading';
import ScrollToTop from '../../../components/Scroll'
import { useSelector } from "react-redux";
import InvestStatus from './sections/InvestStatus'
import axios from 'axios';
import Error from '../../../components/Error';
import Loading from '../../../components/Loading'
import MyInvest from './sections/MyInvest'
import ByStudentStock from './sections/ByStudentStock';
function AccountStock() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const joinedUser = useSelector(state => state.classUser);
    const user = useSelector((state) => state.user);

    const [stocks, setstocks] = useState([])

    const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);
        try {
            const result = await axios.get(`/api/students/${joinedUser.classUser}/stocks`)
            setstocks(result.data)
            console.log(result.data)//Alert로 사용자에게 보여주기
        } catch (error) {
            setIsError(true);
        }
        setIsLoading(false);
    };
    useEffect(() => {
        fetchData();
    }, [joinedUser.classUser])

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

                            <PageHeading title="투자 현황" />
                            {/* <!-- Content Row --> */}
                            {user.userData&&
                            <h4 className='pt-2'>{user.userData.name}님의 투자 현황</h4>}
                            <div style={{display:'flex',justifyContent:'space-evenly'}}className="account-card shadow bg-white"> 
                                <InvestStatus data={stocks} />
                                <ByStudentStock/>
                            </div>
                            <h4 className='pt-2'>보유 주식</h4>
                            {isError && <Error></Error>}
                            {isLoading ? <Loading /> :
                                <div className='row flex-row flex-nowrap overflow-auto'>
                                    {stocks.map((item, i) => (
                                        <MyInvest
                                            key={i}
                                            data={item}
                                        />
                                    ))}
                                </div>}

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
