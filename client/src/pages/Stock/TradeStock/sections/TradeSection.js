import React, { useState } from 'react'
import ChartLine from '../../../../components/Charts/Line'
import InputAmount from './InputAmount';
function TradeSection(props) {
    const { stocks } = props;
    const [selectedValue, setSelectedValue] = useState()
    const hadleStockChange = (e) => {
        e.preventDefault()
        setSelectedValue(stocks[stocks.findIndex(i => i._id == e.target.value)])
    }
    const adjustData = (data) => {
        return {
            labels: data.map((n, i) => { return n['updateDate'].split('T')[0] }),
            datasets: [{
                label: '주가',
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
                data: data.map((n, i) => { return n['value'] })
            }]
        }
    }


    return (
        <div className='row'>
            <div className="col-sm-6 m-2">
                {selectedValue &&
                    <ChartLine id='stock' title={selectedValue.stockName} data={adjustData(selectedValue.prices)} />
                }
            </div>
            <div className="col-sm-5 m-2">
                {stocks ?
                    < select
                        id="trade-select"
                        className="form-control"
                        onChange={e => hadleStockChange(e)}
                        defaultValue="">
                        <option value="" disabled>선택해주세요</option>
                        {
                            stocks.map((stock, i) => <option key={stock._id} value={stock._id}>{stock.stockName}</option>)
                        }
                    </select >
                    :
                    <select className='form-control'></select>
                }
                <div className="h2 mt-2 font-weight-bold text-gray-800">
                    현재가 : {selectedValue ? selectedValue['prices'][selectedValue['prices'].length - 1].value : ''}
                </div>
                {selectedValue&&<InputAmount selectedValue={selectedValue} />}
            </div>
        </div>
    )
}
export default React.memo(TradeSection)