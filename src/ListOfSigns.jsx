import { Button, Container, Grid, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import AppContext from './context';
import { useNavigate } from 'react-router-dom';

const ListOfSigns = () => {
  const { signs, client } = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(() => {
    client.getSigns()
  }, [])

  if(!signs.length > 0) {
    return (
      <Typography>There are no signs to show currently.</Typography>
    )
  }

  return (
    <Container>
      {signs.map((sign, i) => (
        <Grid container justifyContent="space-between" key={i} sx={{ minWidth: 300, maxWidth: 400 }}>
          <Grid item>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {sign.title}
            </Typography>
          </Grid>
          <Grid item>
            <Button onClick={() => navigate(`/signs/${sign.id}`)}   data-cy={`sign${sign.id}`}>
              VIEW
            </Button>
          </Grid>
        </Grid>)
      )}
    </Container>
  )
}

export default ListOfSigns