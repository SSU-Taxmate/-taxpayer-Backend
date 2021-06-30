import React, { useEffect, useState } from 'react'
import TableTheme from '../../../../components/Table/TableTheme'
import axios from 'axios';
import Sidebar from '../../../../components/Navigation/Sidebar'
import Topbar from '../../../../components/Navigation/Topbar';
import Footer from '../../../../components/Footer'
import LogoutModal from '../../../../components/Modal/Logout'
import PageHeading from '../../../../components/PageHeading';
import ScrollToTop from '../../../../components/Scroll';
import MaterialTable from 'material-table';
import {editLocal} from '../../../../components/Table/SetUp'
const SettingHw = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [homework, sethomework] = useState([])
    const [err, setIsError] = useState(false);

    const [hwtype, sethwtype] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                /* const result = await axios.get('/api/classes/:classId/homeworks');
                 sethomework(result.data.data);
                 setColumns(result.data.columns)
                 */
                const hwtype = await axios.get('/api/classes/:classId/homeworks/types');
                sethwtype(hwtype.data.data)
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
                                    {isLoading ?
                                        <div>loading</div> : (
                                            <TableTheme
                                                title='숙제부여'
                                                columns={[
                                                    { title: '타입id', field: '_id' },
                                                    { title: "이름", field: "name" },
                                                    { title: '최초생성날짜', field: 'date' },
                                                    { title: '만료일', field: "expDate" },
                                                    { title: '자세한내용', field: 'detail' },
                                                    { title: 'student_id', field: 'student_id' },
                                                    { title: 'coupon_id', field: 'coupon_id' },
                                                ]}
                                                data={homework}
                                                options={{
                                                    sorting: true, exportButton: true,
                                                    grouping: true,
                                                }}
                                            />)}
                                </div>
                                <div className="card shadow mb-4">

                                    {isLoading ?
                                        <div>loading</div> : (
                                            <TableTheme>
                                                <MaterialTable
                                                    title='종류관리(자주 사용하는 과제)'
                                                    columns={[{ title: '타입', field: "type" }, { title: "자세한내용", field: "detail" }]}
                                                    data={hwtype}

                                                    //editable
                                                    editable={{
                                                        onRowAdd: newData =>
                                                            new Promise((resolve, reject) => {
                                                                //console.log(newData)
                                                                setTimeout(() => {
                                                                    sethwtype([...hwtype, newData]);
                                                                    axios.post('/api/classes/:classId/homeworks/types', newData)
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
                                                                    const dataUpdate = [...hwtype];
                                                                    const index = oldData.tableData.id;
                                                                    dataUpdate[index] = newData;
                                                                    sethwtype([...dataUpdate]);
                                                                    console.log(newData)
                                                                    axios.put('/api/classes/:classId/homeworks/types',newData)
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
                                                                    const dataDelete = [...hwtype];
                                                                    const index = oldData.tableData.id;
                                                                    dataDelete.splice(index, 1);
                                                                    sethwtype([...dataDelete]);
                                                                    
                                                                    axios.delete('/api/classes/:classId/homeworks/types', { data:oldData})
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
                                                    // other props
                                                    localization={editLocal}
                                                />
                                            </TableTheme>

                                        )}
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
            <LogoutModal />
        </div>

    )
}

export default SettingHw
