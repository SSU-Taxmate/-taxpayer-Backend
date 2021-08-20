import Select from '@material-ui/core/Select';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { InputLabel, FormControl } from '@material-ui/core';
import * as Yup from 'yup';
import { useField } from "formik";

function FirstStep(props) {
  let classData = useSelector(state => state.classInfo.classData);
  const [deposits, setdeposits] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [field, meta] = useField(props);
  const { value: selected } = field;
  const fetchData = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const result = await axios.get('/api/bank/deposits', { classId: classData.classId })
      setdeposits(result.data)
      console.log(result.data)
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>{deposits && <>
      <FormControl variant="outlined">
        <InputLabel htmlFor="depositSelect">예금 상품</InputLabel>
        < Select
          {...field}
          value={selected ? selected : ""}
          inputProps={{ id: "depositSelect" }}
          native
        >
          <option aria-label="선택해주세요" value={undefined} />
          {
            deposits.map((deposit, i) => <option key={deposit._id} value={i}>{deposit.name}</option>)
          }
        </Select >
      </FormControl>
      {selected && <div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item list-inline" style={{ display: 'flex', "justifyContent": 'space-between' }}>
            <div style={{ display: 'inline' }}>이율</div>
            <div style={{ display: 'inline' }}>{deposits[selected].interestRate}%</div>
          </li>
          <li className="list-group-item" style={{ display: 'flex', "justifyContent": 'space-between' }}>
            <div style={{ display: 'inline' }}>최소가입금액</div>
            <div style={{ display: 'inline' }}>{deposits[selected].minAmount}</div>
          </li>
          <li className="list-group-item" style={{ display: 'flex', "justifyContent": 'space-between' }}>
            <div style={{ display: 'inline' }}>최소 가입기간</div>
            <div style={{ display: 'inline' }}>{deposits[selected].minDuration}일</div>
          </li>

        </ul>
      </div>
      }
    </>}
    </>
  )

}
FirstStep.validationSchema = Yup.object().shape({
  depositSelect: Yup.string().required("Required").nullable()
})
FirstStep.label = '예금상품 선택하기'
export default FirstStep
