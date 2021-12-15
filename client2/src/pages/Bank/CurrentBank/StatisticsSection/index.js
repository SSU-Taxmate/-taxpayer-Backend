import React, { useEffect, useState } from 'react'

import ByDate from './ByDate';
import ByType from './ByType';

function Statistics() {

    return (
        <div className="col-lg-6 justify-content-center py-3">
            <div className="account-card shadow justify-content-center bg-white">
                <ByType />
                <hr/>
                <ByDate />
            </div>
        </div>
    )
}

export default Statistics
