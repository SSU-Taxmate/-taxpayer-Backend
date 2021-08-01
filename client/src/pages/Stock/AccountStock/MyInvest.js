import React from 'react'
import TradeDialog from '../TradeStock/sections/TradeDialog'
export default function MyInvest(props) {
    console.log(props)
    return (
        <div className="col-6">
            <div className="card py-2">
                <div className='row ml-2 '>
                    <div className='col-8'>
                        <div className="h5 font-weight-bold text-gray-800">TIGER 탄소효율그린뉴딜</div>
                    </div>
                    <div className='col-4'>
                        <TradeDialog title='매도' color='primary'
                            quantity={0}
                            data={{}}
                        />
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
                            <td>평균 매입가</td>
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
