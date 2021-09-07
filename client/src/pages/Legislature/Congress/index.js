import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import PageHeading from '../../../components/PageHeading';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import TabPanel from './components/TabPanel'
import PageFrame from '../../PageFrame';
import axios from 'axios'

function Congress() {
    let classData = useSelector(state => state.classInfo.classData);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    // Tab 선택
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [suggestData, setsuggestData] = useState([])
    const [billData, setbillData] = useState([])


    //state : 법률제안:suggest-law , suggest-vote
    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                // 기존의 예금 상품 불러오기
                const result = await axios.get(`/api/congress`, { params: { classId: classData.classId } })
                console.log(result.data)
                setsuggestData(result.data.filter((v) => v.state === "suggest-law"))
                setbillData(result.data.filter((v) => v.state === "suggest-vote"))
            } catch (error) {
                setIsError(true);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [classData.classId])
    return (
        <PageFrame>
            <PageHeading title="국회(입법)"></PageHeading>
            {/* <!-- Content Row --> */}
            <div className="row justify-content-center">
                <div className="col-12">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        centered>

                        <Tab label="법률 제안" />
                        <Tab label="안건 투표" />

                    </Tabs>

                    <div className="row justify-content-center">
                        <TabPanel className="col-lg-8" value={value} data={suggestData} index={0}></TabPanel>
                        <TabPanel className="col-lg-8" value={value} data={billData} index={1}></TabPanel>
                    </div>
                </div>

            </div>

        </PageFrame>
    )
}

export default Congress
