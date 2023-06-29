import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import { isEmpty } from 'lodash';
import { Alert, Typography } from '@mui/material';

import AppContext from "./context";
import SignForm from './SignForm';


const EditSign = () => {
  const { client } = useContext(AppContext);
  const { id } = useParams()
  const [sign, setSign] = useState(undefined)
  const [error, setError] = useState(undefined)

  useEffect(() => {
    client.getSign(id)
      .then(({ data }) => {
        setSign(data)
      })
      .catch(() => {
        setError('Cannot find sign');
      })
  }, [])

  const navigate = useNavigate();

  if (error) {
    return (
      <Alert severity="error">{error}</Alert>
    );
  }

  if (isEmpty((sign))) {
    return (
      <Typography>Loading sign</Typography>
    );
  }

  return (
    <SignForm sign={sign} />
  );
};

export default EditSign;