import React, { useEffect, useState } from 'react'
import CardBasic from '../../../../components/Cards/Basic';
import Popover from '../../../../components/Popover';
import axios from 'axios'
import InputTax from './sections/InputTax';
import { useSelector } from "react-redux";
import Loading from '../../../../components/Loading';
import TextField from '@material-ui/core/TextField';
import { Select } from '@material-ui/core';
import { InputLabel, FormControl } from '@material-ui/core';

function SettingTaxDetail() {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState();

  const [expenditure, setexpenditure] = useState()
  const [value, setvalue] = useState()

  const [taxId, settaxId] = useState("")
  const [err, setIsError] = useState(false);
  let classData = useSelector(state => state.classInfo.classData);
  //console.log(classData)
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios.get('/api/taxes', { params: { classId: classData.classId } });
        //console.log(result.data)
        if (result.data) {
          //console.log(result.data)
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
    //console.log(e.target.name, e.target.value)
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const handleSetupTax = (e) => {
    e.preventDefault();
    //console.log(data)
    axios.put(`/api/taxes`, { taxlist: data, _id: taxId })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  const onChangeType = (e) => {
    //console.log(e.target.value)
    setexpenditure(e.target.value)
  }
  const onChangeValue = (e) => {
    setvalue(e.target.value)
  }
  const handleExpenditure = (e) => {
    e.preventDefault();
    axios.post('/api/budget', { classId: classData.classId, amount: value, type: expenditure })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const addexpenditure = React.useMemo(
    () => (
      <TextField
        className="col m-1"
        name="description"
        label="세출 추가"
        variant="outlined"
        type="number"
        onChange={onChangeValue}
      />
    ), []);
  const expenditureType = React.useMemo(
    () => (
      <FormControl variant="outlined">
        <InputLabel htmlFor="expenditureType">세출 타입 선택</InputLabel>
        < Select
          inputProps={{ id: "expenditureType" }}
          defaultValue=""
          native
          value={expenditure}
          onChange={onChangeType}
        >
          <option value="" disabled />
          <option name="culture" value="culture">문화비</option>
          <option name="education" value="education">교육비</option>
          <option name="environment" value="environment">환경미화비</option>
          <option name="etc" value='etc'>기타</option>
        </Select >
      </FormControl>
    ), []);

  return (
    <>
      {isLoading ?
        <Loading /> :
        data &&
        <>
          <div className="account-card shadow justify-content-center bg-white mb-3" style={{ display: 'flex' }}>
            <form className="ml-1" style={{display:'inline'}} onSubmit={handleSetupTax}>

              {/*<!--직접세  시작-->*/}
              <p className="h5 mb-3">직접세
                <Popover id='직접세설명' icon='info-circle'>직접세 설명을 적어봅시다</Popover>
              </p>
                <InputTax name='income' title='소득세 : 소득의' value={data.income} unit='%' onChange={onChange} />
                <InputTax name='realestate' title='부동산세 : 부동산의' value={data.realestate} unit='%' onChange={onChange} />
                <InputTax name='place' title='자리세 : 자리의' value={data.place} unit='%' onChange={onChange} />

              {/*<!--   간접세  시작     -->*/}
              <div className="row mb-3">
                <div className="col">
                  <p className="h5">
                    간접세
                    <Popover id='간접세설명' icon='info-circle'>간접세 설명을 적어봅시다</Popover>
                  </p>
                </div>
              </div>

              <InputTax name='electric' title='전기세 : 전기요금의' value={data.electric} unit='%' onChange={onChange} />
              <InputTax name='stamp' title='인지세 : 부동산거래회당' value={data.stamp} unit='미소' onChange={onChange} />
              <InputTax name='vat' title='부가가치세 : 물품구입금액의' value={data.vat} unit='%' onChange={onChange} />
              <InputTax name='stock' title='증권거래세 : 증권판매금액의' value={data.stock} unit='%' onChange={onChange} />

              {/*<!--   벌금  시작     -->*/}
              <p className="h5 mb-3">
                벌금
                <Popover id='벌금정보' icon='info-circle'>벌금 탭에서 자세한 내용 확인하세요</Popover>
              </p>

              <button type="submit" style={{ float: 'right' }} className='btn btn-md btn-outline-primary' value="Submit" >저장</button>
            </form>
          </div>
          <form className="account-card shadow justify-content-center bg-white" style={{ display: 'flex' }} onSubmit={handleExpenditure}>
            {expenditureType}
            {addexpenditure}
            <button type="submit" style={{ float: 'right' }} className='btn btn-md btn-outline-primary' value="Submit" >제출</button>
          </form>

        </>
      }
    </>
  )
}

export default SettingTaxDetail
