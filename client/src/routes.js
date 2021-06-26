import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";


//Pages
import Main from "./pages/Main"
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ClassMain from "./pages/ClassMain";
import NotFound from "./pages/NotFound";
import Cards from "./pages/Cards";
import Charts from "./pages/Charts";
import ClassList from "./pages/ClassList"
import Dashboard from "./pages/Dashboard";
/*신용등급*/
import Credit from  "./pages/Credit"

/* 마켓 */

import MarketProduct from "./pages/Market/Market_add"
import Market from "./pages/Market"

/*클래스 설정 */
import StudentSetting from './pages/Setting/StudentSetting'
import ClassSetting from './pages/Setting/ClassSetting'
/* 증권 거래소 */
import TradeStock from "./pages/Stock/TradeStock";
import SettingStock from './pages/Stock/SettingStock'

/*국세청 */
import NationalTax from "./pages/Executive/Tax/NationalTax"
import SettingTax from "./pages/Executive/Tax/SettingTax"
import MyTax from "./pages/Executive/Tax/MyTax"
/*통계청 */
import NationStats from './pages/Executive/Statistics/T_statistics'
import SettingHw from './pages/Executive/Statistics/Setting'

import MyStats from './pages/Executive/Statistics/S_statistics'

/*법*/
import Penalty from './pages/Judicature/Penalty'
import Deposit from "./pages/Bank/Deposit";
import Law from "./pages/Legislature/Law";
import Auth from "../src/hoc/auth";

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/classes" component={ClassList} />
            <Route exact path="/classes/:classId" component={ClassMain} />
            {/* 클래스 설정 */}
            <Route exact path="/classes/:classId/student-setting" component={StudentSetting}/>
            <Route exact path="/classes/:classId/class-setting" component={ClassSetting}/>

            {/* ***************  경제  ************** */}

            {/*은행*/}
            <Route exact path="/classes/:classId/bank/deposit" component={Deposit} />

            {/* 증권 거래소 */}
            <Route exact path="/classes/:classId/stock" component={TradeStock} />
            <Route exact path="/classes/:classId/stock-setting" component={SettingStock} />
            {/* ***************  행정부  ************** */}
            {/* 국세청 */}
            <Route exact path="/classes/:classId/tax-nation" component={NationalTax} />
            <Route exact path="/classes/:classId/tax-setting" component={SettingTax} />

            <Route path="/classes/:classId/tax-my" component={MyTax} />
            <Route path="/classes/:classId/law" component={Law} />

            {/* 통계청 */}

            <Route path="/classes/:classId/stats/nation" component={NationStats} />
            <Route path="/classes/:classId/stats/nation-setting" component={SettingHw} />

            <Route path="/classes/:classId/stats/my" component={MyStats} />

            {/* ***************  사법부  ************** */}
            {/* 벌금 */}
            <Route path="/classes/:classId/penalty" component={Penalty} />


            {/*신용등급 */}
            <Route path="/classes/:classId/credit" component={Credit} />

            {/* 시장 */}

            <Route exact path="/classes/:classId/market" component={Market} />
            <Route exact path="/classes/:classId/market/marketproduct" component={MarketProduct} />


            {/* 그 외 */}
            <Route path="/cards" component={Cards} />
            <Route path="/charts" component={Charts} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/charts" component={Charts} />
            <Route path="*" component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default Routes;
