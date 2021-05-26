import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";


//Pages
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ClassMain from "./pages/ClassMain";
import NotFound from "./pages/NotFound";
import Cards from "./pages/Cards";
import Charts from "./pages/Charts";
import ClassList from "./pages/ClassList"
import NationalTax from  "./pages/Executive/NationalTax"
import SettingTax from  "./pages/Executive/SettingTax"
import Dashboard from "./pages/Dashboard";
import MyTax from "./pages/Executive/MyTax"
import Law from "./pages/Legislature/Law";
const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route exact path="/Classes" component={ClassList} />
            <Route exact path="/Classes/:classId" component={ClassMain} />
            <Route path="/Classes/:classId/Tax/National" component={NationalTax} />
            <Route path="/Classes/:classId/Tax/Setting" component={SettingTax} />
            <Route path="/Classes/:classId/Tax/My" component={MyTax}/>
            <Route path="/law" component={Law} />
            
            <Route path="/cards" component={Cards} />
            <Route path="/charts" component={Charts} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/charts" component={Charts} />
            <Route path="*" component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default Routes;
