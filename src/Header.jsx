import { Button, Grid, Typography } from '@mui/material';
import TreeMenu from './TreeMenu';
import { useContext } from 'react';
import AppContext from './context';
import { useNavigate } from 'react-router-dom';
import logo from './img/logo-re.png';

const Header = () => {

  const navigate = useNavigate();

  const { client, token, user } = useContext(AppContext);
  const logout = () => {
    client.logout();
    navigate('/');
  };

  return (
    <>
      <Grid flexDirection="column" container>
        {token && (
          <Grid item>
            <Grid alignItems="center" container>
              <Grid item m={2} flexGrow={1}>
                <Typography>{`You are logged in as ${user}`}</Typography>
              </Grid>
              <Grid item m={2}>
                <Button data-cy="logout-button" variant="contained" onClick={() => logout()}>Log Out</Button>
              </Grid>
            </Grid>
          </Grid>
        )}
        <Grid item xs={12}>
          <TreeMenu/>
        </Grid>
      </Grid>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        sx={{ marginBottom: 4, paddingBottom: 3, borderBottom: 2, borderColor: '#AEB491' }}
      >
        <Grid item xs={12} >
          <img alt="The Yorkshire Arboretum Logo" src={logo} style={{
            height: 'auto',
            width: 'auto',
            maxHeight: '90px',
            maxWidth: '100%'
          }}/>
        </Grid>
      </Grid>
    </>
  );
};

export default Header;