import React, { useEffect,useState } from 'react';

export default function StockInfo(props) {
    const [stockId, setstockId] = useState(props.stockId)
    const [title, settitle] = useState(props.title)
    const [currentValue, setcurrentValue] = useState(props.currentValue)
    const [option, setoption] = useState(props.option)
        return (
            <div className="col-xl-3 col-md-6 mb-4">
                <div className= "card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xl font-weight-bold text-primary text-uppercase mb-1">{title}</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">{currentValue}</div>
                            </div>
                            <div className="col-auto">
                                <i className={`fas fa-${option.icon} fa-2x`} style={{color:option.color}}></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

}

