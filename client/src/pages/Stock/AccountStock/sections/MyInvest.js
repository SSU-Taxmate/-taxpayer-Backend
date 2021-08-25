import React from 'react'
import SellDialog from './SellDialog'
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import { Link } from "react-router-dom";
export default function MyInvest({ data }) {
    const evaluated = data.quantity * data.currentPrice//평가금액
    const gainNloss = evaluated - data.allPayAmount//평가손익
    const icon = gainNloss>0?<TrendingUpIcon/>: <TrendingDownIcon/>
    return (
        <div className="col-6">
            <div className="card py-2">
                <div className='row ml-2 '>
                    <div className='col-8'>
                        <Link  to="/classes/:classId/stock">
                            <div className="h5 font-weight-bold text-gray-800">{data.stockName}{icon}</div>
                        </Link>
                    </div>
                    <div className='col-4'>
                        {data&&<SellDialog type='매도' color='primary' quantity={1} data={data}/>}
                    </div>

                </div>

                <table className='border-0 m-3'>
                    <tbody>
                        <tr>
                            <td>잔고</td>
                            <td>{data.quantity}</td>
                            <td>평가금액</td>
                            <td>{evaluated}미소</td>
                        </tr>
                        <tr>
                            <td>현재가</td>
                            <td>{data.currentPrice}미소</td>
                            <td>평균 매입가</td>
                            <td>{Math.round(data.allPayAmount / data.quantity)}미소</td>
                        </tr>
                        <tr>
                            <td>평가 손익</td>
                            <td>{gainNloss}미소</td>
                            <td>수익률</td>
                            <td>{Math.round(gainNloss / data.allPayAmount * 100)}%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
