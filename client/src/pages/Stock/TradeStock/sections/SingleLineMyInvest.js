import React, { useState } from 'react';
import MyInvest from './MyInvest'
export default function SingleLineMyInvest(props) {
    const [data, setTabItem] = useState([1,2,3,4])
    const iconSet=[{icon:"caret-up",color:'red'},{icon:"caret-down",color:'blue'}]
    return (
        <>
             <div >
      <div className='row flex-row flex-nowrap overflow-auto'>
        {data.map((item, i)=> (
         <MyInvest 
         key={i}
         title={item.title}
         stockId={item.stockId}
         option={iconSet[0]}
         currentValue={item.currentValue}
         />
        ))}
        </div>
    </div>
        </>
    )
}
