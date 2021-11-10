import React,{useState} from 'react'
import BuyDialog from './BuyDialog';

function InputAmount(props) {
    const selectedValue=props.selectedValue;
    const [quantity, setquantity] = useState(1)
    const handleQuantity = (e) => {
        e.preventDefault()
        setquantity(e.target.value)
    }
    return (
        <>
            <div className='row-sm-*'>
                <div className="input-group">
                    {/*selectedValue에 따라 바뀌면 됨 */}
                    <input type="number" readOnly className="form-control" id="tradeValue" placeholder="현재가" min="0" max="100" step="1" value={selectedValue ? selectedValue['prices'][selectedValue['prices'].length - 1].value : ''} />
                    <div className="input-group-append"><span className="input-group-text outline-none">X</span></div>

                    <input type="number" onChange={handleQuantity} className="form-control" id="tradeQuantity" placeholder="'판매/구입' 할" min="1" max="100" step="1" />
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
                <BuyDialog type='매수' color='danger'
                    quantity={quantity}
                    data={{ 'stockId': selectedValue._id, 'stockName': selectedValue.stockName, 'price': selectedValue.prices[selectedValue.prices.length - 1].value }}
                />
            </div>
        </>
    )
}

export default InputAmount
