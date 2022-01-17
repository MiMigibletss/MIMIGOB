import React, { useState, useCallback } from "react";

import ButtonProof from "../../Common/components/ButtonProof";
import Stats from "../../Common/components/Stats";
import { Grommet, Box, Header } from "grommet";
import { grommet } from "grommet/themes";

import Submit from "../../Common/services";
import { parse } from "../../Common/services/hashcash";
import Axios from "axios";

function CoinApp(props) {
  const [stats, setStats] = useState({});

  const onSubmit = useCallback(async () => {
    const {
      version: nextVersion,
      success,
      timespent,
      decodedhash,
    } = await Submit(stats?.nextVersion ?? 0);
    if (success) {
      setStats({ nextVersion, timespent, ...parse(decodedhash) });
    }
    // console.log(nextVersion, success, timespent, decodedhash );
    // add(nextVersion);
    console.log(nextVersion, success, timespent, decodedhash);
    add(decodedhash);
    return success;
  }, [stats]);

  function add(decodedhash) {
    const variables = {
      hash: decodedhash,

      // version: decodedhash,
      // timespent: decodedhash,
      // nonce: nonce,
      // date: decodedhash,
    };

    Axios.post("/api/mysql/blocks/block", variables).then((response) => {
      console.log("props.user 는 : ", response);
      console.log("1111");
      if (response.data.success) {
        console.log("22222");
        alert("Block Successfully Uploaded");
        // props.history.push("/sns/main");
      } else {
        console.log(response.data);
        console.log("33333");
        alert("Failed to upload Block");
      }
    });
  }

  return (
    <Grommet theme={grommet} full>
      <Box
        overflow="auto"
        align="center"
        flex="grow"
        direction="row"
        justify="center"
        height="xlarge"
        fill="vertical"
      >
        <Box
          align="center"
          justify="center"
          overflow="auto"
          flex="grow"
          fill="vertical"
        >
          <Header
            align="baseline"
            direction="row"
            flex="shrink"
            justify="center"
            gap="medium"
            margin={{ bottom: "xlarge" }}
          >
            <h1>미미코인 채굴장</h1>
          </Header>
          <Box
            align="center"
            justify="center"
            direction="row"
            flex="shrink"
            fill="horizontal"
            margin={{ bottom: "xlarge" }}
          >
            <ButtonProof onSubmit={onSubmit} />
            <Stats data={stats} />
          </Box>
        </Box>
      </Box>
    </Grommet>
  );
}

export default CoinApp;
