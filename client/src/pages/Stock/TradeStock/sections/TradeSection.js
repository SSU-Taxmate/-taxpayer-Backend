import React, { useState } from 'react'
import ChartLine from '../../../../components/Charts/Line'
export default function TradeSection() {
    const testdata =
    {
        'kospi': {
            labels: ["Mar", "Apr", "May", "Jun", "Jul", "Sep", "Oct", "Nov", "Dec"],
            datasets: [{
                label: "Earnings",
                lineTension: 0.3,
                backgroundColor: "rgba(78, 115, 223, 0.05)",
                borderColor: "rgba(78, 115, 223, 1)",
                pointRadius: 3,
                pointBackgroundColor: "rgba(78, 115, 223, 1)",
                pointBorderColor: "rgba(78, 115, 223, 1)",
                pointHoverRadius: 3,
                pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
                pointHoverBorderColor: "rgba(78, 115, 223, 1)",
                pointHitRadius: 10,
                pointBorderWidth: 2,
                data: [0, 10000, 5000, 15000, 10000, 30000, 25000, 40000],
            }],
        },
        'kosdaq': {
            labels: ["Mar", "Apr", "May", "Jun", "Jul", "Sep", "Oct", "Nov", "Dec"],
            datasets: [{
                label: "Earnings",
                lineTension: 0.3,
                backgroundColor: "rgba(78, 115, 223, 0.05)",
                borderColor: "rgba(78, 115, 223, 1)",
                pointRadius: 3,
                pointBackgroundColor: "rgba(78, 115, 223, 1)",
                pointBorderColor: "rgba(78, 115, 223, 1)",
                pointHoverRadius: 3,
                pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
                pointHoverBorderColor: "rgba(78, 115, 223, 1)",
                pointHitRadius: 10,
                pointBorderWidth: 2,
                data: [50000, 4000, 3, 0, 30000, 25000, 40000],
            }],
        }
    };
    const [stock, setStock] = useState(["kospi", "kosdaq"])//사용하는 주식 리스트를 받아와야함
    const [chart, setChart] = useState('kospi')
    const [data, setData] = useState(testdata['kospi'])
    const handleAddrTypeChange = (e) => {
        setChart(stock[e.target.value])
        setData(testdata[stock[e.target.value]])
    }//(setStock[e.target.value])

    return (
        <div className='row'>
            <div className="col-sm-6 m-2">
                <ChartLine id='stock' title={chart} data={data} />
            </div>
            <div className="col-sm-5 m-2">
                < select
                    onChange={e => handleAddrTypeChange(e)}>
                    {
                        stock.map((address, i) => <option key={i} value={i}>{address}</option>)
                    }
                </select >
                <div className="h2 mt-2 font-weight-bold text-gray-800">
                    현재가 : {data.datasets[0].data[0]}
                </div>
                <div className='h5 float-right'>보유 : 3주</div>

                <div className='row-sm-*'>
                    <div className="input-group">
                        <input type="number" readOnly className="form-control" id="tradeShare" placeholder="현재가" min="0" max="100" step="1" />
                        <div className="input-group-append"><span className="input-group-text outline-none">X</span></div>
                        <input type="number" className="form-control" id="tradeShare" placeholder="'판매/구입' 할" min="0" max="100" step="1" />
                        <div className="input-group-append"><span className="input-group-text">주</span></div>
                    </div>
                </div>
                <div className='row-sm-* mt-2'>
                    <div className="input-group">
                        <div className="input-group-prepend"><span className="input-group-text">=</span></div>
                        <input type="number" readOnly className="form-control" id="tradeShare" placeholder="총 금액" min="0" max="100" step="1" />
                    </div>
                </div>

                <div className='row-sm-* mt-2'>
                    <button className="btn btn-outline-danger btn-sm float-right m-2 col-*">매수</button>
                    <button className="btn btn-outline-primary btn-sm float-right m-2 col-*">매도</button>

                </div>
            </div>


        </div>
    )
}
