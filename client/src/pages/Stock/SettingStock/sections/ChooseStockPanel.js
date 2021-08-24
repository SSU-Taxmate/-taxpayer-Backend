import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CardDefault from '../../../../components/Cards/Default';
import { useSelector } from "react-redux";
import Loading from '../../../../components/Loading';
import DeleteStockDialog from './DeleteStockDialog';

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
                const result = await axios.get(`/api/stocks/manage`,{params:{classId:classData.classId}});
                console.log("/api/stocks/manage", result.data);
                setstocks(result.data)
            } catch (error) {
                setIsError(true);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [classData.classId])
    return (
        <div>
            <h6>클래스 주식</h6>
            {isLoading ?
                <Loading/> :
                stocks.map((stock, i) =>
                <div key={i}>
                    <CardDefault key={i} title={stock.stockName}>
                        {stock.description}
                    </CardDefault>
                    <DeleteStockDialog stockId={stock._id}/>
                </div>)

            }
            


        </div>
    )
}

export default ChooseStockPanel
