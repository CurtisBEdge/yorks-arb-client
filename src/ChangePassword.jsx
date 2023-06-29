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
      <Typography variant="h4" pb={1}>Account Settings</Typography>
      <Typography variant="h5">Change Password</Typography>
      <Formik
        initialValues={{
          newPassword: '',
          confirmationNewPassword: '',
        }}
        validationSchema={Yup.object().shape({
          newPassword: Yup.string()
            .required('Please enter a password')
            .min(8, "Password must be at least 8 characters")
            .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*/, "Password must contain at least 1 uppercase letter and 1 number"),
          confirmationNewPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], "Password does not match")
            .required('Please confirm your password'),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setError(undefined);
          setSubmitting(true);
          client.changePassword(values)
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
                  id="newPassword"
                  name="newPassword"
                  data-cy="input-password"
                  label="New Password"
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
                  id="confirmationNewPassword"
                  name="confirmationNewPassword"
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
                  type="submit"
                  disabled={!dirty || isSubmitting || !isValid}
                >
                  Change Password
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      <OurSnackbar severity="success" message="Your password has been updated" open={open} setOpen={setOpen}
                   data-cy="change-pw-success"/>
    </>
  )
}

export default Signup;