import React, { useState } from 'react'
import ChartLine from '../../../../components/Charts/Line'
import TradeDialog from './TradeDialog';
function TradeSection(props) {
    const { stocks } = props;
    const [selectedValue, setSelectedValue] = useState()
    const [quantity, setquantity] = useState(0)

    const hadleStockChange = (e) => {
        e.preventDefault()
        if (e.target.value === 'default') {
            setSelectedValue()
        } else {
            setSelectedValue(stocks[stocks.findIndex(i => i._id == e.target.value)])
        }
        // setData(testdata[stock[e.target.value]])
    }//(setStock[e.target.value])
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
    const handleQuantity = (e) => {
        e.preventDefault()
        setquantity(e.target.value)
    }

    return (
        <div className='row'>
            {console.log('tradesection')}
            <div className="col-sm-6 m-2">

                {selectedValue &&
                    <ChartLine id='stock' title={selectedValue.stockName} data={adjustData(selectedValue.prices)} />
                }
            </div>
            <div className="col-sm-5 m-2">
                {stocks ?
                    < select
                        className="form-control"
                        onChange={e => hadleStockChange(e)}>
                        <option key='default' value='default'>선택해주세요</option>
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
                <div className='row-sm-*'>
                    <div className="input-group">
                        {/*selectedValue에 따라 바뀌면 됨 */}
                        <input type="number" readOnly className="form-control" id="tradeValue" placeholder="현재가" min="0" max="100" step="1" value={selectedValue ? selectedValue['prices'][selectedValue['prices'].length - 1].value : ''} />
                        <div className="input-group-append"><span className="input-group-text outline-none">X</span></div>

                        <input type="number" onChange={handleQuantity} className="form-control" id="tradeQuantity" placeholder="'판매/구입' 할" min="0" max="100" step="1" />
                        <div className="input-group-append"><span className="input-group-text">주</span></div>
                    </div>
                </div>
                {/*input에따라 바뀌어야 함 */}
                <div className='row-sm-* mt-2'>
                    <div className="input-group">
                        <div className="input-group-prepend"><span className="input-group-text">=</span></div>
                        <input type="number" readOnly className="form-control" id="tradeAmount" placeholder="총 금액" min="0" max="100" value={selectedValue ? quantity * selectedValue['prices'][selectedValue['prices'].length - 1].value : 0} />
                    </div>
                </div>

                <div className='row-sm-* mt-2'>

                    {selectedValue &&
                        <>
                            <TradeDialog title='매수' color='danger'
                                quantity={quantity}
                                data={{'stockId':selectedValue._id,'stockName':selectedValue.stockName,'price':selectedValue.prices[selectedValue.prices.length-1].value}} 
                            />
                            <TradeDialog title='매도' 
                            data={{'stockId':selectedValue._id,'stockName':selectedValue.stockName,'price':selectedValue.prices[selectedValue.prices.length-1].value}} 
                            quantity={quantity} color='primary' />
                        </>
                    }
                </div>
            </div>


        </div>
    )
}
export default React.memo(TradeSection)