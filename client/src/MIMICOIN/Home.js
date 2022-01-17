import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import CoinApp from "./COIN/CoinApp";
import BlockRead from "../Common/components/blockRead";
const Home = (props) => {
  const userInfo = useSelector((state) => state.user);
  const [User, setUser] = useState({});

  const logoutHandler = () => {
    Axios.get(`/api/mysql/users/logout`).then((response) => {
      console.log(response);
      if (response.status === 200) {
        props.history.push("/");
      } else {
        alert("Log Out Failed");
      }
    });
  };
  useEffect(() => {
    if (userInfo) {
      if (userInfo.userData) {
        setUser(userInfo.userData);
      }
    }
  }, [userInfo.userData]);

  return (
    <div>
      {/* NAV */}
      <nav class="navbar navbar-dark bg-dark">
        <a class="navbar-brand" Link="/Home">
          &nbsp;MIMICOIN
        </a>

        <div>
          &nbsp; &nbsp;
          <button class="btn btn-outline-light">
            <a onClick={logoutHandler}>로그아웃</a>
          </button>
          &nbsp; &nbsp;
        </div>
      </nav>
      {/* //NAV */}

      {/* src={logoutIcon} */}
      <div>인냥</div>
      <div>
        Your E-mail: <b> {User.email}</b>
      </div>
      <div>
        Your PublicKey: <b> {User.public}</b>
      </div>
      <CoinApp />
      <BlockRead />
    </div>
  );
};
export default withRouter(Home);
