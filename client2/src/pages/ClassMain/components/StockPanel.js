import React from 'react'

import TodayNews from './TodayNews';
import TodayRate from './TodayRate';
import { useSelector } from "react-redux";




function StockPanel() {

    let user = useSelector((state) => state.user);

    return (
        <>
            <TodayNews />
            {user.userData && user.userData.role === 1 ?<TodayRate />:null}{/*학생만 */}
        </>
    )


}



export default StockPanel;
