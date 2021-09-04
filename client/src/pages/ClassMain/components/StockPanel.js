import React, { useState } from 'react'

import { makeStyles, withStyles  } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import ShowChartIcon from '@material-ui/icons/ShowChart';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const listStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background,
        position: 'relative',
        overflow: 'auto',
       // maxHeight: 150,
        
      },
      listSection: {
        backgroundColor: 'inherit',
      },
      ul: {
        backgroundColor: 'inherit',
        padding: 0,
      },
    inline: {
      display: 'inline',
    },
  }));


function StockPanel() {

    const classes=listStyles();

    let today = new Date();

    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);
        
    const date=month  + '/' + day;

    const [data,setData]=useState([

        {title:"일기 제출하기", datail:"매주 일기 2번씩 써서 선생님께 제출하기"},
        {title:"독서록 제출하기", datail:"권장도서 읽고 독서록 쓰기"},
        {title:"사물함 청소하기", datail:"월요일에 사물함 검사 있음"},
        {title:"독서록 제출하기", datail:"권장도서 읽고 독서록 쓰기"},
        {title:"사물함 청소하기", datail:"월요일에 사물함 검사 있음"},
    ]);

    return (

        <div>

<div className="row justify-content-center ">
                            <div className="col-xl-10 col-md-10 ">
                                <div className=" h-100 py-4">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col-auto">
                                            <ShowChartIcon className="text-gray-300" fontSize="large" />
                                        </div>
                                            <div className="col mx-4">
                                                <div className="text-xs font-weight-bold text-info text-uppercase mb-1">주식</div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">오늘의 뉴스</div>
                                            </div>

                                            <div className="col-auto"><span>{date}</span></div>
                                        </div>
                                       
                                        <div className="py-2"></div>
                                        <div>
                                        <List className={classes.root} dense={true}>
                                             {data.map((item) => (
                                                    <div>
                                                    <ListItem >
                                                        <ListItemText primary={item.title}/>
                                                    </ListItem>
                                                    <hr className="m-2"/></div>))}  
                                                    
                                                    </List></div>


</div>
</div>

                    </div>
                                 
                    <div className="row justify-content-center">
                    <div className="col-xl-10 col-md-10 ">
                    <div className="row justify-content-center">


                            <div className="col-xl-6 col-md-6 col-6 ">
                                <div className=" h-100 py-2">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                                    수익률</div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">20%</div>    </div>

                                                <div className="col-auto d-flex"><ArrowDropUpIcon  fontSize="large" className="text-danger"/></div>                
    
   
                                </div></div></div>
                                <div className="col-xl-6 col-md-6 col-6">
                                <div className=" h-100 py-2">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                                    등락률</div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">10%</div>    </div>

                                                <div className="col-auto d-flex"><ArrowDropDownIcon  fontSize="large" className="text-primary"/></div>                
    
   
                                </div></div></div>
                            
              </div></div>
</div>


      </div>

    )


}
        
        

export default StockPanel;
