import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

//Pages
import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ClassMain from "./pages/ClassMain";
import NotFound from "./pages/NotFound";
import Charts from "./pages/Charts";
import ClassList from "./pages/ClassList";
import Dashboard from "./pages/Dashboard";

/*신용등급*/
import Credit from "./pages/Credit";

/*은행 */
import Bank from "./pages/Bank/CurrentBank";

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
import Deposit from "./pages/Bank/Deposit";
import Law from "./pages/Legislature/Law";
import Entactment from "./pages/Legislature/Enactment";
import Auth from "../src/hoc/auth";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Auth(Main, null)} />
      <Route exact path="/signin" component={Auth(SignIn, false)} />
      <Route exact path="/signup" component={Auth(SignUp, false)} />
      <Route exact path="/classes" component={Auth(ClassList, true)} />
      <Route exact path="/classes/:classId" component={ClassMain} />
      {/* 클래스 설정 - 선생님만이 들어갈 수 있음 */}
      <Route
        exact
        path="/classes/:classId/set-up/student"
        component={StudentSetting}
      />
      <Route
        exact
        path="/classes/:classId/set-up/class"
        component={ClassSetting}
      />

      {/* ***************  경제  ************** */}

      {/*은행*/}
      <Route exact path="/classes/:classId/bank" component={Bank} />
      <Route exact path="/classes/:classId/bank/deposit" component={Deposit} />

      {/* 증권 거래소 */}
      <Route exact path="/classes/:classId/stock" component={TradeStock} />
      <Route
        exact
        path="/classes/:classId/set-up/stock"
        component={SettingStock}
      />

      {/* ***************  행정부  ************** */}
      {/* 국세청 */}
      <Route
        exact
        path="/classes/:classId/national-tax"
        component={NationalTax}
      />
      <Route exact path="/classes/:classId/set-up/tax" component={SettingTax} />
      {/*법*/}
      <Route exact path="/classes/:classId/tax-invoice" component={MyTax} />
      <Route exact path="/classes/:classId/law" component={Law} />
      <Route exact path="/classes/:classId/set-up/law" component={Entactment} />

      {/* 통계청 */}

      <Route
        exact
        path="/classes/:classId/national-stats"
        component={NationStats}
      />
      <Route
        exact
        path="/classes/:classId/set-up/stats"
        component={SettingHw}
      />

      <Route
        exact
        path="/classes/:classId/personal-stats"
        component={MyStats}
      />

      {/* ***************  사법부  ************** */}
      {/* 벌금 */}
      <Route exact path="/classes/:classId/penalty" component={Penalty} />

      {/*신용등급 */}
      <Route exact path="/classes/:classId/credit" component={Credit} />

      {/* 시장 */}

      <Route exact path="/classes/:classId/market" component={Market} />
      <Route
        exact
        path="/classes/:classId/market/marketproduct"
        component={MarketProduct}
      />
      <Route
        exact
        path="/classes/:classId/real_estate_setting"
        component={EstateSetting}
      />

      {/* 그 외 */}
      <Route path="/charts" component={Charts} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/charts" component={Charts} />
      <Route path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
