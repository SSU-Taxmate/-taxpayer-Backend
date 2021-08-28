import React from 'react'

function Revenue({data}) {

    return (
        <div className='col-6'>

            <p className="h5 font-weight-bold "><a href='#revenue_detail'>세입내역</a></p>
            <div id='direct_tax'>
                <p className="h6 font-weight-bold ">직접세</p>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">(재산) 소득세 : {data.income} <sub>미소</sub></li>
                    <li className="list-group-item">(재산) 부동산세 : {data.realestate} <sub>미소</sub></li>
                    <li className="list-group-item">(임대) 자리세 : {data.place} <sub>미소</sub></li>
                </ul>
            </div>
            <div id='indirect_tax'>
                <p className="h6 font-weight-bold ">간접세</p>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">(재산) 부가가치세 : {data.electric} <sub>미소</sub></li>
                    <li className="list-group-item"> (재산) 인지세 {data.stamp} <sub>미소</sub></li>
                    <li className="list-group-item">(재산) 증권 거래세 {data.stock} <sub>미소</sub></li>
                </ul>
            </div>
            <div>
                <p className="h6 font-weight-bold ">벌금</p>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">총 벌금 : { } <sub>미소</sub></li>
                </ul>
            </div>

        </div>

    )
}

export default Revenue
