import React, { Component } from 'react'
import CardInfo from '../../../components/Cards/Info'
import VerticalTabs from '../../../components/Tab'
export default class TradeStockDetail extends Component {
  render() {
    return (

      <div >
        <div className="card shadow mb-4">
          <VerticalTabs></VerticalTabs>
        </div>
        <div className='row'>
          <CardInfo title="시장 운영 공지 / 신규 상장 회사"
            icon="calendar"
            color="primary"
            value="공지사항1" />
          <CardInfo title="시장 운영 공지 / 신규 상장 회사"
            icon="calendar"
            color="primary"
            value="공지사항2" />
        </div>
      </div>
    )
  }
}
