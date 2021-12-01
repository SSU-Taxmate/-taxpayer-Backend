import React, { useState, useEffect } from 'react'
import PageHeading from '../../../components/PageHeading';
import { useSelector } from "react-redux";
import InvestStatus from './sections/InvestStatus'
import axios from 'axios';
import Error from '../../../components/Error';
import Loading from '../../../components/Loading'
import MyInvest from './sections/MyInvest'
import ByStudentStock from './sections/ByStudentStock';
import PageFrame from '../../PageFrame';
function AccountStock() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const joinedUser = useSelector(state => state.classUser);
    const user = useSelector((state) => state.user);
    let classData = useSelector(state => state.classInfo.classData);

    const [stocks, setstocks] = useState()

    const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);
        try {
            const result = await axios.get(`/api/students/${joinedUser.classUser}/stocks`, { params: { classId: classData.classId } })
            setstocks(result.data)
            console.log('stock/accountstock/index.js', result.data)
        } catch (error) {
            setIsError(true);
        }
        setIsLoading(false);
    };
    useEffect(() => {
        fetchData();
    }, [joinedUser.classUser, classData.classId])

    return (
        <PageFrame>
            <PageHeading title="투자 현황" />
            {/* <!-- Content Row --> */}
            {user.userData &&
                <h4 className='pt-2'>{user.userData.name}님의 투자 현황</h4>}
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }} className="account-card shadow bg-white">
                {stocks && <InvestStatus data={stocks} />}
                <ByStudentStock />
            </div>
            <h4 className='pt-2'>보유 주식</h4>
            {isError && <Error></Error>}
            {isLoading ? <Loading /> :
                <div className='row flex-row flex-nowrap overflow-auto'>
                    {stocks && stocks.map((item, i) => (
                        <MyInvest
                            key={i}
                            data={item}
                        />
                    ))}
                </div>}
        </PageFrame>
    )

}

export default AccountStock
