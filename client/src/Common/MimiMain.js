import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "./hoc/auth";
import Home from "../MIMICOIN/Home";
// import Profile from "../SNS/Profile";
// import Latter from "../SNS/Latter";
// import Pic from "../SNS/Pic";
// import Jam from "../SNS/Jam";
// import Write from "../SNS/Profile/Write";
// import LatterWrite from "../SNS/Latter/LatterWrite";
// import UpdateProfile from "../SNS/UpdateProfile";
// import ChangeCondition from "../SNS/MyPage/ChangeCondition";

function SNSMain() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="sns_main-container">
        <Switch>
          {/* SNS */}
          <Route exact path="/sns/main" component={Auth(Home, true, true)} />
          {/* <Route
            path="/sns/profile/Write"
            component={Auth(Write, true, true)}
          />
          <Route
            path="/UpdateProfile"
            component={Auth(UpdateProfile, true, true)}
          />
          <Route
            path="/sns/Latter/LatterWrite"
            component={Auth(LatterWrite, true, true)}
          />
          <Route
            path="/ChangeCondition"
            component={Auth(ChangeCondition, true, true)}
          /> */}
        </Switch>
      </div>
    </Suspense>
  );
}

export default SNSMain;
