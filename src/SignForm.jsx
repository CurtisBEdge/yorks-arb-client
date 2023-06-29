import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Alert, Button, Grid, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-mui';
import Image from 'mui-image';
import { isEmpty, isNil } from 'lodash';

import AppContext from './context';

const SignForm = ({ sign }) => {

  const { client, baseUrl } = useContext(AppContext);
  const [error, setError] = useState(undefined);
  const [hasChangedImage, setHasChangedImage] = useState(false);

  const isEditing = !isEmpty(sign)

  const navigate = useNavigate();

  const createFormData = (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('lat', values.lat);
    formData.append('lon', values.lon);
    formData.append('signImage', values.signImage);
    return formData
  };

  const [file, setFile] = useState('');

  return (
    <>
      <Typography variant="h4" pb={1}>{isEditing ? 'Edit Sign' : 'Add New Sign'}</Typography>
      <Formik
        initialValues={{
          title: isEditing ? sign.title : '',
          description: isEditing ? sign.description : '',
          lat: isEditing ? sign.lat : '',
          lon: isEditing ? sign.lon : '',
          signImage: null,
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string()
            .required('A title is required'),
          description: Yup.string()
            .required('A description is required'),
          lat: Yup.number()
            .required('Latitude is required')
            .typeError('The latitude must be a number'),
          lon: Yup.number()
            .required('Longitude is required')
            .typeError('The longitude must be a number'),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          setError(undefined)
          const formData = createFormData(values);
          const submitter = isEditing ? client.editSign : client.createSign;
          submitter(formData, isEditing ? sign.id : null)
            .then(() => {
              setSubmitting(false);
              resetForm()
              setFile('')
              navigate('/view-signs')
            })
            .catch(() => {
              setSubmitting(false);
              setError('Error uploading sign')
            })
        }
        }
      >
        {({ dirty, isValid, isSubmitting, values, setValues }) => (
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
                  id="title"
                  name="title"
                  data-cy="title"
                  label="Sign Title"
                  component={TextField}
                />
              </Grid>
              <Grid item>
                <Field
                  fullWidth
                  multiline
                  maxRows={10}
                  id="description"
                  name="description"
                  data-cy="description"
                  label="Sign Description"
                  component={TextField}
                />
              </Grid>
              <Grid container direction="row" spacing={2} padding={2}>
                <Grid item>
                  <Field
                    fullWidth
                    id="lat"
                    name="lat"
                    data-cy="lat"
                    label="Latitude"
                    component={TextField}
                  />
                </Grid>
                <Grid item>
                  <Field
                    fullWidth
                    id="lon"
                    name="lon"
                    data-cy="lon"
                    label="Longitude"
                    component={TextField}
                  />
                </Grid>
              </Grid>
              {(isEditing && !hasChangedImage && !isNil(sign.signImageId)) && (
                <Grid>
                  <Image center width={200} src={`${baseUrl}/sign-images/${sign.signImageId}`}/>
                </Grid>
              )}
              <Grid item>
                <Field
                  name="signImage"
                  accept="image/png, image/jpg"
                  id="signImage"
                  data-cy="uploadedImage"
                  label="Sign Image"
                  value={file}
                  onChange={(e) => {
                    setValues({
                      ...values,
                      signImage: e.target.files[0]
                    });
                    setHasChangedImage(true);
                    setFile(e.target.value)
                  }}
                  type="file"
                />
              </Grid>
              <Grid item m={1}>
                <Button
                  data-cy="submit-button"
                  variant="contained"
                  type="submit"
                  disabled={!dirty || isSubmitting || !isValid}
                >
                  {isEditing ? 'Update Sign' : 'Create Sign'}
                </Button>
              </Grid>
            </Grid>
          </Form>)}
      </Formik>
    </>
  )
}

export default SignForm;