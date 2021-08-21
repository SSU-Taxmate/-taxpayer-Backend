import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import axios from 'axios';
import DepositAdd from '../JoinDepositModal';
import DepositCloseModal from '../DepositCloseModal';
function Deposit({balance}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userdeposit, setuserdeposit] = useState();
  const joinedUser = useSelector(state => state.classUser);
  console.log('balance',balance)
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios.get(`/api/students/${joinedUser.classUser}/deposit`);
        //console.log("/api/students/:id/deposit", result.data);
        setuserdeposit(result.data)
        console.log(result.data)

      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [])
  const calculate = (type) => {
    if (type === '만기') {
      return (userdeposit.productId.interestRate + 100) * userdeposit.amount / 100
    } else {
      const today = new Date()
      const create = new Date(userdeposit.createdAt)
      const diff = Math.round((today.getTime() - create.getTime()) / (1000 * 3600 * 24))//가입기간
      if (diff >= userdeposit.productId.minDuration) {
        return (userdeposit.productId.interestRate + 100) * userdeposit.amount / 100
      } else {
        return userdeposit.amount
      }
    }
  }
  const onhandleclick = (e) => {
    e.preventDefault();
    axios.delete(`/api/bank/deposits/${userdeposit.productId._id}/join/${userdeposit._id}`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  if (userdeposit) {
    //console.log(userdeposit)
    return (

      <div className="row justify-content-center">
        <div className="account-card shadow justify-content-center col-md-12 bg-white">
          <div className="d-flex justify-content-between collapsed"
            data-toggle="collapse" data-target="#collapse_deposit" aria-expanded="false">
            <div className="col-md-6" >예금상품명: {userdeposit.productId.name}</div>
            <div className="col-md-6" style={{ textAlign: 'right' }}>$ {userdeposit.amount} </div>
          </div>

          <div id="collapse_deposit" className='collapse'>
            <div className="bg-white py-2 rounded">
              <div style={{ textAlign: 'right' }}><sub>신규가입일 : {userdeposit.createdAt.split('T')[0]}</sub></div>
              <div className="text-center" > 만기시: $ {calculate('만기')} </div>
              <div className="text-center py-3" > 지금 해지시: $ {calculate('지금')} </div>
              <div className="d-flex justify-content-center">

              <DepositCloseModal onhandleclick={onhandleclick}/>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  } else {

    return <>
      <div className="row py-3 justify-content-center">
        <div className="account-card shadow justify-content-center col-md-12 bg-white "style={{ textAlign: 'center' }}>
          새로운 예금 상품에 가입하세요
        </div>
      </div>
      <DepositAdd balance={balance} />
    </>

  }

}

export default Deposit;