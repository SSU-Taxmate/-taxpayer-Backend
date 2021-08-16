import React, { useEffect,useState } from 'react';
import Topbar from '../../../components/Navigation/Topbar';
import Footer from '../../../components/Footer'
import LogoutModal from '../../../components/Modal/Logout'
import ScrollToTop from '../../../components/Scroll';
import Account from '../BankComponents/Account';
import Deposit from '../BankComponents/Deposit';
import DepositAdd from '../DepositAdd';
import axios from 'axios'
import { useSelector } from "react-redux";


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

 

    
function Bank () {

const [modalIsOpen, setIsOpen] = React.useState(false);
const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  let joinedUser = useSelector(state => state.classUser);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal(props) {
    setIsOpen(false);
  }
useEffect(() => {
  const fetchData = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const result = await axios.get(`/api/students/${joinedUser.classUser}/account`);
      console.log("/api/students/:id/account",result.data);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };
  fetchData();
}, [])

  return(

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

                        <div className="row">
                            <div className="col-lg-6 justify-content-center">
                            <Account
                            user="홍길동"
                            balance="10000"/>
    
                            <Deposit 
                            balance="10000"
                            interest="0.1"/>

                            <DepositAdd/>
                            </div>
                    
                    <div className="col-lg-6 justify-content-center py-3">
                        <div className="account-card shadow justify-content-center bg-white">
                <div className="text-center">


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
        <ScrollToTop/>
        <LogoutModal/>

        </div>







  )

}

    export default Bank;