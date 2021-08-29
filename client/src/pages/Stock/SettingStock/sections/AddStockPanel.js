import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from "react-redux";
import moment from 'moment-timezone';

function AddStockPanel() {
    const [stockName, setstockName] = useState('')
    const [stockDescription, setstockDescription] = useState('')
    const [stockInit, setstockInit] = useState(0)
    const [stockHint,setstockHint]=useState("")
    let classData = useSelector(state => state.classInfo.classData);

    const handleStockName = (e) => {
        setstockName(e.target.value)
    }

    const handleStockDetail = (e) => {
        setstockDescription(e.target.value)
    }
    const handleStockInit = (e) => {
        setstockInit(Number(e.target.value))
    }
    const handleStockHint=(e)=>{
        setstockHint(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const now = moment().format('YYYY-MM-DD')
        //console.log(now,moment(now).tz('Asia/Seoul').utc().format())
        //console.log(moment().tz('Asia/Seoul').startOf('day').utc().format())
        axios.post('/api/stocks',
            {stockInfo:{
                stockName: stockName,
                description: stockDescription,
                prices: [{ updateDate: moment().tz('Asia/Seoul').startOf('day').utc().format(), value: stockInit ,hint:stockHint}],
            },
            classId:classData.classId
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className='row'>

            <div className="col">
                <form onSubmit={handleSubmit}>
                    <div className="form-group row">
                        <label htmlFor="inputstockname" className="col-sm-2 col-form-label">주식명</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputstockname" placeholder="주식명" onChange={handleStockName} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="inputstockinfo" className="col-sm-2 col-form-label">주식설명</label>
                        <div className="col-sm-10">
                            <textarea className="form-control" id="inputstockinfo" placeholder="주식설명" onChange={handleStockDetail} rows="3" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="inputstockinit" className="col-sm-2 col-form-label">초기값</label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control" id="inputstockinit" placeholder="초기값" onChange={handleStockInit} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="inputhint" className="col-sm-2 col-form-label">힌트</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputhint" placeholder="힌트" onChange={handleStockHint} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col">
                            <button type="submit" className="btn btn-primary float-right">추가</button>
                        </div>
                    </div>
                </form>

            </div>
        </div>

    )
}

export default AddStockPanel
