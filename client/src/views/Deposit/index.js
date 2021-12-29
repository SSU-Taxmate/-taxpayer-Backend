// material-ui
import { Grid } from '@mui/material';
import "../../css/custom.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

// project imports
import DepositAccount from './DepositAccount';

import Carousel from 'react-material-ui-carousel'
import React, { useState } from "react";
import DepositItem from './DepositItem';


import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';


// ==============================|| SAMPLE PAGE ||============================== //

const data = [
{rate:0.1, name:"이름", mim:1000},
{rate:0.1, name:"이름1", mim:1000},
{rate:0.1, name:"이름2", mim:1000},
{rate:0.1, name:"이름3", mim:1000},


];


export default function Deposit(){

const [page, setPage] = useState(1);
const pageChange = (event, value) => {
  setPage(value);
};

 return (

<Card>
      <CardContent>

      <Carousel
      NextIcon={<ArrowRightIcon/>}
      PrevIcon={<ArrowLeftIcon/>}
      autoPlay={false}
      stopAutoPlayOnHover={false}
      >
            {
                data.map( (item, i) => <DepositAccount key={i} rate={item.rate} name={item.name} min={item.mim} amount={1000} /> )
            }
      </Carousel>
      <div style={{margin:"50px"}}></div>
      {data.map((i,index) =>
    <DepositItem key={index} rate={i.rate} name={i.name} min={i.mim} />)}
      </CardContent>
    </Card>


);
 }
