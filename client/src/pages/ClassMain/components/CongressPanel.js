import React, { useState } from 'react'

import { makeStyles, withStyles  } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import ErrorIcon from '@material-ui/icons/Error';


const tabStyles = makeStyles((theme)=>({
    root: {
      backgroundColor: theme.palette.background,
    },
  }));
  

function CongressPanel() {


    const tab=tabStyles();
    const [data,setData]=useState([

        {title:"일기 제출하기", datail:"매주 일기 2번씩 써서 선생님께 제출하기"},
        {title:"독서록 제출하기", datail:"권장도서 읽고 독서록 쓰기"},
        {title:"사물함 청소하기", datail:"월요일에 사물함 검사 있음"},
        {title:"독서록 제출하기", datail:"권장도서 읽고 독서록 쓰기"},
        {title:"사물함 청소하기", datail:"월요일에 사물함 검사 있음"},
    ]);


    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    
        
    

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >

<Box p={3}>
             <List dense={true} >
                    {data.slice(0,3).map((item,i) => (
                        <div className="col-12 col-xl-12 col-md-12" key={i}> 
                            <h4 className="small">{item.title}<span className="float-right">60%</span></h4>
                            <div className="progress mb-4">
                            <div className="progress-bar" role="progressbar" style={{width: "60%"}} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div></div>
                            </div>))}  
                                                    
             </List>
             </Box>

          </div>
        );
      }

    return (

        <div>
             <div className="row justify-content-center ">
                                <div className="col-xl-12 col-md-12 ">
                                <div className=" h-100 py-2">
                                                    <div className="row no-gutters align-items-center">
                                          
                                            <div className="col mx-4">
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">국회의사당</div>
                                            </div>
                                            <div className="col-auto">


                                                <span className=" font-weight-bold text-gray-500 d-none d-sm-inline mx-2"> 2건</span>

                                                <ErrorIcon className="text-danger"/>
                                        </div>
                                        </div>

                                            <div className="py-2"></div>          
                    
                    <div className="row justify-content-center">
                    <div className="col-xl-10 col-md-10  ">

                        <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        centered>
                
                        <Tab label="법률 제안" />
                        <Tab label="안건 투표" />

                        </Tabs>

                        
                        <TabPanel value={value} index={0}> </TabPanel>
                        <TabPanel value={value} index={1}></TabPanel>
</div></div>

   
                        <hr className=""/>
    </div>
</div>

                </div>
                           
      </div>

    )


}
        
        

export default CongressPanel;
