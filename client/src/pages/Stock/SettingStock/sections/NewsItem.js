import React from 'react'
import moment from 'moment-timezone';
import DeleteValueDialog from './DeleteValueDialog';
import ManageValueDialog from './ManageValueDialog';

function NewsItem({ price, stockId }) {
    const week = { 1: '월', 2: '화', 3: '수', 4: '목', 5: '금', 6: '토', 7: '일' }
    return (
        <div id="stocklist" className="p-3">
            <div className="row mb-4">
                <div className="col-sm-12 col-md-6 col-lg-3">
                    <div className="font-weight-bold text-gray-500">{moment(price.updateDate).tz('Asia/Seoul').format('YYYY-MM-DD')}({week[moment(price.updateDate).tz('Asia/Seoul').isoWeekday()]})</div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-2 text-truncate">
                    {price.value}미소
                </div>
                <div className="col">
                    {price.hint}
                </div>
                {moment(price.updateDate).tz('Asia/Seoul') <= moment().tz('Asia/Seoul') ?
                    null :
                    <>
                    <div className="col-sm-12 col-lg-2">
                        <ManageValueDialog type={'edit'} stockId={stockId} price={price}/>
                        <DeleteValueDialog priceId={price._id} stockId={stockId} />
                    </div>
                    </>
                }
            </div>

        </div>
    )
}

export default NewsItem
