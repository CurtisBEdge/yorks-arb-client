import * as React from 'react';

import { useContext, useEffect } from "react";
import AppContext from "./context";
import { Container, Grid } from "@mui/material";
import ASingleSign from "./ASingleSign";
import Typography from "@mui/material/Typography";

const ViewSigns = () => {

  const { client, signs } = useContext(AppContext);

  useEffect(() => {
    client.getSigns()
  }, [])

  if(!signs.length > 0) {
    return (
      <Typography>There are no signs to show yet. Create one.</Typography>
    )
  }

  return (
    <Container>
      {signs.map((sign, i) => (
        <ASingleSign sign={sign} key={i} />
      ))}
    </Container>

  )
}
export default ViewSigns;