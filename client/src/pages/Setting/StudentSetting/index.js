import React, { useState, useEffect } from 'react';
import Topbar from '../../../components/Navigation/Topbar';
import Footer from '../../../components/Footer'
import PageHeading from '../../../components/PageHeading';
import ScrollToTop from '../../../components/Scroll'

//modal import
import { DataGrid, GridToolbarFilterButton } from '@material-ui/data-grid';


import { useSelector } from "react-redux";
import axios from 'axios'

import StudentCard from './components/StudentCard';


function StudentSetting() {


  //job date 요청
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([  ])
  const [err, setIsError] = useState(false);
  const showapplicant = () => {
    //modal 띄워서 axios요청 보냄
  }
  let classData = useSelector(state => state.classInfo.classData);
  let user = useSelector((state) => state.user);


  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios.get('/api/students', { params: { classId: classData.classId } });
        console.log("student", result)

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
    fetchData();

  }, []);



  const columns = [
    { field: 'name', headerName: '이름', flex: 3, minWidth: 150, },
    { field: 'balance', headerName: '계좌', flex: 3, minWidth: 150, },
    { field: 'email', headerName: '이메일', flex: 3, minWidth: 150, },

  ]

  const [row,setRow]=useState([]);
  
  function studentSelected(params){
        
    setRow(params.row)

  }

    return (
        <>
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
                <PageHeading title="학생 세팅" />
                {/* <!-- Content Row --> */}

<div className="row justify-content-center">
                <div style={{ height: 500, width: '100%' }} className="col-lg-4">

                <DataGrid
                columns={columns}
                rows={data}
                autoPageSize
                onRowDoubleClick={(params) =>studentSelected(params)}
                disableSelectionOnClick
                />
                </div>
                <div className="col-lg-6 card shadow m-4">
                  <StudentCard
                  row={row}
                  />

                </div>
                </div>

              </div>
              {/* <!-- /.container-fluid --> */}
            </div>
            {/* <!-- End of Main Content --> */}

            {/* <!-- Footer --> */}
            <Footer/>
            {/* <!-- End of Footer --> */}

          </div>
          {/* <!-- End of Content Wrapper --> */}

        </div>
        {/* <!-- End of Page Wrapper --> */}

        {/* <!-- Scroll to Top Button--> */}
        <ScrollToTop/>
        
        </>
    
    )
}

export default StudentSetting
