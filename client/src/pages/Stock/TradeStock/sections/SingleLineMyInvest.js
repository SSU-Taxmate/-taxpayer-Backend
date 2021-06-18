import React, { useState } from 'react';
import MyInvest from './MyInvest'
export default function SingleLineMyInvest(props) {
    const [data, setTabItem] = useState([1,2,3,4])

    return (
        <>
             <div >
      <div className='row flex-row flex-nowrap overflow-auto'>
        {data.map((item, i)=> (
         <MyInvest 
         key={i}
         title={item.title}
         stockId={item.stockId}
         option={{icon:"caret-up",color:'red'}}
         currentValue={item.currentValue}
         />
        ))}
        </div>
    </div>
        </>
    )
}
