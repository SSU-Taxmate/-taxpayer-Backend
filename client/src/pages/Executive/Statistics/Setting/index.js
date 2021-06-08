import React, { useEffect, useState } from 'react'
import EditableTable from '../../../../components/Table/Editable'
import axios from 'axios';
import Sidebar from '../../../../components/Navigation/Sidebar'
import Topbar from '../../../../components/Navigation/Topbar';
import Footer from '../../../../components/Footer'
import LogoutModal from '../../../../components/Modal/Logout'
import PageHeading from '../../../../components/PageHeading';
import ScrollToTop from '../../../../components/Scroll';
const SettingHw = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [columns, setColumns] = useState([])
    const [data, setData] = useState([])
    const [err, setIsError] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const result = await axios.get('/api/stats/nation');
                setData(result.data['data']);
                setColumns(result.data['columns'])
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

                                    {isLoading ?
                                        <div>loading</div> : (
                                            <EditableTable
                                                title='숙제부여'
                                                columns={columns[1]}
                                                data={data[1]}
                                                options={{
                                                    sorting: true, exportButton: true,
                                                    grouping: true,
                                                }}
                                            />)}
                                </div>
                                <div className="card shadow mb-4">

                                    {isLoading ?
                                        <div>loading</div> : (
                                            <EditableTable
                                                title='종류관리(자주 사용하는 과제)'
                                                columns={columns[2]}
                                                data={data[2]} />)}
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
