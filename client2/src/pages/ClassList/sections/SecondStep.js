import React from 'react'

function SecondStep({ data, handleChange }) {
    return (
        <div>
        {data.entryClass !== undefined ? (<>
            <div className ="mb-2">국가명 : {data.entryClass.name} </div> 
            <div className="mb-4"><span> 시민권을 발급받고자 하는 국가가 맞습니까?</span>
            </div>
    </>) : null 
        }
        </div>
    )
}
export default SecondStep;
