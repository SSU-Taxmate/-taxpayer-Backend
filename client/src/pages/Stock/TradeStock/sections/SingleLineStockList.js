import React, { useState } from 'react';

import StockInfo from './StockInfo';
const iconSet=[{icon:"caret-up",color:'red'},{icon:"caret-down",color:'blue'}]
export default function SingleLineStockList(props) {

  const [data, setTabItem] = useState(props.data)
  return (
    <div >
      <div className='row flex-row flex-nowrap overflow-auto'>
        {data.map((item, i)=> (
         <StockInfo 
         key={i}
         title={item.title}
         stockId={item.stockId}
         option={iconSet[0]}
         currentValue={item.currentValue}
         />
        ))}
        </div>
    </div>
  );
}