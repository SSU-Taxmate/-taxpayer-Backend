import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import axios from 'axios'

import Topbar from '../../../components/Navigation/Topbar';
import Footer from '../../../components/Footer'
import ScrollToTop from '../../../components/Scroll';
import Transfer from './components/Transfer';
import PenaltyTable from './components/PenaltyTable';

import { Button } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

function Penalty() {
  //job date 요청
  const [isLoading, setIsLoading] = useState(false)
  const [err, setIsError] = useState(false);

  let classData = useSelector(state => state.classInfo.classData);
  let user = useSelector((state) => state.user);

  const [users,setUsers]=useState([])
  const [laws,setLaws]=useState([])
  const [fines, setFine] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios.get('/api/students', { params: { classId: classData.classId } });

        let temp = []
        for (let i = 0; i < result.data.length; i++) {
          temp.push({ ...result.data[i], id: result.data[i].studentId })
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
      const getFines = async () =>{
        setIsError(false);
        setIsLoading(true);

        try{
          const result= await axios.get('/api/fine',{params:{classId:classData.classId}});
          let fines =[]
          for(let i=0; i<result.data.length; i++){
            fines.push({...result.data[i], id:result.data[i]._id})
          }
          setFine(fines);
          console.log('테스트',fines)
          
        }catch(error){
          setIsError(true);
        }
        setIsLoading(false);
      }

      getLaws();
      getUsers();
      getFines();

  }, []);


  const columns=[
    { field: 'name', headerName: '학생이름', flex: 3, minWidth: 150, },
    { field: 'lawReason', headerName: '사유', flex: 3, minWidth: 150, },
    { field: 'Amount', headerName: '금액', flex: 3, minWidth: 150, },
    { field: 'isPayed', headerName: '납부', flex: 3, minWidth: 150, type:"boolean"},

  ]
  const example=[ //해당 반 전체의 벌금 내역
    // { id:"0", student:fines[0].Amount, law:fines, Amount:fines, isPayed: false, studentId:'0',},
    { id:"1", student:"배미혜", law:"도로교통법", Amount:20, isPayed: true, studentId:'0'},
    { id:"2", student:"배미혜", law:"이쁜말쓰기", Amount:50, isPayed: true, studentId:'0'},
    { id:"3", student:"김승주", law:"도로교통법", Amount:20, isPayed: false, studentId:'1'}, 
    { id:"4", student:"김승주", law:"폭력", Amount:20, isPayed: true, studentId:'1'},
    { id:"5", student:"박은정", law:"도로교통법", Amount:20, isPayed: false, studentId:'2'},
    { id:"6", student:"최시언", law:"새치기", Amount:30, isPayed: true, studentId:'3'},
    { id:"7", student:"최시언", law:"도로교통법", Amount:20, isPayed: false,studentId:'3'},
  ]

  
  const columnStudent=[
    { field: 'name', headerName: '학생이름', flex: 3, minWidth: 150, },
    { field: 'lawReason', headerName: '사유', flex: 3, minWidth: 150, },
    { field: 'Amount', headerName: '금액', flex: 3, minWidth: 150, },
    { field: 'isPayed', headerName: '납부', flex: 3, minWidth: 150, type:"boolean",
    renderCell: (params) => (params.value===false ?<Button variant='contained' >납부하기</Button>:<CheckIcon/>)

  },

  ]

    return (
            <div>
                {/* <!-- Page Wrapper --> */}
                <div id="wrapper">
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
                                      {isLoading? null:
                                      user.userData&& fines &&
                                      <PenaltyTable
                                      data={user.userData.role ===0? fines:fines.filter(data =>data.studentId._id===user.userData._id)}
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
