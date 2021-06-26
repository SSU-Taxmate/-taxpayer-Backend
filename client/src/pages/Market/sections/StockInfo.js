import React, { useEffect, useState } from 'react';

export default function StockInfo(props) {
    const [stockId, setstockId] = useState(props.stockId)
    const [title, settitle] = useState(props.title)
    const [img, setimg] = useState(props.img)
    const [currentValue, setcurrentValue] = useState(props.currentValue)
    const [option, setoption] = useState(props.option)
    return (
        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 mb-2">
            <div className="card border-bottom-primary h-100 py-2">
                <div className="card-body pb-0">
                    <div className="row no-gutters align-items-center">
                        <div className="col">
                            <div className="text-xl font-weight-bold text-primary text-uppercase mb-1">{title}
                            </div>
                            <img className="card-img-bottom rounded" src={img}></img>
                            <div className='row ml-2'>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">{currentValue}</div>

                            </div>
                            <div className='row ml-4'>
                                <i className={`fas fa-${option.icon} ml-3`} style={{ color: option.color }} />
                                <p className="ml-2 text-danger">
                                    {currentValue}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

