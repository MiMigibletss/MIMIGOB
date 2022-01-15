import React, { Suspense } from "react";
import Auth from "./hoc/auth";
// import EmptyPage from "./components/EmptyPage";
import { Route, Switch } from "react-router-dom";
import SnsLoginPage from "../MIMICOIN/Main/MimiLogin";


const MainPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Switch>
      {/* <Route exact path="/" component={Auth(EmptyPage, null, null)} />; */}

      <Route exact path="/" component={Auth(SnsLoginPage, false, true)} />
    </Switch>
  </Suspense>
);

export default MainPage;
