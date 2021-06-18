import React, { useState } from 'react';

import StockInfo from './sections/StockInfo';

export default function SingleLineGridList(props) {
  const [data, setTabItem] = useState(props.data)
  return (
    <div >
      <div class='row flex-row flex-nowrap overflow-auto'>
        {data.map((item, i)=> (
         <StockInfo 
         title={item.title}
         stockId={item.stockId}
         option={{icon:"arrow-up",color:'red'}}
         currentValue={item.currentValue}
         />
        ))}
        </div>
    </div>
  );
}