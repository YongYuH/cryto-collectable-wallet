import { Router } from "@reach/router";
import React from "react";

import Detail from "./Detail";
import List from "./List";

const Assets = () => {
  return (
    <Router basepath="assets">
      <List path="/" />
      <Detail path="/:assetContractAddress/:tokenId" />
    </Router>
  )
}

export default Assets
