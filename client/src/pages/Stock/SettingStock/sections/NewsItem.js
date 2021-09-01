import React from 'react'

function NewsItem({ date, value, hint }) {
    return (
        <div>
            <div className="d-flex">
                <div className="font-weight-bold">
                    <div className="small text-gray-500">임시데이터:2021.09.05.</div>
                    <div className="text-truncate">
                        주가
                    </div>
                    <div className='text-truncate'>
                        오늘의 뉴스 여기에
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default NewsItem
