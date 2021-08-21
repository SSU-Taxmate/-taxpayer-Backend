import React from 'react'

function ConfirmStep({ data }) {

    return (
        <div>
            {console.log('formvalues')}
            <div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item" style={{ display: 'flex', "justifyContent": 'space-between' }}>
                        <div style={{ display: 'inline' }}>상품명</div>
                        <div style={{ display: 'inline' }}>{data.product.name}</div>
                    </li>
                    <li className="list-group-item list-inline" style={{ display: 'flex', "justifyContent": 'space-between' }}>
                        <div style={{ display: 'inline' }}>이율</div>
                        <div style={{ display: 'inline' }}>{data.product.interestRate}%</div>
                    </li>
                    <li className="list-group-item" style={{ display: 'flex', "justifyContent": 'space-between' }}>
                        <div style={{ display: 'inline' }}>최소가입금액</div>
                        <div style={{ display: 'inline' }}>{data.product.minAmount}</div>
                    </li>
                    <li className="list-group-item" style={{ display: 'flex', "justifyContent": 'space-between' }}>
                        <div style={{ display: 'inline' }}>최소 가입기간</div>
                        <div style={{ display: 'inline' }}>{data.product.minDuration}일</div>
                    </li>
                    <li className="list-group-item" style={{ display: 'flex', "justifyContent": 'space-between' }}>
                        <div style={{ display: 'inline' }}>가입금액</div>
                        <div style={{ display: 'inline' }}>{data.amount}</div>
                    </li>
                    <li className="list-group-item" style={{ display: 'flex', "justifyContent": 'space-between' }}>
                        <div style={{ display: 'inline' }}>만기시 해지금액</div>
                        <div style={{ display: 'inline' }}>{Math.round(data.amount*(data.product.interestRate+100)/100)}</div>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default ConfirmStep
