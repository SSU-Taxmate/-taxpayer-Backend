import React, { useState, useEffect } from 'react';

//modal import
import { DataGrid, GridToolbarFilterButton } from '@material-ui/data-grid';
import { Box, Button, ButtonGroup, Paper } from '@material-ui/core';
import { GridToolbarContainer, GridToolbarDensitySelector, GridCellParams, GridColDef } from '@material-ui/data-grid';


import Switch from '@material-ui/core/Switch';

import Delete from '@material-ui/icons/Delete';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';



function JobTable_T(props) {


  const columns = props.columns;
  const [status, setStatus] = useState(0);
  const [data, setData] = useState(props.data);

  //job status에 따라 분류된 결과 저장소-> filter 이용하는 걸로 바꾸기
  let ableRow = [];
  let disableRow = [];

  //switch handle : datagird에 체크박스 추가시키기-> 체크박스로 job status 변화 시키기
  const [editable, setEditable] = useState(false)

  const toggleEditable = () => {
    setEditable((prev) => !prev);
    setSelection([])
  };


  // 선택한 row 상위 컴포넌트로 전달
  function jobSelected(params) {

    props.jobSelected(params);

  }


  /* job status에 따른 table 변경*/
  function setJobStatus(params) {

    switch (params) {

      case 0:
        setData(props.data)
        setStatus(0);
        break;
      case 1:
        setData(ableRow)
        setStatus(1);
        break;
      case 2:
        setData(disableRow)
        setStatus(2);
        break;
    }

  }


  // status에 따라 row 나누기

  function filterRow() {

    for (let i = 0; i < props.data.length; i++) {

      if (props.data[i].joinPossible === true)
        ableRow.push({ ...props.data[i] });
      else
        disableRow.push({ ...props.data[i] });

    }

  }

  const [select, setSelection] = useState([]);

  const handleRowSelection = (items) => { //선택된 row의 id값들의 배열=items

    setSelection(items.selectionModel);
  }

  // 선택한 row 상위 컴포넌트로 전달
  const selctionHandle = (params) => {

    props.selctionHandle(params);

  }

  function jobDelete() {

    selctionHandle(select);

  }

  function TeacherJobToolbar() {
    return (

      <GridToolbarContainer className="card-header py-1 d-flex flex-row align-items-center justify-content-between">

        <div className="m-0 font-weight-bold text-primary mx-2">

          <ButtonGroup color="primary" variant="text" spacing={1}>

            {/*수정하기 토글 */}
            {status === 1 || status === 2 ? <Switch color="primary" checked={editable} onChange={toggleEditable} /> : null}

            {/* 직업추가 */}
            <Button onClick={props.jobAddModalOpen}><AddRoundedIcon /></Button>
            {/* 직업 able -> disable*/}
            {editable && status === 1 ? <Button><RemoveRoundedIcon /></Button> : null}
            {/* 직업 disable -> delete*/}
            {editable && status === 2 ? <Button onClick={jobDelete}><Delete /></Button> : null}
            {/*  직업 disable ->able*/}
            {editable && status === 2 ? <Button><RestoreFromTrashIcon /></Button> : null}

          </ButtonGroup>


        </div>



        {/* job status에 따라서 필터링하기 */}
        <div className="dropdown no-arrow mx-3" >
          <a className="dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" onClick={filterRow} aria-haspopup="true" aria-expanded="false">
            <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
          </a>

          <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
            <a className="dropdown-item" role="button" onClick={() => setJobStatus(0)}>모든직업</a>
            <a className="dropdown-item" role="button" onClick={() => setJobStatus(1)}>지원가능</a>
            <a className="dropdown-item" role="button" onClick={() => setJobStatus(2)}>지원불가</a>
          </div>
        </div>




      </GridToolbarContainer>

    )
  }




  return (

    <div className="row justify-content-center">
      <div style={{ height: 500, width: '100%' }} className="col-lg-8">
        <DataGrid
          rows={data}
          columns={columns}
          components={{
            Toolbar: TeacherJobToolbar
          }}
          disableSelectionOnClick
          checkboxSelection={editable}
          autoPageSize
          selectionModel={select}
          onRowDoubleClick={(params) => jobSelected(params)}
          onSelectionModelChange={(items) => handleRowSelection(items)}
        />
      </div>

    </div>
  )
}


export default React.memo(JobTable_T)