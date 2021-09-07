import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
function InfoBalance() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [balance, setbalance] = useState()
    const joinedUser = useSelector(state => state.classUser);
    let user = useSelector((state) => state.user);

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                if (user.userData.role === 1) {
                    const result = await axios.get(`/api/students/${joinedUser.classUser}/account`);
                    setbalance(result.data.currentBalance)
                }
                
            } catch (error) {
                setIsError(true);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [joinedUser.classUser])
    return (
        <>
            {balance&&<div className='border-left pl-3'
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                <h5>투자 가능 금액</h5>
                <h5>{balance}  <sub>미소</sub></h5>
            </div>
            }
        </>
    )
}

export default InfoBalance
