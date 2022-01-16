import React, { useState, useCallback } from 'react';

import ButtonProof from "../../Common/components/ButtonProof"
import Stats from "../../Common/components/Stats"
import { Grommet, Box, Header } from 'grommet'
import { grommet } from "grommet/themes";

import Submit from "../../Common/services";
import { parse } from "../../Common/services/hashcash"
import Axios from 'axios';

function CoinApp() {
  const [stats, setStats] = useState({});

  function add(nextVersion){


  const variables = {
      
    hash:nextVersion,

  };

    Axios.post("/api/mysql/blocks/block", variables)
    .then((response) => {
      console.log('props.user 는 : ', response);
      if (response.data.success) {
 
        alert("Product Successfully Uploaded");
        // props.history.push("/sns/main");
      } else {
        console.log(response.data)
        alert("Failed to upload Product");
      }
    });
  }

  const onSubmit = useCallback(async () => {
    const { version: nextVersion, success, timespent, decodedhash } = await Submit(stats?.nextVersion ?? 0);
    if (success) {
      setStats({ nextVersion, timespent, ...parse(decodedhash) });
    }
    console.log(nextVersion, success, timespent, decodedhash );
    add(nextVersion);
    return success;
  }, [stats]);

  return (<Grommet theme={grommet} full>
    <Box overflow="auto" align="center" flex="grow" direction="row" justify="center" height="xlarge" fill="vertical">
      <Box align="center" justify="center" overflow="auto" flex="grow" fill="vertical">
        <Header align="baseline" direction="row" flex="shrink" justify="center" gap="medium" margin={{ "bottom": "xlarge" }} >
          <h1>미미코인 채굴장</h1>
        </Header>
        <Box align="center" justify="center" direction="row" flex="shrink" fill="horizontal" margin={{ "bottom": "xlarge" }}>
          <ButtonProof onSubmit={onSubmit} />
          <Stats data={stats} />
        </Box>
      </Box>
    </Box>
  </Grommet >
  );
}

export default CoinApp;


// const LetterWrite = (props) => {
//   const userInfo = useSelector(state => state.user);

//   const [LetterFrom, setLetterFrom] = useState("");

//   useEffect(() => {
//     if (userInfo) {
//       if (userInfo.userData) {
//         if (userInfo.userData.couple_code) {
//           setCode(userInfo.userData.couple_code);
//         }
//         if (userInfo.userData.name) {
//           setName(userInfo.userData.name);
//         }
//       }
//     }
//   }, [userInfo])
  
 
//   const onLetterFrom= (event) => {
//     setLetterFrom(event.currentTarget.value);
  
//   };

//   const user = useSelector(state => state.user);
//   const add = (event) => {

//     if (
     
//       !LetterFrom 
     
      
//     ) {
//       return alert("fill all the fields first!");
//     }

//     const variables = {
      
//       hash:LetterFrom,
  
//     };

//     Axios.post("/api/mysql/letters/write", variables)
//       .then((response) => {
//         console.log('props.user 는 : ', response);
//         if (response.data.success) {
   
//           alert("Product Successfully Uploaded");
//           props.history.push("/sns/main");
//         } else {
//           console.log(response.data)
//           alert("Failed to upload Product");
//         }
//       });
//   };
