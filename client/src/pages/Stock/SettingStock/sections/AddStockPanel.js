import React, { useState, useEffect } from 'react'
import axios from 'axios'

function AddStockPanel() {
    const [stockName, setstockName] = useState('')
    const [stockDescription, setstockDescription] = useState('')
    const [stockInit, setstockInit] = useState(0)

    const [stocks, setstocks] = useState()
    const handleStockName = (e) => {
        //e.preventDefault()
        setstockName(e.target.value)
    }

    const handleStockDetail = (e) => {
        setstockDescription(e.target.value)
    }
    const handleStockInit = (e) => {
        setstockInit(Number(e.target.value))
    }
    const handleSubmit = (e) => {
        const now = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString()
        axios.post('/api/stocks',
            {
                stockName: stockName,
                description: stockDescription,
                prices: [{ updateDate: now, value: stockInit }]
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
                        <div className="col">
                            <div>추가 버튼 클릭시 사용가능한 주식에 추가됨
                            </div>
                            <div>
                                사용 가능한 주식은 받아오는 데이터 + 직접 생성한 주식
                            </div>
                            <hr />
                            <button type="submit" className="btn btn-primary float-right">추가</button>
                        </div>
                    </div>
                </form>

            </div>
        </div>

    )
}

export default AddStockPanel
