import { useContext, useState } from "react";
import AppContext from "./context";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { TextField } from 'formik-mui';
import { Alert, Button, Grid, IconButton, InputAdornment, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import OurSnackbar from "./OurSnackbar";


const Signup = () => {
  const { client } = useContext(AppContext);

  const [error, setError] = useState(undefined)
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  }

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Typography variant="h4">Create a new admin</Typography>
      <Formik
        initialValues={{
          username: '',
          password: '',
          confirmationPassword: '',
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string()
            .required('Please a username'),
          password: Yup.string()
            .required('Please enter a password')
            .min(8, "Password must be at least 8 characters")
            .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*/, "Password must contain at least 1 uppercase letter and 1 number"),
          confirmationPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], "Password does not match")
            .required('Please confirm your password'),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setError(undefined);
          setSubmitting(true);
          client.signup(values)
            .then(() => {
              setSubmitting(false);
              resetForm();
              handleOpen();
            })
            .catch((error) => {
              setSubmitting(false);
              setError(error.response.data.message);
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
              <Grid item>
                <Field
                  fullWidth
                  id="confirmationPassword"
                  name="confirmationPassword"
                  data-cy="input-confirmationPassword"
                  label="Confirm Password"
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
                  Add New Admin
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      <OurSnackbar severity="success" message="New admin created" open={open} setOpen={setOpen}
                   data-cy="new-user-success"/>
    </>
  )
}

export default Signup;