import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CardDefault from '../../../../components/Cards/Default';
import { useSelector } from "react-redux";
import Loading from '../../../../components/Loading';

function ChooseStockPanel() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [stocks, setstocks] = useState([]);
    let classData = useSelector(state => state.classInfo.classData);

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const result = await axios.get(`/api/stocks/use`,{params:{classId:classData.classId}});
                console.log("/api/stocks/use", result.data);
                setstocks(result.data)
            } catch (error) {
                setIsError(true);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [classData])
    return (
        <div>
            <h6>클래스 주식</h6>
            {isLoading ?
                <Loading/> :
                stocks.map((stock, i) =>
                    <CardDefault key={i} title={stock.stockName}>
                        {stock.description}
                    </CardDefault>)

            }
            


        </div>
    )
}

export default ChooseStockPanel
