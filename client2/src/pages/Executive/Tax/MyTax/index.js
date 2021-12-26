import React, { Component } from 'react';

//Navigation
import PageHeading from '../../../../components/PageHeading';
import MyTaxDetail from './MyTaxDetail'
import PageFrame from '../../../PageFrame';
class MyTax extends Component {
  componentWillMount() {
    document.getElementById('body').className = 'page-top'
  }

  render() {
    return (
      <PageFrame>
        <PageHeading title="세금서" />
        <MyTaxDetail />
      </PageFrame>
    )
  }
}

export default MyTax;