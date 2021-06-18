import React, { useState } from 'react';

import StockInfo from './StockInfo';

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
         option={{icon:"caret-up",color:'red'}}
         currentValue={item.currentValue}
         />
        ))}
        </div>
    </div>
  );
}