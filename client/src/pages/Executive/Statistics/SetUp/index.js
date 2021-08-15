import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Topbar from '../../../../components/Navigation/Topbar';
import Footer from '../../../../components/Footer'
import PageHeading from '../../../../components/PageHeading';
import ScrollToTop from '../../../../components/Scroll';

import Error from '../../../../components/Error';
import { useSelector } from "react-redux";
import { DataGrid } from '@material-ui/data-grid';

export default function SettingHw() {
    const [isLoading, setIsLoading] = useState(false)
    const [homework, sethomework] = useState([])
    const [isError, setIsError] = useState(false);
    let classData = useSelector(state => state.classInfo.classData);
    const column=[{field:'name',headerName:'숙제명', width: 150},{field:'detail',headerName:'설명', width: 150},{field:'withDeadline',headerName:'마감전', width: 150}];
    //console.log(classData)
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
                const result = await axios.get('/api/homeworks', { params: { classId: classData.classId } });
                const temp=result.data
                
                for (let i=0;i<result.data.length;i++){
                    temp[i].id=temp[i]._id
                }
                //console.log(temp)
                sethomework(result.data);
            } catch (error) {
                setIsError(true);

            }
            setIsLoading(false);

        };

        fetchData();
    }, [classData]);
    return (
        <div>
            {/* <!-- Page Wrapper --> */}
            <div id="wrapper">

                {/* <!-- Sidebar --> */}
                 
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
                                                <div style={{ height: 400, width: '100%' }}>
                                                    <DataGrid
                                                        rows={homework}
                                                        columns={column}
                                                        pageSize={5}
                                                        checkboxSelection
                                                        disableSelectionOnClick
                                                    />
                                                </div>
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

