import React, { useEffect, useState } from 'react'
import axios from 'axios';
import PageHeading from '../../../../components/PageHeading';

import Error from '../../../../components/Error';
import { useSelector } from "react-redux";
import { DataGrid } from '@material-ui/data-grid';
import Loading from '../../../../components/Loading';
import PageFrame from '../../../PageFrame';

export default function SettingHw() {
    const [isLoading, setIsLoading] = useState(false)
    const [homework, sethomework] = useState([])
    const [isError, setIsError] = useState(false);
    let classData = useSelector(state => state.classInfo.classData);
    const column = [{ field: 'name', headerName: '숙제명', width: 150 }, { field: 'detail', headerName: '설명', width: 150 }, { field: 'withDeadline', headerName: '마감전', width: 150 }];


    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const result = await axios.get('/api/homeworks', { params: { classId: classData.classId } });
                const temp = result.data

                for (let i = 0; i < result.data.length; i++) {
                    temp[i].id = temp[i]._id
                }
                sethomework(result.data);
            } catch (error) {
                setIsError(true);

            }
            setIsLoading(false);

        };

        fetchData();
    }, [classData]);
    return (
        <PageFrame>
            <PageHeading title="숙제 관리" />
            <div className="col">
                <div className="card shadow mb-4">
                    {/*columns은 기본으로 줘야할듯 */}
                    {isError && <Error></Error>}
                    {isLoading ?
                        <Loading /> : (
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
        </PageFrame>

    )
}

