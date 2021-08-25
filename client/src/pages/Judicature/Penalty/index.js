import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import axios from 'axios'

import Topbar from '../../../components/Navigation/Topbar';
import Footer from '../../../components/Footer'
import PageHeading from '../../../components/PageHeading';
import ScrollToTop from '../../../components/Scroll';
import PenaltyDetail from './PenaltyDetail';
import Transfer from './components/Transfer';


function Penalty() {

  //job date 요청
  const [isLoading, setIsLoading] = useState(false)
  const [err, setIsError] = useState(false);
  const showapplicant = () => {
    //modal 띄워서 axios요청 보냄
  }
  let classData = useSelector(state => state.classInfo.classData);
  let user = useSelector((state) => state.user);

  const [users,setUsers]=useState([])
  const [laws,setLaws]=useState([])

  useEffect(() => {
    const getUsers = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios.get('/api/students', { params: { classId: classData.classId } });

        let temp = []
        for (let i = 0; i < result.data.length; i++) {
          temp.push({ ...result.data[i], id: result.data[i]._id })
        }
        setUsers(temp)
      } catch (error) {
        setIsError(true);

      }
      setIsLoading(false);

    };

    const getLaws = async () => {
        setIsError(false);
        setIsLoading(true);
  
        try {
          const result = await axios.get('/api/laws', { params: { classId: classData.classId } });
  
          let temp = []
          for (let i = 0; i < result.data.length; i++) {
            temp.push({ ...result.data[i], id: result.data[i]._id })
          }
          setLaws(temp)
        } catch (error) {
          setIsError(true);
  
        }
        setIsLoading(false);
  
      };

      getLaws();
      getUsers();

  }, []);



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
                                <div className='row justify-content-center'>
                                    <div className="col-lg-8 card m-4 shadow">
                                    <div className="text-center" style={{margin:30}}><h4>벌금부과</h4></div>

                                    <div className="row justify-content-center">
                                   
                                   {isLoading ? null :<Transfer
                                    users={users}
                                    laws={laws}/>}

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

                </div>

    )
}

export default Penalty;
