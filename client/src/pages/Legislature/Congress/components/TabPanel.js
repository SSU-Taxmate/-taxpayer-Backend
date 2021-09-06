import React ,{useState}from 'react'

import { makeStyles, withStyles  } from '@material-ui/core/styles';
import List from '@material-ui/core/List';


import Pagination from '@material-ui/lab/Pagination';
import LawListHeader from './LawListHeader';
import SuggestDetail from '../modals/SuggestDetail';
import BillDetail from '../modals/BillDetail';

export default function TabPanel(props) {

    const [page,setPage]=useState(1);
    const pageChange = (event, value) => {
        setPage(value);
    };

    const quorum=10

    const { children, value, index, data, ...other } = props;

    const[suggestOpen,setSuggestOpen]=useState(false);
    const[billOpen,setBillOpen]=useState(false);
    //const[data,setData]=useState(false);

    const modalOpen=(item)=>{

      //setData(item);

      if(index===0){
        setSuggestOpen(true);
      }
      else if(index===1){
        setBillOpen(true);
      }
    }

    const suggestClose=()=>{
      setSuggestOpen(false)
    }

    const billClose=()=>{setBillOpen(false)}



    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`congress-tabpanel-${index}`}
        aria-labelledby={`congress-tab-${index}`}
        {...other}>
             
        <LawListHeader/>
        <hr className="m-0 py-1"/>

        <List>
          {data.slice((page-1)*5,page*5).map((item)=>(
            <div onClick={()=>modalOpen(item)}>
            <div className="card-body" id={"law"+item.id}>
                <div className="row no-gutters align-items-center">
                <div className="col-2 mr-2 d-none d-sm-inline">
                <div className="mb-0 font-weight-bold text-gray-500">D-10</div></div>
                <div className="col mr-2">
                <div className="h6 mb-0 text-gray-800 font-weight-bold ">{item.title}</div></div>
                <div className="col-auto h5 font-weight-bold text-primary">{Math.round(item.ayes/quorum*100)+"%"}</div></div>

                <div className="d-block d-sm-none">
                <div className="py-2"></div>
                <div className="row no-gutters align-items-center justify-content-end">
                <div className="col-auto ">
                <div className="mb-0 font-weight-bold text-gray-500">~ 10/2</div></div>
                </div></div></div>

            <hr className="m-0"/></div>
    
          )
          )}
        </List>

      <Pagination 
      className="row justify-content-center"
      size="small"  
      page={page}
      count={Math.ceil(data.length/5)} 
      color="primary"
      onChange={pageChange}/>

      <SuggestDetail open={suggestOpen} modalClose={suggestClose}/>
      <BillDetail open={billOpen} modalClose={billClose}/>

      </div>
    );
  }
