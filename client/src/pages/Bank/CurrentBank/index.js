import React, { useEffect, useState } from 'react';

import Account from './AccountSection';
import Deposit from './DepositSection';
import axios from 'axios'
import { useSelector } from "react-redux";
import Statistics from './StatisticsSection';
import PageFrame from '../../PageFrame';

function Bank() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userAccount, setUserAccount] = useState({})//학생 계좌 정보
  const joinedUser = useSelector(state => state.classUser);
  const user = useSelector(state => state.user);
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios.get(`/api/students/${joinedUser.classUser}/account`);
        setUserAccount(result.data)
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [joinedUser.classUser])

  return (

    <PageFrame>
      <div className="row">
        {/* 학생 계좌 */}
        <div className="col-lg-6 justify-content-center">
          {user.userData && (userAccount &&
              <Account user={user.userData.name} balance={userAccount.currentBalance} />
          )}
          <Deposit balance={userAccount.currentBalance} />
        </div>
        {/* 학생 계좌 통계 */}
        <Statistics />
      </div>
    </PageFrame>

  )
}

export default Bank;