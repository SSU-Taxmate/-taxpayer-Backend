// material-ui
import { Grid } from '@mui/material';
import "../../css/custom.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

// project imports
import Account from './Account';
import AccountRecordItem from './AccountRecordItem';

import Pagination from '@mui/material/Pagination';
import React, { useState } from "react";



// ==============================|| SAMPLE PAGE ||============================== //

const data = [
{date:"11/11", memo:"벌금", amount:-1000},
{date:"11/11", memo:"벌금", amount:-1000},
{date:"11/11", memo:"월급", amount:1000},
{date:"11/11", memo:"벌금", amount:-1000},
{date:"11/11", memo:"벌금", amount:-1000},
{date:"11/11", memo:"벌금", amount:-1000},
{date:"11/11", memo:"월급", amount:1000},
{date:"11/11", memo:"벌금", amount:-1000},
{date:"11/11", memo:"벌금", amount:-1000},
{date:"11/11", memo:"벌금", amount:-1000},
{date:"11/11", memo:"월급", amount:1000},
{date:"11/11", memo:"벌금", amount:-1000},
{date:"11/11", memo:"벌금", amount:-1000},
{date:"11/11", memo:"벌금", amount:-1000},
{date:"11/11", memo:"월급", amount:1000},
{date:"11/11", memo:"벌금", amount:-1000},
];


export default function BankStatement(){

const [page, setPage] = useState(1);
const pageChange = (event, value) => {
  setPage(value);
};

const record = data.slice((page - 1) * 10, page * 10).map((i,index) =>
    <AccountRecordItem key={index} date={i.date} memo={i.memo} amount={i.amount} />
);


 return (

<Card>
      <CardContent>
     <Account amount={1000000}/>
     
     <div style={{marginTop:40, m:5}}>{record}</div>


     <Pagination
        size="small"
        page={page}
        count={Math.ceil(data.length / 10)}
        color="primary"
        onChange={pageChange}
        sx={{ justifyContent:'center', display:"flex", m:'10px',marginTop:5}}
   
        />
      </CardContent>
     

    </Card>


);
 }
