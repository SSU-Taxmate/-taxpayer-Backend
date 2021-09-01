import React, { useState, useEffect } from 'react';

//modal import
import { DataGrid, GridToolbarFilterButton } from '@material-ui/data-grid';
import { Box, Button, ButtonGroup, Paper } from '@material-ui/core';
import { GridToolbarContainer, GridToolbarDensitySelector, GridCellParams, GridColDef } from '@material-ui/data-grid';


import Switch from '@material-ui/core/Switch';

import Delete from '@material-ui/icons/Delete';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import { useSelector } from "react-redux";


import JobDetailModal from './JobDetailModal';
import JobEditModal from './JobEditModal';
import JobDeleteModal from './JobDeleteModal';



function JobTable(props) {


  const columns = props.columns;
  const [data, setData] = useState(props.data);

  let user = useSelector((state) => state.user);

  //switch handle : datagird에 체크박스 추가시키기-> 체크박스로 job status 변화 시키기
  const [editable, setEditable] = useState(false)

  const toggleEditable = () => {
    setEditable((prev) => !prev);
    setSelection([])
  };

  //job modal handle

  //job modal data
  const [modalRow, setModalRow] = useState([]);

   // 선택한 row 상위 컴포넌트로 전달
   function jobSelected(params) {

    setModalRow(params.row)
    jobDetailModalOpen()
  }
 

   //job detail modal: 선생님과 학생들이 job에 대한 상세정보를 조회하는 모달
   const [jobDetailIsOpen, setjobDetailOpen] = useState(false);

   const jobDetailModalOpen = () => {
     setjobDetailOpen(true);
 
   };
 
   const jobDetailModalClose = () => {
     setjobDetailOpen(false);
   };
 
 
   //job 삭제
   const [jobDeleteIsOpen, setjobDeleteOpen] = useState(false);
 
   const jobDeleteModalOpen = () => {
 
     jobEditModalClose();
     jobDetailModalClose();
 
     setjobDeleteOpen(true);
 
   };
 
   const jobDeleteModalClose = () => {
     setjobDeleteOpen(false);
   };
 
   //job edit modal: 선생님의 job에 대한 정보를 수정할 수 있는 곳
 
   const [jobEditIsOpen, setjobEditOpen] = useState(false);
 
 
   const jobEditModalOpen = () => {
     setjobEditOpen(true);
   };
 
   const jobEditModalClose = () => {
     setjobEditOpen(false);
   };
 
   function jobAddModalOpen() {
 
     setModalRow([]);
     jobEditModalOpen();
 
   }

 

  const [select, setSelection] = useState([]);

  const handleRowSelection = (items) => { //선택된 row의 id값들의 배열=items
    setSelection(items);
  }

  function jobDelete() {

    jobDeleteModalOpen()
  }

  function TeacherJobToolbar() {
    return (

      <GridToolbarContainer className="card-header py-1 d-flex flex-row align-items-center justify-content-between">

 {/*수정하기 토글 */}
        <Switch color="primary" checked={editable} onChange={toggleEditable} />
        <div className="m-0 font-weight-bold text-primary mx-2">

          <ButtonGroup color="primary" variant="text" spacing={1}>

            {/* 직업추가 */}
            <Button onClick={jobAddModalOpen}><AddRoundedIcon /></Button>
            {/* 직업 disable -> delete*/}
            {editable ? <Button onClick={jobDelete}><Delete /></Button> : null}

          </ButtonGroup>
        </div>
      </GridToolbarContainer>

    )
  }




  return (

    <div className="row justify-content-center">
      <div style={{ height: 500, width: '100%' }} className="col-lg-8">
     { user.userData&&<DataGrid
          rows={props.data}
          columns={columns}
          components={user.userData.role ===0 ?{Toolbar: TeacherJobToolbar}:false}
          disableSelectionOnClick
          checkboxSelection={editable}
          autoPageSize
          selectionModel={select}
          onRowDoubleClick={(params) => jobSelected(params)}
          onSelectionModelChange={(items) => handleRowSelection(items)}
        />}
      </div>


      <JobDetailModal

        row={modalRow}
        open={jobDetailIsOpen}
        close={jobDetailModalClose}
        jobEditModalOpen={jobEditModalOpen}/>

    <JobEditModal
    row={modalRow}
    open={jobEditIsOpen}
    close={jobEditModalClose}/>

    <JobDeleteModal
    open={jobDeleteIsOpen}
    close={jobDeleteModalClose}
    row={modalRow}
    rows={select}/>



    </div>
  )
}


export default React.memo(JobTable)