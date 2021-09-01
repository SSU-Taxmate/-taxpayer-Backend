import React, { useState, useEffect } from 'react';

import Topbar from '../../../components/Navigation/Topbar';
import Footer from '../../../components/Footer'
import PageHeading from '../../../components/PageHeading';
import ScrollToTop from '../../../components/Scroll'

import axios from 'axios'
import { useSelector } from "react-redux";
import Loading from '../../../components/Loading'
import { Button } from '@material-ui/core';


import JobTable from './component/JobTable';



function ClassSetting() {


  //job date 요청
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([
    { id: '0', name: '우체부', salary: '직업', applyed: '' }
  ])
  const [err, setIsError] = useState(false);
  const showapplicant = () => {
    //modal 띄워서 axios요청 보냄
  }
  let classData = useSelector(state => state.classInfo.classData);
  let user = useSelector((state) => state.user);


  const fetchData = async () => {
    setIsError(false);
    setIsLoading(true);

    try {
      const result = await axios.get('/api/jobs', { params: { classId: classData.classId } });
      let temp = []
      for (let i = 0; i < result.data.length; i++) {
        temp.push({ ...result.data[i], id: result.data[i]._id })
      }
      setData(temp)
    } catch (error) {
      setIsError(true);

    }
    setIsLoading(false);

  };

  useEffect(() => {

    fetchData();

  }, []);



  //data grid 

  //teacher job date grid


  const jobcolumns = [
    { field: 'name', headerName: '직업명', flex: 3, minWidth: 120, },
    { field: 'salary', headerName: '월급', flex: 2, minWidth: 105, },
    { field: 'recruitment', headerName: '모집인원', flex: 2, minWidth: 135 },
  ]

  //student job date grid 
  const jobstudentcolumns = [
    { field: 'name', headerName: '직업명', flex: 1, minWidth: 120, },
    { field: 'salary', headerName: '월급', flex: 1, minWidth: 105, },
    { field: 'recruitment', headerName: '모집인원', flex: 1, minWidth: 135 },
    {
      field: 'applyed', headerName: '지원하기', width: 150,
      renderCell: (params) => (<Button variant='contained' onClick={showapplicant}>신청서작성</Button>)
    }]



  return (
    <>
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

              <PageHeading title="클래스 세팅" />

              {/* <!-- Content Row --> */}
              {isLoading ?
                <Loading /> : (
                  <>
                  {  user.userData&& <JobTable
                      columns={user.userData.role ===0 ?jobcolumns:jobstudentcolumns}
                      data={data.filter(data =>data.joinPossible===true)}
                    />}
                  </>
                )}


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
    </>

  )
}

export default ClassSetting
