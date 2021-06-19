import React, { useState } from 'react'
import ChartLine from '../../../../components/Charts/Line'
import ChartDonut from '../../../../components/Charts/Donut';
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
        <div className='row row-sm-auto'>
            <div className="col-7">
                <ChartLine id='stock' title={chart} data={data} />

            </div>
            <div className="col-5">
                < select
                    onChange={e => handleAddrTypeChange(e)}>
                    {
                        stock.map((address, i) => <option key={i} value={i}>{address}</option>)
                    }
                </select >
                <div className="h2 font-weight-bold text-gray-800">
                    현재가 : {data.datasets[0].data[0]}
                </div>
      
                <button className="btn btn-outline-primary btn-sm float-right mr-2">매도</button>
                <button className="btn btn-outline-danger btn-sm float-right mr-2">매수</button>
            </div>


        </div>
    )
}
