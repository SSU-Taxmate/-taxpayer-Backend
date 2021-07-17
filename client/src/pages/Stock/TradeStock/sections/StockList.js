import React, { useState } from 'react';
import { IconButton, Icon } from '@material-ui/core';
import DetailStockDialog from './DetailStockDialog';

const iconSet = [{ icon: "caret-up", color: 'red' }, { icon: "caret-down", color: 'blue' }]
export default function StockList(props) {

  const [data] = useState(props.data)
  const [open, setOpen] = useState(false);
  const [selectedValue, setselectedValue] = useState();

  const handleClose = (item) => {
    setOpen(false);
    setselectedValue()
    //console.log(item)
  };
  const handleListItemClick =(item)=>{
    //console.log(item)
    setOpen(true);
    setselectedValue(item)
  }
  return (
    <div >
      <div className='row flex-row flex-nowrap overflow-auto'>
        {data.map((item, i) => (
          <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 mb-2" key={i}>
            <div className="card border-bottom-primary h-100 py-2">
              <div className="card-body pb-0">

                <div className="row no-gutters align-items-center">

                  <div className="col">
                    <div className="text-xl font-weight-bold text-primary text-uppercase mb-1">{item.title}
                    </div>
                    <div className='row ml-2'>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">{item.currentValue}</div>
                      <div className='row'>
                        <i className={`fas fa-${iconSet[0].icon} ml-3`} style={{ color: iconSet[0].color }} />
                        <p className="ml-2 text-danger">
                          {item.currentValue}
                        </p>
                        <div className='ml-2'>(0.31%)</div>
                      </div>
                    </div>


                  </div>
                  <div className='col'>
                    <IconButton onClick={() => handleListItemClick(item) } style={{ float: 'right' }}> <Icon color="primary"> chevron_right </Icon></IconButton>

                  </div>
                
                </div>
              </div>
            </div>
          </div>

        ))}  {selectedValue&&
                  <DetailStockDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
                  }
      </div>
      
    </div>
    
  );
}