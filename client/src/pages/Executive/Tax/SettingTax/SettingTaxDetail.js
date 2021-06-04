import React,{useEffect, useState} from 'react'
import CardDropdown from '../../../../components/Cards/Dropdown';
import Popover from '../../../../components/Popover';

function SettingTaxDetail() {
 /* const [data,setData]=useState(true);
  
  useEffect(()=>{
  })*/
    return (
        <CardDropdown title='이번달 내가 내야할 세금'>
                  {/*<!--직접세  시작-->*/}
                  <p className="h5 mb-3">직접세
                    <Popover id='직접세설명' icon='info-circle'>직접세 설명을 적어봅시다</Popover>
                  </p>
                  <form className="ml-1">
                    <div className="form-row">
                      <div className="form-group col-md-4">
                        <label htmlFor="incometaxrate">소득의</label>

                        <div className="input-group mb-3">
                          <input
                            type="number"
                            className="form-control"
                            id="incometaxrate"
                            placeholder="소득세"
                            min="0"
                            max="100"
                            step="5"
                          />
                          <div className="input-group-append">
                            <span className="input-group-text" id="percent10"
                              >%</span
                            >
                          </div>
                        </div>
                      </div>

                      <div className="form-group col-md-4">
                        <label htmlFor="realestatetaxrate">부동산의</label>
                        <div className="input-group mb-3">
                          <input
                            type="number"
                            className="form-control"
                            id="realestatetaxrate"
                            placeholder="부동산세"
                            min="0"
                            max="100"
                            step="5"
                          />
                          <div className="input-group-append">
                            <span className="input-group-text" id="percent11"
                              >%</span
                            >
                          </div>
                        </div>
                      </div>

                      <div className="form-group col-md-4">
                        <label htmlFor="seattaxrate">자리의</label>
                        <div className="input-group mb-3">
                          <input
                            type="number"
                            className="form-control"
                            id="seattaxrate"
                            placeholder="자리세"
                            min="0"
                            max="100"
                            step="5"
                          />
                          <div className="input-group-append">
                            <span className="input-group-text" id="percent12"
                              >%</span
                            >
                          </div>
                        </div>
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
                    <div
                      className="btn-group btn-group-toggle mr-2"
                      data-toggle="buttons"
                    >
                    
                      <label className="btn btn-sm btn-outline-primary active">
                        <input
                          type="radio"
                          name="options"
                          id="use"
                          autoComplete="off"
                          defaultChecked
                        />
                        사용
                      </label>
                      <label className="btn btn-sm btn-outline-primary">
                        <input
                          type="radio"
                          name="options"
                          id="notuse"
                          autoComplete="off"
                        />
                        미사용
                      </label>
                    </div>
                  </div>

                  <div id='useornotarea'>
                  <form className="ml-1" >
                    <div className="form-row">
                      <div className="form-group col-lg-3">
                        <label htmlFor="electrictaxrate">전기요금의</label>

                        <div className="input-group mb-3">
                          <input
                            type="number"
                            className="form-control"
                            id="electrictaxrate"
                            placeholder="전기세"
                            min="0"
                            max="100"
                            step="5"
                          />
                          <div className="input-group-append">
                            <span className="input-group-text" id="percent">%</span>
                          </div>
                        </div>
                      </div>

                      <div className="form-group col-lg-3">
                        <label htmlFor="stamptaxrate">부동산거래회당</label>
                        <div className="input-group mb-3">
                          <input
                            type="number"
                            className="form-control"
                            id="stamptaxrate"
                            placeholder="인지세"
                            min="0"
                            max="100"
                            step="5"
                          />
                          <div className="input-group-append">
                            <span className="input-group-text" id="percent2"
                              >미소</span
                            >
                          </div>
                        </div>
                      </div>

                      <div className="form-group col-lg-3">
                        <label htmlFor="vatrate">물품구입금액의</label>
                        <div className="input-group mb-3">
                          <input
                            type="number"
                            className="form-control"
                            id="vatrate"
                            placeholder="부가가치세"
                            min="0"
                            max="100"
                            step="5"
                          />
                          <div className="input-group-append">
                            <span className="input-group-text" id="percent3"
                              >%</span
                            >
                          </div>
                        </div>
                      </div>

                      <div className="form-group col-lg-3">
                        <label htmlFor="transactiontax">증권판매금액의</label>
                        <div className="input-group mb-3">
                          <input
                            type="number"
                            className="form-control"
                            id="transactiontax"
                            placeholder="증권거래세"
                            min="0"
                            max="100"
                            step="5"
                          />
                          <div className="input-group-append">
                            <span className="input-group-text" id="percent4"
                              >%</span
                            >
                          </div>
                        </div>
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
                      <input
                        type="number"
                        className="form-control"
                        id="electrictaxrate"
                        placeholder="벌금"
                        min="0"
                        max="100"
                        step="5"
                        readOnly={true}
                      />
                      <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2"
                          >미소</span
                        >
                      </div>
                    </div>
                  </div>
                  {/*<!--   벌금  끝     -->*/}

                </div>
         

        </CardDropdown>

    )
}

export default SettingTaxDetail
