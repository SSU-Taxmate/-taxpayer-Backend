import React, { useState, useEffect } from 'react';

import Topbar from '../../../components/Navigation/Topbar';
import Footer from '../../../components/Footer'
import PageHeading from '../../../components/PageHeading';
import ScrollToTop from '../../../components/Scroll'

import axios from 'axios'
import { useSelector } from "react-redux";
import { Box, Button, ButtonGroup, Paper } from '@material-ui/core';


import JobTable from './component/JobTable';
import JobDetailModal from './component/JobDetailModal';
import JobEditModal from './component/JobEditModal';
import JobDeleteModal from './component/JobDeleteModal';



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
    { field: 'salary', headerName: '월급', flex: 2, minWidth: 105,  },
    { field: 'recruitment', headerName: '모집인원', flex:2, minWidth:135 },
    { field: 'joinPossible', headerName: '지원가능',type:"boolean", flex:2, minWidth:135},

  ]

    //student job date grid 
  const jobstudentcolumns = [
    { field: 'name', headerName: '직업명', flex: 1, minWidth: 120, },
    { field: 'salary', headerName: '월급', flex: 1, minWidth: 105,  },
    { field: 'recruitment', headerName: '모집인원', flex:1, minWidth:135 },
    {field: 'applyed', headerName: '지원하기', width: 150,
      renderCell: (params) => (<Button variant='contained' onClick={showapplicant}>신청서작성</Button>)
    }]


    //job modal handle

    //job modal data
    const [modalRow,setModalRow]=useState([]);

    //job detail modal: 선생님과 학생들이 job에 대한 상세정보를 조회하는 모달
    const [jobDetailIsOpen, setjobDetailOpen] = useState(false);

    const jobDetailModalOpen=()=>{
      setjobDetailOpen(true);

      };
    
      const jobDetailModalClose = () => {
        setjobDetailOpen(false);
      };


      //job 삭제
      const [jobDeleteIsOpen, setjobDeleteOpen] = useState(false);

    const jobDeleteModalOpen=()=>{
      
      jobEditModalClose();
      jobDetailModalClose();

      setjobDeleteOpen(true);

      };
    
      const jobDeleteModalClose = () => {
        setjobDeleteOpen(false);
      };

    
      //apply student List



    //job edit modal: 선생님의 job에 대한 정보를 수정할 수 있는 곳

      const [jobEditIsOpen, setjobEditOpen] = useState(false);


      const jobEditModalOpen=()=>{
        setjobEditOpen(true);  
        };
      
        const jobEditModalClose = () => {
          setjobEditOpen(false);
        };

        function jobAddModalOpen(){

          setModalRow([]);
          jobEditModalOpen();

        }



        //job CRUD

        const jobAdd= (input) => {
 
          const { name, salary,recruitment,whatdo,} = input; // 비구조화 할당을 통해 값 추출

          axios
            .post("/api/jobs", {

              name, salary,recruitment,whatdo, 
              joinPossible:true,
              classId: classData.classId,

            })
            .then(response=>{
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });

            fetchData();

        };


        function jobEdit(){

          jobEditModalOpen();
          jobDetailModalClose();
 
        }


        const jobUpdate=(input)=>{
          const { name, salary,recruitment,whatdo,joinPossible,} = input; // 비구조화 할당을 통해 값 추출
            
          axios
            .put("/api/jobs", {

              name, salary,recruitment,whatdo,joinPossible,
              classId: classData.classId,
              _id:modalRow.id,

            })
            .then(response=>{
              console.log(response);
              
            })
            .catch(function (error) {
              console.log(error);
            });

            fetchData();


        }


       

        //
   
      function jobSelected(params){
        
        setModalRow(params.row)
        setjobDetailOpen(true)

      }

      function selectionHandle(select){

        console.log("selection",select)
      }


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
                <Loading/> : (
                  <>
                    {/* */}
                    <JobTable

                    columns={jobcolumns}
                    data={data}
                    jobSelected={jobSelected}     
                    jobAddModalOpen={jobAddModalOpen} 
                    selectionHandle={(select)=>selectionHandle(select)}
                  
                  />
                  </>
                )}

                <JobDetailModal

                row={modalRow}
                open={jobDetailIsOpen}                
                close={jobDetailModalClose}
                jobEditModalOpen={jobEditModalOpen}
                jobJoinPossibleChange={(input)=>jobUpdate(input)}
                jobDeleteModalOpen={jobDeleteModalOpen}

                />

                <JobEditModal

                  row={modalRow}
                  open={jobEditIsOpen}                
                  close={jobEditModalClose}
                  jobUpdate={(input)=>jobUpdate(input)}
                />

                <JobDeleteModal
                  open={jobDeleteIsOpen}                
                  close={jobDeleteModalClose}
                  row={modalRow}

                />






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
