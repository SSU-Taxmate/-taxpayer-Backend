import React, { useEffect, useState } from 'react';
import Topbar from '../../../components/Navigation/Topbar';
import Footer from '../../../components/Footer'
import ScrollToTop from '../../../components/Scroll';
import Account from './AccountSection';
import Deposit from './DepositSection';
import axios from 'axios'
import { useSelector } from "react-redux";
import Statistics from './StatisticsSection';


function Bank() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userAccount, setUserAccount] = useState({})
  const joinedUser = useSelector(state => state.classUser);
  const user = useSelector(state => state.user);
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios.get(`/api/students/${joinedUser.classUser}/account`);
        //console.log("/api/students/:id/account", result.data);
        setUserAccount(result.data)
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
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

              <div className="row">
                <div className="col-lg-6 justify-content-center">
                  {user.userData && (userAccount &&
                  <>
                    <Account
                      user={user.userData.name}
                      balance={userAccount.currentBalance} />
                  </>
                  )}
                  <Deposit balance={userAccount.currentBalance} />

                </div>
                {/*Bank Statistics */}
                <Statistics/>
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
    </div>







  )

}

export default Bank;