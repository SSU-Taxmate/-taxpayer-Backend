import React, { useState ,useCallback} from 'react';
import DetailStockDialog from './DetailStockDialog';

const iconSet = [{ icon: "caret-up", color: 'red' }, { icon: "caret-down", color: 'blue' }]
function StockList(props) {
 // console.log('stockList',props.data)
  const {data}=props;
const [percentage, setpercentage] = useState(0)
  const calculate = item => {
    setpercentage(item.prices[item.prices.length-1].value-item.prices[item.prices.length-2].value);
};
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
                      <div className="h5 mb-0 font-weight-bold text-gray-800">{item.prices[item.prices.length-1].value}</div>
                      <div className='row'>
                        <i className={`fas fa-${percentage>=0? iconSet[0].icon :iconSet[1].icon} ml-3`} 
                        style={percentage>=0?{ color: iconSet[0].color }:{ color: iconSet[1].color }} />
                        <p className="ml-2 text-danger">
                          {item.currentValue}
                        </p>
                        <div className='ml-2'>{
                          item.prices.length===1?0:
                          Math.round(item.prices[item.prices.length-1].value/item.prices[item.prices.length-2].value)
                        }%</div>
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