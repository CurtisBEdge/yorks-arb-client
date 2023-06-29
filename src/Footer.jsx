import { Container, Typography } from "@mui/material";
import { css } from "@emotion/css";

const Footer = () => {

  return (
    <Container className={
      css`
        margin-bottom: 40px;
        border-top: solid #AEB491 2px;
      `}
    >
      <Typography variant='subtitle2'>Testing</Typography>
    </Container>
  )
}

export default Footer

