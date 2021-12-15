import React from 'react'
import PageHeading from '../../../components/PageHeading';

import SettingStocks from './sections/SettingStocks';
import PageFrame from '../../PageFrame';

export default function SettingStock() {

  return (
    <PageFrame>

      <PageHeading title="주식설정" />
      <SettingStocks />

    </PageFrame>

  )
}
