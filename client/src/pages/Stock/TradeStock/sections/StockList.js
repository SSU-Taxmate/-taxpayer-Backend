import React, { useState } from 'react';
import DetailStockDialog from './DetailStockDialog';

const iconSet = [{ icon: "caret-up", color: 'red' }, { icon: "caret-down", color: 'blue' }]
function StockList(props) {
  console.log('stockList',props.data)
  const {data}=props;
  return (
    <div >
      <div className='row flex-row flex-nowrap overflow-auto'>
        {data&&data.map((item, i) => (
          <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 mb-2" key={i}>
            <div className="card border-bottom-primary h-100 py-2">
              <div className="card-body pb-0">

                <div className="row no-gutters align-items-center">

                  <div className="col">
                    <div className="text-xl font-weight-bold text-primary text-uppercase mb-1">{item.stockName}
                    </div>
                    <div className='row ml-2'>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">{item.prices[0].value}</div>
                      <div className='row'>
                        <i className={`fas fa-${iconSet[0].icon} ml-3`} style={{ color: iconSet[0].color }} />
                        <p className="ml-2 text-danger">
                          {item.currentValue}
                        </p>
                        <div className='ml-2'>(default: 0.31%)</div>
                      </div>
                    </div>


                  </div>
                  <div className='col'>
                    <DetailStockDialog selectedValue={item}  />
                  </div>
                
                </div>
              </div>
            </div>
          </div>

        ))}  
      </div>
      
    </div>
    
  );
}
export default React.memo(StockList)