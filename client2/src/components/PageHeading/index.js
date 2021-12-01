import React from 'react';
const PageHeading = (props) => (
    <div className="d-sm-flex align-items-center justify-content-between mb-4" >
        <div className="h3 mb-0 text-gray-800">
            {props.title}
        </div>
        <div style={{float:'right'}}>
        {props.children}
        </div>
    </div >
)

export default PageHeading;