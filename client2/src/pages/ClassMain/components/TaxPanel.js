import React from 'react'

import TaxBalance from './TaxBalance';
import TaxMonth from './TaxMonth';

function TaxPanel() {
    return (
        <div>
            <TaxBalance />
            <hr className="m-0" />
            <TaxMonth/>
        </div>

    )


}

export default TaxPanel;

