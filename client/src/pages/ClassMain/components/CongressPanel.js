import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import Error from '../../../components/Error';
import Loading from '../../../components/Loading';
import List from '@material-ui/core/List';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import ErrorIcon from '@material-ui/icons/Error';




function CongressPanel() {
  let classData = useSelector(state => state.classInfo.classData);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [data, setData] = useState();
const [numofstudent, setnumofstudent] = useState()

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };





  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const lawstate = { 0: 'suggest-law', 1: 'suggest-vote' }
    const quorum = 10;

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
            {data && data.filter((v) => v.state === lawstate[value]).slice(0, 3).map((item, i) => (
              <div className="col-12 col-xl-12 col-md-12" key={i}>
                <h4 className="small">{item.title}
                  <span className="float-right">
                    {value === 0 ? Math.round((item.numvoter / quorum) * 100) : Math.round(item.numvoter/numofstudent*100)}%
                  </span></h4>{/*동의율 , 투표율*/}
                <div className="progress mb-4">
                  <div className="progress-bar" role="progressbar"
                    style={{ width: `${value === 0 ? Math.round((item.numvoter / quorum) * 100) :  Math.round(item.numvoter/numofstudent*100)}%` }}
                    aria-valuenow={value === 0 ? Math.round((item.numvoter / quorum) * 100) :  Math.round(item.numvoter/numofstudent*100)}
                    aria-valuemin="0" aria-valuemax="100">
                  </div>
                </div>
              </div>))}

          </List>
        </Box>

      </div>
    );
  }



  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios.get(`/api/congress`, { params: { classId: classData.classId } })
        setnumofstudent(result.data.studentnum)
        setData(result.data.lawsuggest)//Alert로 사용자에게 보여주기
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [])

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


                {data && <span className=" font-weight-bold text-gray-500 d-none d-sm-inline mx-2"> {data.length}건</span>}

                <ErrorIcon className="text-danger" />
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


            <hr className="" />
          </div>
        </div>

      </div>

    </div>

  )


}



export default CongressPanel;
