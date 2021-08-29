import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
function InfoBalance() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [balance, setbalance] = useState()
    const joinedUser = useSelector(state => state.classUser);
    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const result = await axios.get(`/api/students/${joinedUser.classUser}/account`);
                setbalance(result.data.currentBalance)
                console.log(result.data)
            } catch (error) {
                setIsError(true);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [joinedUser.classUser])
    return (
        <div className='border-left pl-3' 
        style={{display:'flex',flexDirection:'column',justifyContent:'space-around'}}>
            <h5>투자 가능 금액</h5>
            <h5>{balance}  <sub>미소</sub></h5>
        </div>
    )
}

export default InfoBalance
