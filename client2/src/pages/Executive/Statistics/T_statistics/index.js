import React from 'react'
import PageHeading from '../../../../components/PageHeading';
import NationStatsDetail from './NationStatsDetail'
import PageFrame from '../../../PageFrame';
function NationStats() {
  return (
    <PageFrame>
      <PageHeading title="반 숙제 현황" />
      <NationStatsDetail/>
    </PageFrame>

  )
}

export default NationStats
