import React from 'react'
//Navigation
import PageHeading from '../../../components/PageHeading';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import TabPanel from './components/TabPanel'
import PageFrame from '../../PageFrame';

function Congress() {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const suggestData = [
        { id: "0", title: "직업활동 세금 개정안직업활동 세금 개정안", student: "배미혜", ayes: 4, detail: "세금이 너무 높습니다" },
        { id: "1", title: "직업활동 세금 개정안", student: "배미혜", ayes: 4, detail: "세금이 너무 높습니다" },
        { id: "2", title: "직업활동 세금 개정안", student: "배미혜", ayes: 4, detail: "세금이 너무 높습니다" },
        { id: "3", title: "직업활동 세금 개정안", student: "배미혜", ayes: 4, detail: "세금이 너무 높습니다" },
        { id: "4", title: "직업활동 세금 개정안", student: "배미혜", ayes: 4, detail: "세금이 너무 높습니다" }

    ]

    const billData = [
        { id: "0", title: "직업활동 세금 개정안직업활동 세금 개정안", student: "", ayes: 4, noes: 5, detail: "세금이 너무 높습니다" },
    ]



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
