import React from 'react'

function Expenditure({ data }) {

    return (

        <div className='col-6'>
            <p className="h5 font-weight-bold "><a href='#expenditure_detail'>세출내역</a></p>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">문화비 : {data.culture} <sub>미소</sub></li>
                <li className="list-group-item"> 교육비 : {data.education} <sub>미소</sub></li>
                <li className="list-group-item">환경미화비 : {data.environment} <sub>미소</sub></li>
                <li className="list-group-item">기타 : {data.etc} <sub>미소</sub></li>
            </ul>
            <div className='row'>
                <div className='col'>
                    <p className="h5 font-weight-bold ">한 줄 분석</p>
                    <div className='col ml-1'>
                        <textarea
                            rows='5'
                            readOnly={true}
                            className="form-control"
                            id="evaluation"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Expenditure
