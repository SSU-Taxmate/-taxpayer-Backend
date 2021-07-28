import React, { useState, useEffect } from 'react';

import Sidebar from '../../../components/Navigation/Sidebar';
import Topbar from '../../../components/Navigation/Topbar';
import Footer from '../../../components/Footer'
import PageHeading from '../../../components/PageHeading';
import ScrollToTop from '../../../components/Scroll'
import MaterialTable from 'material-table';
import TableTheme from '../../../components/Table/TableTheme'
import axios from 'axios'
import { editLocal } from '../../../components/Table/SetUp';
function ClassSetting() {
  const [isLoading, setIsLoading] = useState(false)
  const [columns, setColumns] = useState([])
  const [data, setData] = useState([])
  const [err, setIsError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios.get('/api/setting/class');
        setData(result.data['data'])
        setColumns(result.data['columns'])
      } catch (error) {
        setIsError(true);

      }
      setIsLoading(false);

    };
    fetchData();

  }, []);
  return (
    <>
      {/* <!-- Page Wrapper --> */}
      <div id="wrapper">

        {/* <!-- Sidebar --> */}
        <Sidebar />
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

              <PageHeading title="클래스 세팅" />

              {/* <!-- Content Row --> */}
              {isLoading ?
                <div>loading</div> : (
                  <TableTheme>
                    <MaterialTable
                      title='직업관리'
                      columns={columns[0]}
                      data={data[0]}
                      actions={[
                        {
                          icon: 'checklist',
                          tooltip: 'Save User',
                        }]}
                      options={{
                        sorting: true, exportButton: true,
                        grouping: true,
                      }}
                      //editable
                      editable={{
                        onRowAdd: newData =>
                          new Promise((resolve, reject) => {
                            setTimeout(() => {
                              resolve();
                            }, 1000)
                          }),
                        onRowUpdate: (newData, oldData) =>
                          new Promise((resolve, reject) => {
                            setTimeout(() => {
                              resolve();
                            }, 1000)
                          }),
                        onRowDelete: oldData =>
                          new Promise((resolve, reject) => {
                            setTimeout(() => {
                             
                              resolve();
                            }, 1000)
                          }),
                      }}
                      localization={editLocal}
                    ></MaterialTable>
                  </TableTheme>
                )}

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
    </>

  )
}

export default ClassSetting
