import React from 'react'

function NewsItem() {
    return (
        <div className="dropdown-item d-flex align-items-center">
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
    )
}

export default NewsItem
