import React, { useState, useCallback } from 'react';

import ButtonProof from "../../Common/components/ButtonProof"
import Stats from "../../Common/components/Stats"
import { Grommet, Box, Header } from 'grommet'
import { grommet } from "grommet/themes";

import Submit from "../../Common/services";
import { parse } from "../../Common/services/hashcash"

function CoinApp() {
  const [stats, setStats] = useState({});

  const onSubmit = useCallback(async () => {
    const { version: nextVersion, success, timespent, decodedhash } = await Submit(stats?.nextVersion ?? 0);
    if (success) {
      setStats({ nextVersion, timespent, ...parse(decodedhash) });
    }

    return success;
  }, [stats]);

  return (<Grommet theme={grommet} full>
    <Box overflow="auto" align="center" flex="grow" direction="row" justify="center" height="xlarge" fill="vertical">
      <Box align="center" justify="center" overflow="auto" flex="grow" fill="vertical">
        <Header align="baseline" direction="row" flex="shrink" justify="center" gap="medium" margin={{ "bottom": "xlarge" }} >
          <h1>React Proof of Work Sample</h1>
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
