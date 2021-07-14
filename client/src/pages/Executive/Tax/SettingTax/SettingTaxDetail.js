import React, { useEffect, useState } from 'react'
import CardBasic from '../../../../components/Cards/Basic';
import Popover from '../../../../components/Popover';
import axios from 'axios'
import InputTax from './sections/InputTax';
function SettingTaxDetail() {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({})
  const [err, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios.get('/api/classes/:classId/taxes/set-up');
        console.log(result.data)

        setData(result.data['setTax']);
      } catch (error) {
        setIsError(true);

      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const onChange = (e) => {
    console.log(e.target.id, e.target.value)
    //    setData({ ...data, [e.target.id]: Number(e.target.value) });
    for (let i = 0; i < data.length; i++) {
      if (data[i].typename === e.target.id) {
         data[i].value=Number(e.target.value)
      }
    }
  }
  const handleSetupTax = (e) => {
    e.preventDefault();
   // console.log('handleSetupTax', data)
/*동일한 ObjectId가 나와서 고민임 */
    axios.post('/api/classes/:classId/taxes/set-up', data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const findvalue = (v) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].typename === v) {
        return data[i].value;
      }
    }
  }
  
  return (
    <>
      {isLoading ?
        <div>loading</div> :
        <CardBasic title='세금 설정 현황'>
          <form className="ml-1" onSubmit={handleSetupTax}>

            {/*<!--직접세  시작-->*/}
            <p className="h5 mb-3">직접세
              <Popover id='직접세설명' icon='info-circle'>직접세 설명을 적어봅시다</Popover>
            </p>
            <div className="form-row">
              <div className="form-group col-md-4">
                <InputTax id='income' title='소득세 : 소득의' value={findvalue('income')} unit='%' onChange={onChange} />
              </div>
              <div className="form-group col-md-4">
                <InputTax id='realestate' title='부동산세 : 부동산의' value={findvalue('realestate')} unit='%' onChange={onChange} />
              </div>
              <div className="form-group col-md-4">
                <InputTax id='seat' title='자리세 : 자리의' value={findvalue('seat')} unit='%'  onChange={onChange}/>
              </div>
            </div>
            {/*<!--직접세  끝-->*/}

            {/*<!--   간접세  시작     -->*/}
            <div className="row mb-3">
              <div className="col">
                <p className="h5">
                  간접세
                  <Popover id='간접세설명' icon='info-circle'>간접세 설명을 적어봅시다</Popover>
                </p>
              </div>
    
            </div>

              <div className="ml-1" >
                <div className="form-row">
                  <div className="form-group col-lg-3">
                    <InputTax id='electric' title='전기세 : 전기요금의' value={findvalue('electric')} unit='%' onChange={onChange} />
                  </div>
                  <div className="form-group col-lg-3">
                    <InputTax id='stamp' title='인지세 : 부동산거래회당' value={findvalue('stamp')} unit='미소' onChange={onChange} />
                  </div>
                  <div className="form-group col-lg-3">
                    <InputTax id='vat' title='부가가치세 : 물품구입금액의' value={findvalue('vat')} unit='%'  onChange={onChange}/>
                  </div>
                  <div className="form-group col-lg-3">
                    <InputTax id='stock' title='증권거래세 : 증권판매금액의' value={findvalue('stock')} unit='%'  onChange={onChange}/>
                  </div>
                </div>
              </div>


            {/*<!--   간접세  끝     -->*/}

            {/*<!--   벌금  시작     -->*/}
            <p className="h5 mb-3">
              벌금
              <Popover id='벌금정보' icon='info-circle'>벌금 탭에서 자세한 내용 확인하세요</Popover>
            </p>

            {/*<!--   벌금  끝     -->*/}

            <button type="submit" style={{ float: 'right' }} className='btn btn-md btn-outline-primary' value="Submit" >저장</button>
          </form>
        </CardBasic>
      }
    </>
  )
}

export default SettingTaxDetail
