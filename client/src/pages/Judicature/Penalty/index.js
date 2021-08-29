import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import axios from 'axios'

import Topbar from '../../../components/Navigation/Topbar';
import Footer from '../../../components/Footer'
import PageHeading from '../../../components/PageHeading';
import ScrollToTop from '../../../components/Scroll';
import Transfer from './components/Transfer';
import PenaltyTable from './components/PenaltyTable';

import { Button } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { GridCellParams } from '@material-ui/data-grid';



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


  const columns=[
    { field: 'student', headerName: '학생이름', flex: 3, minWidth: 150, },
    { field: 'law', headerName: '사유', flex: 3, minWidth: 150, },
    { field: 'Amount', headerName: '금액', flex: 3, minWidth: 150, },
    { field: 'isPayed', headerName: '납부', flex: 3, minWidth: 150, type:"boolean"},

  ]
  const example=[
    { id:"0", student:"배미혜", law:"도로교통법", Amount:30, isPayed: false, studentId:'0',},
    { id:"1", student:"배미혜", law:"도로교통법", Amount:20, isPayed: true, studentId:'0'},
    { id:"2", student:"배미혜", law:"이쁜말쓰기", Amount:50, isPayed: true, studentId:'0'},
    { id:"3", student:"김승주", law:"도로교통법", Amount:20, isPayed: false, studentId:'1'}, 
    { id:"4", student:"김승주", law:"폭력", Amount:20, isPayed: true, studentId:'1'},
    { id:"5", student:"박은정", law:"도로교통법", Amount:20, isPayed: false, studentId:'2'},
    { id:"6", student:"최시언", law:"새치기", Amount:30, isPayed: true, studentId:'3'},
    { id:"7", student:"최시언", law:"도로교통법", Amount:20, isPayed: false,studentId:'3'},
   
  ]

  
  const columnStudent=[
    { field: 'student', headerName: '학생이름', flex: 3, minWidth: 150, },
    { field: 'law', headerName: '사유', flex: 3, minWidth: 150, },
    { field: 'Amount', headerName: '금액', flex: 3, minWidth: 150, },
    { field: 'isPayed', headerName: '납부', flex: 3, minWidth: 150, type:"boolean",
    renderCell: (params) => (params.value===false ?<Button variant='contained' >납부하기</Button>:<CheckIcon/>)

  },

  ]

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
                                  <div className='col-lg-8'>
                                    <div className="text-center py-5 mx-4">
                                      {console.log('user',user.userData)}
                                      {isLoading? null:
                                      user.userData&& <PenaltyTable
                                      data={user.userData.role ===0? example:example.filter(data =>data.studentId==='0')}
                                      columns={ user.userData.role ===0?columns:columnStudent}
                                      />}

                                    </div>

                                  {  user.userData&&  user.userData.role ===0? <div className="text-center card py-5 shadow">
                                    <h4>벌금부과</h4>
                                    <div className="row justify-content-center">
                                   {isLoading ?  null: <Transfer
                                    users={users}
                                    laws={laws}/>}

                                    </div>
                                    </div>:null}
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
