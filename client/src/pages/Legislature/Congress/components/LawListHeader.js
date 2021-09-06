import React,{useState} from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SuggestAdd from '../modals/SuggestAdd';

export default function LawListHeader(props){

    const item=props.item
    const sorting=[{label:"최신순",status:0,},{label:"추천순",status:1}]
    const[addOpen,setAddOpen]=useState(false);

    const addModalClose=()=>{
        setAddOpen(false)
      }

      const addModalOpen=()=>{
        setAddOpen(true)
      }
  


    return(
<div>
        <div className="card-body ">
        <div className="row no-gutters align-items-center mx-2 justify-content-end">
        <div className="col-auto h6 mb-0 mr-2 text-gray-800 font-weight-bold">
        <a onClick={addModalOpen} className="btn btn-primary btn-icon-split">
                        <span className="text">제안하기</span>
                    </a>
            </div>
        <div className="col-auto h6 mb-0 text-gray-800 font-weight-bold">
        <Autocomplete
            id="list-sorting"
            options={sorting}
            getOptionLabel={(option) => option.label}
            style={{ width: 135}}
            renderInput={(params) => <TextField {...params} label="정렬" variant="outlined" dense="true" size="small"/>}
/></div></div>

        </div>

<hr className="m-0 "/>

        <div className="card-body d-none d-sm-inline">
        <div className="row no-gutters align-items-center mx-4">
        <div className="col-2 mr-2">
        <div className="h6 mb-0 text-gray-800 font-weight-bold">만료일</div></div>
        <div className="col mr-2">
        <div className="h6 mb-0 text-gray-800 font-weight-bold text-center">제목</div></div>
        <div className="col-auto h6 mb-0 text-gray-800 font-weight-bold">동의율</div></div>

        </div>
        <SuggestAdd open={addOpen} modalClose={addModalClose}/>
        </div>
          
    )
}