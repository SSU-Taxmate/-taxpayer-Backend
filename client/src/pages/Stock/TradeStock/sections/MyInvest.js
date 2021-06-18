import React from 'react'

export default function MyInvest() {
    return (
        <div className="col-6 mb-2">
            <div className="card shadow py-2">
                <div className='row ml-2 '>
                    <div className='col-8'>

                        <div className="h5 font-weight-bold text-gray-800">TIGER 탄소효율그린뉴딜</div>
                    </div>
                    <div className='col-4'>
                        <button className="btn btn-outline-primary btn-sm float-right mr-2">매도</button>
                        <button className="btn btn-outline-danger btn-sm float-right mr-2">매수</button>
                    </div>

                </div>

                <table className='border-0 m-3'>
                <tbody>

                    <tr>
                        <td>잔고</td>
                        <td>1</td>
                        <td>손익</td>
                        <td>130원</td>
                    </tr>
                    <tr>
                        <td>평가금액</td>
                        <td>10380원</td>
                        <td>수익률</td>
                        <td>1.26%</td>
                    </tr>
                    <tr>
                        <td>매입가</td>
                        <td>10250원</td>
                        <td>현재가</td>
                        <td>10380원</td>
                    </tr>
                    </tbody>

                </table>

            </div>
        </div>
    )
}
