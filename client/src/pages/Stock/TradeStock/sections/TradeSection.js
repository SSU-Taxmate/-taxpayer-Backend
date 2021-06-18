import React,{useState} from 'react'
import ChartLine from '../../../../components/Charts/Line'
export default function TradeSection() {
    const [stock, setStock] = useState(["kospi", "kosdaq", "dddd"])
    const [chart,setChart]=useState('kospi')
    const handleAddrTypeChange = (e) => {
       // console.log(e.target.value)
        console.log(stock[e.target.value])
        setChart(stock[e.target.value])
    }//(setStock[e.target.value])
   
    return (
        <div className='row'>
            <div className="col-6">
                <ChartLine title={chart}/>
            </div>
            <div className="col-6">
                < select
                    onChange={e => handleAddrTypeChange(e)}>
                    {
                        stock.map((address, i) => <option key={i} value={i}>{address}</option>)
                    }
                </select >

            </div>

        </div>
    )
}
