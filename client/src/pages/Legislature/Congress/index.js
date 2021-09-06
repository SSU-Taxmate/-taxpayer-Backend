import React ,{useState}from 'react'
//Navigation
import Sidebar from '../../../components/Navigation/Sidebar';
import Topbar from '../../../components/Navigation/Topbar';
import PageHeading from '../../../components/PageHeading';
import ScrollToTop from '../../../components/Scroll';
import Footer from '../../../components/Footer'
import ProposalDialog from './ProposalDialog'

import { makeStyles  } from '@material-ui/core/styles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import TabPanel from './components/TabPanel'

function Congress() {
    
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };


    const suggestData=[
        {id:"0",title:"직업활동 세금 개정안직업활동 세금 개정안", student:"배미혜", ayes:4, detail:"세금이 너무 높습니다"},
        {id:"1",title:"직업활동 세금 개정안", student:"배미혜", ayes:4, detail:"세금이 너무 높습니다"},
        {id:"2",title:"직업활동 세금 개정안", student:"배미혜", ayes:4, detail:"세금이 너무 높습니다"},
        {id:"3",title:"직업활동 세금 개정안", student:"배미혜", ayes:4, detail:"세금이 너무 높습니다"},
        {id:"4",title:"직업활동 세금 개정안", student:"배미혜", ayes:4, detail:"세금이 너무 높습니다"}     

    ]

    const billData=[
        {id:"0",title:"직업활동 세금 개정안직업활동 세금 개정안", student:"", ayes:4,noes:5, detail:"세금이 너무 높습니다"},
    ]



    return (
        <div>
            {/* <!-- Page Wrapper --> */}
            <div id="wrapper">

                 
                 
                {/* <!-- End of Sidebar --> */}

                {/* <!-- Content Wrapper --> */}
                <div id="content-wrapper" className="d-flex flex-column">

                    {/* <!-- Main Content --> */}
                    <div id="content">

                        {/* <!-- Topbar --> */}
                        <Topbar />
                        {/* <!-- End of Topbar --> */}

                        {/* <!-- Begin Page Content --> */}
                        <div className="container-fluid">

                            {/* <!-- Page Heading --> */}

                            <PageHeading title="국회(입법)"></PageHeading>
                            {/* <h3>제안리스트</h3> */}
                            {/* <!-- Content Row --> */}
                            {/* <ProposalDialog/>
                            <Fab color="primary" aria-label="add"><AddIcon /></Fab> */}
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
                        <TabPanel  className="col-lg-8" value={value} data={billData} index={1}></TabPanel>
                        </div>
                        </div>

</div>

                        </div>
                        {/* <!-- /.container-fluid --> */}

                    </div>
                    {/* <!-- End of Main Content --> */}

                    {/* <!-- Footer --> */}
                    <Footer />
                    {/* <!-- End of Footer --> */}

                </div>
                {/* <!-- End of Content Wrapper --> */}

            </div>
            
            {/* <!-- End of Page Wrapper --> */}

            {/* <!-- Scroll to Top Button--> */}

            <ScrollToTop />
        </div>

    )
}

export default Congress
