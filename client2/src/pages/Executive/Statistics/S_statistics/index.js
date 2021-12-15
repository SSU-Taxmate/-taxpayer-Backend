import React from 'react'

import PageHeading from '../../../../components/PageHeading';
import MyStatsDetail from './MyStatsDetail'
import PageFrame from '../../../PageFrame';
function NationStats() {
    return (
        <PageFrame>
            <PageHeading title="내 숙제 현황" />
            <MyStatsDetail />
        </PageFrame>
    )
}

export default NationStats
