import { useContext, useState } from "react";
import AppContext from "./context";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { TextField } from 'formik-mui';
import { Alert, Button, Grid, IconButton, InputAdornment, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";


const Login = () => {
  const { client } = useContext(AppContext);

  const [error, setError] = useState(undefined)
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Typography variant="h4">Welcome to the Staff Portal</Typography>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string()
            .required('Please enter your username'),
          password: Yup.string()
            .required('Please enter your password')
            .min(8, "Password must be at least 8 characters")
            .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*/, "Password must contain at least 1 uppercase letter and 1 number"),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setError(undefined);
          setSubmitting(true);
          client.login(values)
            .then(() => {
              setSubmitting(false);
              resetForm();
            })
            .catch((error) => {
              setSubmitting(false);
              setError((error.response.status === 401) ? 'Username or password is incorrect' : '');
            })
        }}
      >
        {({ dirty, isValid, isSubmitting }) => (
          <Form>
            <Grid container direction="column" spacing={2} padding={2}>
              {error && (
                <Alert severity={'error'}>
                  {error}
                </Alert>
              )}
              <Grid item>
                <Field
                  fullWidth
                  id="username"
                  name="username"
                  data-cy="input-username"
                  label="Username"
                  component={TextField}
                />
              </Grid>
              <Grid item>
                <Field
                  fullWidth
                  id="password"
                  name="password"
                  data-cy="input-password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={togglePassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  component={TextField}
                />
              </Grid>
              <Grid item m={1}>
                <Button
                  data-cy="submit-button"
                  variant="contained"
                  disabled={!dirty || isSubmitting || !isValid}
                  type="submit"
                >
                  Log in
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default Login;