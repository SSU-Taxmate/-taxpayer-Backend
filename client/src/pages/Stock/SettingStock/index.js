import React from 'react'
import Topbar from '../../../components/Navigation/Topbar';
import Footer from '../../../components/Footer'
import PageHeading from '../../../components/PageHeading';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './sections/TabPanel'
import AddValuePanel from './sections/AddValuePanel';
import ChooseStockPanel from './sections/ChooseStockPanel';
import { Box } from '@material-ui/core';

export default function SettingStock() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  return (
    <div>
      {/* <!-- Page Wrapper --> */}
      <div id="wrapper">

        {/* <!-- Content Wrapper --> */}
        <div id="content-wrapper" className="d-flex flex-column">

          {/* <!-- Main Content --> */}
          <div id="content" style={{'minHeight':'85vh'}}>

            {/* <!-- Topbar --> */}
            <Topbar />
            {/* <!-- End of Topbar --> */}

            {/* <!-- Begin Page Content --> */}
            <div className="container-fluid">

              {/* <!-- Page Heading --> */}

              <PageHeading title="주식설정" />

              {/* <!-- Content Row --> */}
              <div>
                <Box position="static">
                  <Tabs value={value} onChange={handleChange} aria-label="주식설정" centered>
                    <Tab label="매일 값 입력" {...a11yProps(0)} />
                    <Tab label="클래스 이용 주식 설정" {...a11yProps(1)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <AddValuePanel/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <ChooseStockPanel/>
                </TabPanel>
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
    </div>

  )
}
