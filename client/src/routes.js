import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

//Pages
import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ClassMain from "./pages/ClassMain";
import NotFound from "./pages/NotFound";
import ClassList from "./pages/ClassList";

/*신용등급*/
import Credit from "./pages/Credit";

/*은행 */
import Bank from "./pages/Bank/CurrentBank";
import BankSetup from './pages/Bank/BankSetup'
/* 마켓 */

import MarketProduct from "./pages/Market/Market_add";
import Market from "./pages/Market";
import EstateSetting from "./pages/Market/real_estate_setting";

/*클래스 설정 */
import StudentSetting from "./pages/Setting/StudentSetting";
import ClassSetting from "./pages/Setting/ClassSetting";
/* 증권 거래소 */
import TradeStock from "./pages/Stock/TradeStock";
import SettingStock from "./pages/Stock/SettingStock";
import AccountStock from './pages/Stock/AccountStock'
/*국세청 */
import NationalTax from "./pages/Executive/Tax/NationalTax";
import SettingTax from "./pages/Executive/Tax/SettingTax";
import MyTax from "./pages/Executive/Tax/MyTax";
/*통계청 */
import NationStats from "./pages/Executive/Statistics/T_statistics";
import SettingHw from "./pages/Executive/Statistics/SetUp";

import MyStats from "./pages/Executive/Statistics/S_statistics";

/*법*/
import Penalty from "./pages/Judicature/Penalty";
import Law from "./pages/Legislature/Law";
import Congress from "./pages/Legislature/Congress";
import Auth from "../src/hoc/auth";
import ManageStock from "./pages/Stock/SettingStock/sections/ManageStock";
import SuggestDetail from "./pages/Legislature/Congress/components/SuggestDetail";
import BillDetail from "./pages/Legislature/Congress/components/BillDetail";
import SuggestAdd from "./pages/Legislature/Congress/components/SuggestAdd";


const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Auth(Main, null)} />
      <Route exact path="/signin" component={Auth(SignIn, false)} />
      <Route exact path="/signup" component={Auth(SignUp, false)} />
      <Route exact path="/classes" component={Auth(ClassList,true)} />
      <Route exact path="/classes/:classId" component={Auth(ClassMain,true)} />
      {/* 클래스 설정 - 선생님 */}
      <Route exact path="/classes/:classId/set-up/student" component={Auth(StudentSetting,true,true)}/>
      <Route exact path="/classes/:classId/set-up/class"component={Auth(ClassSetting,true)}/>

      {/* ***************  경제  ************** */}

      {/*은행*/}
      <Route exact path="/classes/:classId/bank" component={Auth(Bank,true)} />
      <Route exact path = "/classes/:classId/bank/manage" component={Auth(BankSetup,true,true)}/>
      
      {/* 증권 거래소 */}
      <Route exact path="/classes/:classId/stock" component={Auth(TradeStock,true)} />
      <Route exact path="/classes/:classId/stock/account" component={Auth(AccountStock,true)}/>
      <Route exact path="/classes/:classId/stock/manage" component={Auth(SettingStock,true,true)}/>
      <Route exact path="/classes/:classId/stock/manage/detail" component={Auth(ManageStock,true,true)}/>

      {/* ***************  행정부  ************** */}
      {/* 국세청 */}
      <Route exact path="/classes/:classId/national-tax" component={Auth(NationalTax,true)} />
      <Route exact path="/classes/:classId/tax/manage" component={Auth(SettingTax,true,true)} />
      <Route exact path="/classes/:classId/tax-invoice" component={Auth(MyTax,true)} />

      {/*법*/}
      <Route exact path="/classes/:classId/law" component={Auth(Law,true)}/>
      <Route exact path="/classes/:classId/congress" component={Auth(Congress,true)}/>
      <Route exact path="/classes/:classId/congress/suggest" component={Auth(SuggestDetail,true)}/>
      <Route exact path="/classes/:classId/congress/bill" component={Auth(BillDetail,true)}/>
      <Route exact path="/classes/:classId/congress/add" component={Auth(SuggestAdd,true)}/>





      {/* 통계청 */}

      <Route exact path="/classes/:classId/national-stats" component={Auth(NationStats,true,true)}/>
      <Route exact path="/classes/:classId/stats/manage" component={Auth(SettingHw,true,true)}  />

      <Route exact path="/classes/:classId/personal-stats"  component={Auth(MyStats,true)} />

      {/* ***************  사법부  ************** */}
      {/* 벌금 */}
      <Route exact path="/classes/:classId/penalty" component={Auth(Penalty,true)} />

      {/*신용등급 */}
      <Route exact path="/classes/:classId/credit" component={Auth(Credit,true)} />

      {/* 시장 */}

      <Route exact path="/classes/:classId/market" component={Auth(Market,true)} />
      <Route exact  path="/classes/:classId/market/marketproduct" component={Auth(MarketProduct,true)}/>
      <Route exact path="/classes/:classId/real_estate_setting"component={Auth(EstateSetting,true)}/>

      {/* 그 외 */}
      <Route path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
