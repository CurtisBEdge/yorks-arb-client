import { useContext, useState } from 'react';
import AppContext from './context';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary, Box, Grid,
  Link,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/css'

const TreeMenu = () => {
  const { token } = useContext(AppContext)
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const menuCSS = css`
    margin-bottom: 5vh;
  `;

  const loggedIn = Boolean(token);

  const menuItems = [
    { title: 'HOME', visible: true, path: '/', external: false },
    { title: 'PORTAL HOME', visible: loggedIn, path: '/gatehouse', external: false },
    { title: 'ADD ADMIN', visible: loggedIn, dataCy: 'add-new-user', path: '/add-new-user', external: false },
    { title: 'ACCOUNT', visible: loggedIn, dataCy: 'change-password', path: '/change-password', external: false },
    { title: 'QR CODE LOCATIONS', visible: true, dataCy: '', path: '/list-of-signs', external: false },
    { title: 'ADD SIGN', visible: loggedIn, dataCy: 'add-sign', path: '/add-sign', external: false},
    { title: 'EDIT SIGNS', visible: loggedIn, dataCy: 'edit-sign', path: '/view-signs', external: false},
    {
      title: 'THE YORKSHIRE ARBORETUM',
      visible: true,
      dataCy: '',
      path: 'https://www.yorkshirearboretum.org/',
      external: true
    },
    {
      title: 'EVENTS CALENDAR',
      visible: true,
      dataCy: '',
      path: 'https://www.yorkshirearboretum.org/events',
      external: true
    }
  ]

  return (
    <Accordion
      expanded={expanded}
      elevation={0}
      square
      sx={{ backgroundColor: '#FFFFFF' }}
      className={menuCSS}
    >
      <AccordionSummary
        sx={{ borderBottom: 2, borderColor: '#AEB491' }}
      >
        <Typography sx={{ margin: 'auto' }} data-cy="menu" onClick={() => setExpanded(!expanded)}>MENU</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
        >
          {menuItems.filter((item) => item.visible).map((menuItem, i) => (
            <Grid item xs={12} key={i} sx={{cursor: 'pointer'}}>
              {menuItem.external ? (
                <Link
                  onClick={() => setExpanded(false)}
                  href={menuItem.path}
                  target="_blank"
                  rel="noreferrer"
                >
                  {menuItem.title}
                </Link>
              ) : (
                <Link
                  data-cy={menuItem.dataCy}
                  onClick={() => {
                    navigate(menuItem.path);
                    setExpanded(false)
                  }}
                >
                  {menuItem.title}
                </Link>
              )}
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

export default TreeMenu;