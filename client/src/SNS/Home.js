import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { withRouter } from "react-router-dom";

// import { Link } from "react-router-dom";
// import {
//   MdMailOutline,
//   MdLocationOn,
//   MdpublicIpublic,
// } from "react-icons/md";
// import TodayIs from "./TodayIs";

const Home = (props) => {
  const userInfo = useSelector((state) => state.user);
  const [User, setUser] = useState({});

  let userImg;
  if (props.user.userData) {
    userImg = props.user.userData.image;
  }
  const logoutHandler = () => {
    Axios.get(`/api/mysql/users/logout`).then((response) => {
      console.log(response);
      if (response.status === 200) {
        props.history.push("/sns");
      } else {
        alert("Log Out Failed");
      }
    });
  };
  // useEffect(() => {
  //   if (userInfo) {
  //     if (userInfo.userData) {
  //       setUser(userInfo.userData);
  //       if (userInfo.userData.couple_code) {
  //         setCoupleCode(userInfo.userData.couple_code);
  //       }
  //     }
  //   }
  // }, [userInfo.userData]);

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
            <a onClick={logoutHandler}>
              로그아웃
            </a>
          </button>
          &nbsp; &nbsp;
        </div>
      </nav>
      {/* //NAV */}

      {/* src={logoutIcon} */}
      <div>인냥</div>
    </div>
  );
};
export default withRouter(Home);
