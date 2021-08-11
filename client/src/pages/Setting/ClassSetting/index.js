import React, { useState, useEffect } from 'react';

import Sidebar from '../../../components/Navigation/Sidebar';
import Topbar from '../../../components/Navigation/Topbar';
import Footer from '../../../components/Footer'
import PageHeading from '../../../components/PageHeading';
import ScrollToTop from '../../../components/Scroll'
import axios from 'axios'
import { useSelector } from "react-redux";
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import { GridToolbarContainer, GridToolbarDensitySelector } from '@material-ui/data-grid';
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarDensitySelector />
      <Button>+ 직업 추가(엑셀,개별)</Button>
    </GridToolbarContainer>
  )
}

function ClassSetting() {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([
    { id: '0', name: '우체부', salary: '직업', applyed: '' }
  ])
  const [err, setIsError] = useState(false);
  const showapplicant = () => {
    //modal 띄워서 axios요청 보냄
  }
  let classData = useSelector(state => state.classInfo.classData);
  const jobcolumns = [
    { field: 'name', headerName: '직업명', width: 150 },
    { field: 'salary', headerName: '월급', width: 150 },
    { field: 'whatdo', headerName: '하는일', width: 150 },
    { field: 'qualification', headerName: '자격요건', width: 150 },
    { field: 'recruitment', headerName: '모집인원', width: 150 },
    { field: 'period', headerName: '고용기간', width: 150 ,type:'dateTime'},
    {
      field: 'applyed', headerName: '지원자', width: 150,
      renderCell: (params) => (<Button variant='contained' onClick={showapplicant}>2명)자세히보기</Button>)
    }]
  const jobstudentcolumns = [
    { field: 'name', headerName: '직업명', width: 150 },
    { field: 'salary', headerName: '월급', width: 150 },
    { field: 'whatdo', headerName: '하는일', width: 150 },
    { field: 'qualification', headerName: '자격요건', width: 150 },
    { field: 'recruitment', headerName: '모집인원', width: 150 },
    { field: 'period', headerName: '고용기간', width: 150 },
    {field: 'applyed', headerName: '지원하기', width: 150,
      renderCell: (params) => (<Button variant='contained' onClick={showapplicant}>신청서작성</Button>)
    }]
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios.get('/api/jobs', { params: { classId: classData.classId } });
        console.log(result.data)
        let temp = []
        for (let i = 0; i < result.data.length; i++) {
          temp.push({ ...result.data[i], id: result.data[i]._id })
        }
        //console.log(temp)
        setData(temp)
      } catch (error) {
        setIsError(true);

      }
      setIsLoading(false);

    };
    fetchData();

  }, []);
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
                <div>loading</div> : (
                  <>
                    {/* */}
                    <h2>직업 모집 공고 설정(선생님)</h2>
                    <div style={{ height: 400, width: '100%' }}>
                      <DataGrid
                        rows={data}
                        columns={jobcolumns}
                        pageSize={5}
                        components={{
                          Toolbar: CustomToolbar
                        }}
                        checkboxSelection
                        disableSelectionOnClick
                      />
                    </div>
                    <h2>직업 모집 공고(학생)</h2>
                    <div style={{ height: 400, width: '100%' }}>
                      <DataGrid
                        rows={data}
                        columns={jobstudentcolumns}
                        pageSize={5}
                        checkboxSelection
                        disableSelectionOnClick
                      />
                    </div>
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
