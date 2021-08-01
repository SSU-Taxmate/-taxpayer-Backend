import React, { useEffect, useState } from 'react'
import TableTheme from '../../../../components/Table/TableTheme'
import axios from 'axios';
import Sidebar from '../../../../components/Navigation/Sidebar'
import Topbar from '../../../../components/Navigation/Topbar';
import Footer from '../../../../components/Footer'
import PageHeading from '../../../../components/PageHeading';
import ScrollToTop from '../../../../components/Scroll';
import MaterialTable from 'material-table';
import { editLocal } from '../../../../components/Table/SetUp'
import ManageDialog from './ManageDialog';
import Error from '../../../../components/Error';
const SettingHw = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [homework, sethomework] = useState([])
    const [isError, setIsError] = useState(false);

    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState();
    const handleClickOpen = (selectedData) => {
        setSelectedValue(selectedData)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedValue();
    };
    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const result = await axios.get('/api/classes/:classId/homeworks');
                sethomework(result.data.data);

            } catch (error) {
                setIsError(true);

            }
            setIsLoading(false);

        };

        fetchData();
    }, []);
    return (
        <div>
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
                            <PageHeading title="숙제 관리" />
                            {/* <!-- Content Row --> */}

                            <div className="col">
                                <div className="card shadow mb-4">
                                    {/*columns은 기본으로 줘야할듯 */}
                                    {isError && <Error></Error>}
                                    {isLoading ?
                                        <div>loading</div> : (
                                            <>
                                                <TableTheme>
                                                    <MaterialTable
                                                        title='숙제등록'
                                                        columns={[
                                                            { title: "숙제이름", field: "name", type: 'string' },
                                                            { title: '자세한내용', field: 'detail', type: 'string' },
                                                            { title: '최초생성날짜', field: 'date', type: 'date' },
                                                            { title: '만료일', field: "expDate", type: 'date' },

                                                            /*
                                                            { title: 'student_id', field: 'student_id',type:'String' },
                                                            { title: 'coupon_id', field: 'coupon_id',type:'String' },*/
                                                        ]}
                                                        data={homework}
                                                        actions={[
                                                            {
                                                                icon: 'checklist',
                                                                tooltip: 'Save User',
                                                                onClick: (event, rowData) => handleClickOpen(rowData)
                                                            }]}
                                                        options={{
                                                            sorting: true, exportButton: true,
                                                            grouping: true,
                                                        }}
                                                        //editable
                                                        editable={{
                                                            onRowAdd: newData =>
                                                                new Promise((resolve, reject) => {
                                                                    //console.log(newData)
                                                                    setTimeout(() => {
                                                                        sethomework([...homework, newData]);
                                                                        //console.log('newdata!!!!!!!',newData.type)
                                                                        axios.post('/api/classes/:classId/homeworks', newData)
                                                                            .then(function (response) {
                                                                                console.log(response);
                                                                            })
                                                                            .catch(function (error) {
                                                                                console.log(error);
                                                                            });
                                                                        resolve();
                                                                    }, 1000)
                                                                }),
                                                            onRowUpdate: (newData, oldData) =>
                                                                new Promise((resolve, reject) => {
                                                                    //console.log(newData,oldData)
                                                                    setTimeout(() => {
                                                                        const dataUpdate = [...homework];
                                                                        const index = oldData.tableData.id;
                                                                        dataUpdate[index] = newData;
                                                                        sethomework([...dataUpdate]);
                                                                        console.log('새로운 데이터', newData)
                                                                        axios.put('/api/classes/:classId/homeworks', newData)
                                                                            .then(function (response) {
                                                                                console.log(response);
                                                                            })
                                                                            .catch(function (error) {
                                                                                console.log(error);
                                                                            });
                                                                        resolve();
                                                                    }, 1000)
                                                                }),
                                                            onRowDelete: oldData =>
                                                                new Promise((resolve, reject) => {
                                                                    setTimeout(() => {
                                                                        //이 부분에 함수를 만들자!
                                                                        const dataDelete = [...homework];
                                                                        const index = oldData.tableData.id;
                                                                        dataDelete.splice(index, 1);
                                                                        sethomework([...dataDelete]);

                                                                        axios.delete('/api/classes/:classId/homeworks', { data: oldData })
                                                                            .then(function (response) {
                                                                                console.log(response);
                                                                            })
                                                                            .catch(function (error) {
                                                                                console.log(error);
                                                                            });
                                                                        resolve();
                                                                    }, 1000)
                                                                }),
                                                        }}
                                                        localization={editLocal}
                                                    ></MaterialTable>
                                                </TableTheme>
                                                {selectedValue &&
                                                    <ManageDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
                                                }
                                            </>)}
                                </div>





                            </div>
                        </div>
                        {/* <!-- /.container-fluid --> */}

                    </div>
                    {/* <!-- End of Main Content --> */}

                    {/* <!-- Footer --> */}
                    <Footer></Footer>
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

export default SettingHw
