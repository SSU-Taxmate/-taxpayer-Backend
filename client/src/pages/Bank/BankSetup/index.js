import React from 'react';
import PageHeading from '../../../components/PageHeading';
import MangeDeposits from './MangeDeposits'
import PageFrame from '../../PageFrame';
//[추후 업데이트] import ManageCredit from './ManageCredit';
function BankSetup() {

    return (
        <PageFrame>
            <PageHeading title={'은행 설정'} />
            {/*예금 상품 관리*/}
            <h5>예금 상품 관리</h5>
            <MangeDeposits />
            {/*추후 업데이트 - 신용등급 설정
                            <h5>신용 등급 설정</h5>
                            <ManageCredit/>
                            */}
        </PageFrame>
    )
}

export default BankSetup
