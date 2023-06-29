import { Box, Grid, Modal, useMediaQuery, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import * as React from "react";
import { useContext, useState } from "react";
import AppContext from "./context";
import { useNavigate } from "react-router-dom";

const ASingleSign = ({ sign }) => {

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const { client } = useContext(AppContext);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const delThisSign = (id) => {
    client.deleteSign(id)
    handleClose()
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Grid flexDirection={isDesktop ? "row" : "column"} wrap="nowrap" justifyContent="space-between" container
            sx={{ backgroundColor: '#F4F2EC' }} m={2} p={2}>

        <Grid item xs={12} sm={10}>
          <Typography variant="h5">
            {`${sign.title}`}
          </Typography>
          <Typography mb={1} color="text.secondary"  sx={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: "4", WebkitBoxOrient: "vertical", }}>
            {`${sign.description}`}
          </Typography>
        </Grid>

        <Grid item>
          <Grid container alignItems={isDesktop ? "flex-end" : "center"} spacing={1} flexDirection='column'>
            <Grid item>
              <Button size="small" variant='contained' onClick={() => navigate(`/edit-sign/${sign.id}`)} data-cy={`edit-sign-${sign.id}`}>Edit</Button>
            </Grid>
            <Grid item>
              <Button size="small" variant='contained' onClick={handleOpen} data-cy={`delete-sign-${sign.id}`}>Delete</Button>
            </Grid>
            <Grid item>
              <Button size="small" variant='contained' onClick={() => navigate(`/view-qr/${sign.id}`)} data-cy={`view-code-${sign.id}`}>View QR Code</Button>
            </Grid>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-title" variant="h6" component="h2">
                  Delete
                </Typography>
                <Typography id="modal-description" m={1}>
                  Are you sure you want to delete this sign?
                </Typography>
                <Grid container>
                  <Grid item m={1}><Button variant='outlined' onClick={handleClose} data-cy='cancel-del'>Cancel</Button></Grid>
                  <Grid item m={1}><Button variant='contained' onClick={() => delThisSign(sign.id)} data-cy='confirm-del'>Delete</Button></Grid>
                </Grid>
              </Box>
            </Modal>
          </Grid>
        </Grid>

      </Grid>
    </>
  );
};

export default ASingleSign;