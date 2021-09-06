import React, { Component } from 'react';

//Navigation
import PageHeading from '../../../../components/PageHeading';
import PageFrame from '../../../PageFrame';

import SettingTaxDetail from './SettingTaxDetail'
class SettingTax extends Component {
  render() {
    return (
      <PageFrame>
        <PageHeading title="세금설정" />
        <SettingTaxDetail />
      </PageFrame>
    )
  }
}

export default SettingTax;