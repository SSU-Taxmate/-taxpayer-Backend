import React from 'react'
import moment from 'moment-timezone';
import DeleteValueDialog from './DeleteValueDialog';
import ManageValueDialog from './ManageValueDialog';

function NewsItem({ price, stockId }) {
   // console.log('>>', price)
    const week = { 1: '월', 2: '화', 3: '수', 4: '목', 5: '금', 6: '토', 7: '일' }
    return (
        <div>
            <div className="d-flex">
                <div className="font-weight-bold border-right">
                    <div className="small text-gray-500">{moment(price.updateDate).tz('Asia/Seoul').format('YYYY-MM-DD')}({week[moment(price.updateDate).tz('Asia/Seoul').isoWeekday()]})</div>
                    <div className="text-truncate">
                        {price.value}미소
                    </div>
                </div>
                <div>
                    {price.hint}
                </div>
                {moment(price.updateDate).tz('Asia/Seoul') <= moment().tz('Asia/Seoul') ?
                    null :
                    <>
                        <ManageValueDialog type={'edit'} stockId={stockId} price={price}/>
                        <DeleteValueDialog priceId={price._id} stockId={stockId} />
                    </>
                }
            </div>

        </div>
    )
}

export default NewsItem
