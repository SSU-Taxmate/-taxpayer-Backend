import React, { useEffect, useState } from 'react'
import TableTheme from '../../../../components/Table/TableTheme'
import axios from 'axios';
import Sidebar from '../../../../components/Navigation/Sidebar'
import Topbar from '../../../../components/Navigation/Topbar';
import Footer from '../../../../components/Footer'
import LogoutModal from '../../../../components/Modal/Logout'
import PageHeading from '../../../../components/PageHeading';
import ScrollToTop from '../../../../components/Scroll';
import MaterialTable,{MTableEditField} from 'material-table';
import {editLocal} from '../../../../components/Table/SetUp'

const SettingHw = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [homework, sethomework] = useState([])
    const [isError, setIsError] = useState(false);
    const [hwtype, sethwtype] = useState([]);
    const formatData=(data)=>{
        let result={};
        data.map((col)=>{
            //console.log(col)
            result[col._id]=col.typeName
        })
        console.log('format:',result)
        return result
    }
    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                 const result = await axios.get('/api/classes/:classId/homeworks');
                 sethomework(result.data.data);
                 
                const result2 = await axios.get('/api/classes/:classId/homeworks/types');
                sethwtype(result2.data.data)
    
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
                                    {isError && <div>Something went wrong ...</div>}
                                    {isLoading ?
                                        <div>loading</div> : (
                                            <TableTheme>
                                               <MaterialTable
                                                  title='숙제부여(숙제 등록시 모든 학생에게)'
                                                  columns={[
                                                        { title: '자주쓰는 타입', field: 'tester', type:'type',
                                                        editComponent:({onChange,onRowDataChange,...props})=>{
                                                            const ontypeChange=value=>{
                                                                const lookup=props.columnDef.lookup;
                                                                //console.log(lookup,value,lookup[value])
                                                                const matchingValue=hwtype.find(
                                                                    val=>val._id===value
                                                                )
                                                                //console.log('matching!!!!!!',matchingValue)
                                                                //ref할 내용 찾음.
                                                               //모든 부분이 화면에서 update되지만 실제로는 안되고 있음.
                                                               //이유 onrowDataChange는 다 바꿈
                                                                const oldData=props.rowData
                                                                oldData.tester=value
                                                                oldData.homeworkType=value
                                                                oldData.name=matchingValue.typeName
                                                                oldData.detail=matchingValue.detail
                                                                onRowDataChange(oldData)
                                                            }
                                                            return <MTableEditField  onChange={ontypeChange} {...props}></MTableEditField>
                                                        },
                                                        lookup:formatData(hwtype)},
                                                      { title: "숙제이름", field: "name" ,type:'String'},
                                                      { title: '자세한내용', field: 'detail',type:'String' },
                                                      { title: '최초생성날짜', field: 'date', type:'date' },
                                                      { title: '만료일', field: "expDate", type:'date' },
                                                      
                                                      /*
                                                      { title: 'student_id', field: 'student_id',type:'String' },
                                                      { title: 'coupon_id', field: 'coupon_id',type:'String' },*/
                                                  ]}
                                                  data={homework}
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
                                                                console.log('새로운 데이터',newData)
                                                                axios.put('/api/classes/:classId/homeworks',newData)
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
                                                                
                                                                axios.delete('/api/classes/:classId/homeworks', { data:oldData})
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
                                           </TableTheme>)}
                                </div>
                                <div className="card shadow mb-4">
                                    {isLoading ?
                                        <div>loading</div> : (
                                            <TableTheme>
                                                <MaterialTable
                                                    title='종류관리(자주 사용하는 과제)'
                                                    columns={[{ title: '타입', field: "typeName" }, { title: "자세한내용", field: "detail" }]}
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
