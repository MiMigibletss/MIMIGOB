
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { withRouter } from "react-router-dom";

// import { Link } from "react-router-dom";
// import {
//   MdMailOutline,
//   MdLocationOn,
//   MdPhoneIphone,
// } from "react-icons/md";
// import TodayIs from "./TodayIs";


const Home = (props) => {
  const userInfo = useSelector(state => state.user);
  const [User, setUser] = useState({});

  let userImg;
  if (props.user.userData) {
    userImg = props.user.userData.image;
  }
  const logoutHandler = () => {
    Axios.get(`/api/mysql/users/logout`).then(response => {
      console.log(response);
      if (response.status === 200) {
        props.history.push("/sns");
      } else {
        alert('Log Out Failed')
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
       <a onClick={logoutHandler}><img className="btn-style"/>dd</a>
       {/* src={logoutIcon} */}
   <div>인냥</div></div>
  );
};
export default withRouter(Home);