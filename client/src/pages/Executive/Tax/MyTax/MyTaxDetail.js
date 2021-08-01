import React from 'react'
import CardDropdown from '../../../../components/Cards/Dropdown'
import Popover from '../../../../components/Popover'
import InputTax from '../SettingTax/sections/InputTax'
function MyTaxDetail() {
    return (
        <CardDropdown title='이번달 내가 내야할 세금'>
        {/*<!--직접세  시작-->*/}
        <p className="h5 mb-3">직접세
          <Popover id='직접세설명' icon='info-circle'>직접세 설명을 적어봅시다</Popover>
        </p>
        <form className="ml-1">
          <div className="form-row">
            <div className="form-group col-md-4">
              <InputTax id='income' title='소득세' value={1} unit='%'  readOnly={true}/>
            </div>
            <div className="form-group col-md-4">
              <InputTax id='realestate' title='부동산세' value={1} unit='%' readOnly={true} />
            </div>
            <div className="form-group col-md-4">
              <InputTax id='seat' title='자리세' value={10} unit='%' readOnly={true} />
            </div>
          </div>
        </form>
        {/*<!--직접세  끝-->*/}
  
        {/*<!--   간접세  시작     -->*/}
        <div className="row mb-3">
          <div className="col">
            <p className="h5">
              간접세
              <Popover id='간접세설명' icon='info-circle'>간접세 설명을 적어봅시다</Popover>
            </p>
          </div>
          <div className="btn-group btn-group-toggle mr-2" data-toggle="buttons">
            <label className="btn btn-sm btn-outline-primary active">
              <input type="radio"name="options"id="use"autoComplete="off" defaultChecked />
              사용
            </label>
            <label className="btn btn-sm btn-outline-primary">
              <input type="radio"name="options"id="notuse"autoComplete="off"/>
              미사용
            </label>
          </div>
        </div>
  
        <div id='useornotarea'>
          <form className="ml-1" >
            <div className="form-row">
              <div className="form-group col-lg-3">
                <InputTax id='electric' title='전기세 ' value={1} unit='%'  readOnly={true}/>
              </div>
              <div className="form-group col-lg-3">
                <InputTax id='stamp' title='인지세' value={1} unit='미소' readOnly={true} />
              </div>
              <div className="form-group col-lg-3">
                <InputTax id='vat' title='부가가치세' value={1} unit='%' readOnly={true} />
              </div>
              <div className="form-group col-lg-3">
                <InputTax id='vat' title='증권거래세' value={1} unit='%'  readOnly={true} />
              </div>
            </div>
          </form>
          {/*<!--   간접세  끝     -->*/}
  
          {/*<!--   벌금  시작     -->*/}
          <p className="h5 mb-3">
            벌금
            <Popover id='벌금정보' icon='info-circle'>벌금 탭에서 자세한 내용 확인하세요</Popover>
          </p>
          <div className="form-row col-lg-4" >
            <div className="input-group mb-3">
            <InputTax id='electric' title='' readOnly={true} unit='미소' />
            </div>
          </div>
          {/*<!--   벌금  끝     -->*/}
  
        </div>
  
  
      </CardDropdown>
  
    )
}

export default MyTaxDetail
