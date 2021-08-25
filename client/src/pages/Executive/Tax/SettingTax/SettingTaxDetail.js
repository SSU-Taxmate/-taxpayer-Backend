import React, { useEffect, useState } from 'react'
import CardBasic from '../../../../components/Cards/Basic';
import Popover from '../../../../components/Popover';
import axios from 'axios'
import InputTax from './sections/InputTax';
import { useSelector} from "react-redux";
import Loading from '../../../../components/Loading';

function SettingTaxDetail() {
  const [isLoading, setIsLoading] = useState(false)
  const [data,setData]=useState([0,0,0,0,0,0,0]);
  const [taxId, settaxId] = useState("")
  const [err, setIsError] = useState(false);
  let classData = useSelector(state => state.classInfo.classData);
  //console.log(classData)
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios.get('/api/taxes',{params:{classId:classData.classId}});
        console.log(result.data)
        if (result.data){
          console.log(result.data)
          settaxId(result.data._id)
          setData(result.data.taxlist)
        }
      } catch (error) {
        setIsError(true);

      }
      setIsLoading(false);
    };
    fetchData();
  }, [classData]);

  const onChange = (e) => {
    //console.log(e.target.id, e.target.value)
    data[e.target.id]=Number(e.target.value)
  }
  const handleSetupTax = (e) => {
    e.preventDefault();
    //console.log(data)
    axios.put(`/api/taxes`, {taxlist:data,_id:taxId})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  
  return (
    <>
      {isLoading ?
        <Loading/> :
        <CardBasic title='세금 설정 현황'>
          <form className="ml-1" onSubmit={handleSetupTax}>

            {/*<!--직접세  시작-->*/}
            <p className="h5 mb-3">직접세
              <Popover id='직접세설명' icon='info-circle'>직접세 설명을 적어봅시다</Popover>
            </p>
            <div className="form-row">
              <div className="form-group col-md-4">
                <InputTax id='0' title='소득세 : 소득의' value={data[0]} unit='%' onChange={onChange} />
              </div>
              <div className="form-group col-md-4">
                <InputTax id='1' title='부동산세 : 부동산의' value={data[1]} unit='%' onChange={onChange} />
              </div>
              <div className="form-group col-md-4">
                <InputTax id='2' title='자리세 : 자리의' value={data[2]} unit='%'  onChange={onChange}/>
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
                    <InputTax id='3' title='전기세 : 전기요금의' value={data[3]} unit='%' onChange={onChange} />
                  </div>
                  <div className="form-group col-lg-3">
                    <InputTax id='4' title='인지세 : 부동산거래회당' value={data[4]} unit='미소' onChange={onChange} />
                  </div>
                  <div className="form-group col-lg-3">
                    <InputTax id='5' title='부가가치세 : 물품구입금액의' value={data[5]} unit='%'  onChange={onChange}/>
                  </div>
                  <div className="form-group col-lg-3">
                    <InputTax id='6' title='증권거래세 : 증권판매금액의' value={data[6]} unit='%'  onChange={onChange}/>
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
