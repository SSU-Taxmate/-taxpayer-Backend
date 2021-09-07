import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import axios from 'axios';
import TaxBalance from './TaxBalance';
import TaxMonth from './TaxMonth';

function BankPanel() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    let classData = useSelector(state => state.classInfo.classData);

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const result = await axios.get(`/api/budget`, { params: { classId: classData.classId } })
                console.log(result.data)
            } catch (error) {
                setIsError(true);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [classData.classId])
    return (

        <div>
            <TaxBalance />

            <hr className="m-0" />

            <TaxMonth/>

        </div>

    )


}



export default BankPanel;
