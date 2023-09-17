import { useState } from "react";
import { Box, Button, Typography, useTheme, useMediaQuery, TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import EditOutlinedIcon from '@mui/icons-material/EditOffOutlined';
import { Formik } from "formik";
import * as yup from 'yup';
import { useDispatch } from "react-redux";
import { json, useNavigate } from "react-router-dom";
import { setLogin } from "state";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";

// controller for registration form
const registrationSchema = yup.object().shape({
  firstName: yup.string().required('required'),
  lastName: yup.string().required('required'),
  email: yup.string().email('invalid email').required('required'),
  password: yup.string().required('required'),
  picture: yup.string().required('required'),
});

// controller for our login form
const loginSchema = yup.object().shape({
  email: yup.string().email('invalid email').required('required'),
  password: yup.string().required('required')
});

// set initial values for registration form
const initialRegisterValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  picture: ''
};

// set initial values for log in form
const initialLoginValues = {
  email: '',
  password: ''
}

const Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isNotMobile = useMediaQuery('(min-width: 600px)')
  const { palette } = useTheme();

  const [page, setPage] = useState('login');
  const [visible, setVisible] = useState(false);

  const isLogin = page === 'login';
  const isRegister = page === 'register';

  const handleVisibility = () => {
    setVisible(!visible);
  };

  const register = async (values, onSubmitProps) => {
    const formData = new FormData() // to send image in body
    for (let value in values) {
      formData.append(value, values[value])
    }
    formData.append('picturePath', values.picture.name)
    const savedUserResponse = await fetch(
      'http://localhost:1337/auth/register',
      {
        method: 'POST',
        body: formData
      }
    );

    const savedUser = savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPage('login');
    }
  }

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch(
      'http://localhost:1337/auth/login',
      {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      }
    );

    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(setLogin({
        user: loggedIn.user,
        token: loggedIn.token
      }));
      navigate('/home');
    }

  }

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);


  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialLoginValues : initialRegisterValues}
      validationSchema={isLogin ? loginSchema : registrationSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display='grid'
            gap='30px'
            gridTemplateColumns='repeat(4, minmax(0, 1fr))'
            sx={{
              '& > div': { gridColumn: isNotMobile ? undefined : 'span 4' }
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label='First name'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name='firstName'
                  error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: 'span 4' }}

                />
                <TextField
                  label='Last name'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name='lastName'
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: 'span 4' }}
                />
                <Box
                  gridColumn='span 4'
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius='5px'
                  p='1rem'
                >
                  <Dropzone
                    acceptedFiles='.jpg,.jpeg,.png'
                    multiple={false}
                    onDrop={(acceptedFiles) => setFieldValue('picture', acceptedFiles[0])}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p='1rem'
                        sx={{ '&:hover': { cursor: 'pointer' } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add your best pic!</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}

                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}
            <TextField
              label='Email'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name='email'
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: 'span 4' }}
            />
            <TextField
              label='Password'
              type={visible ? 'text' : 'password'}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name='password'
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: 'span 4' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    onClick={handleVisibility}
                    position='end'
                    sx={{
                      '&:hover': {
                        cursor: 'pointer'
                      }
                    }}
                  >
                    {visible ? <Visibility /> : <VisibilityOff />}
                  </InputAdornment>
                )
              }}
            />

          </Box>
          <Box>
            <Button
              fullWidth
              type='submit'
              sx={{
                m: '2rem 0',
                p: '1rem',
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                '&:hover': { color: palette.primary.main }
              }}>
              {isLogin ? 'LOGIN' : 'REGISTER'}
            </Button>
            <Typography
              onClick={() => {
                setPage(isLogin ? 'register' : 'login');
                resetForm();
              }}
              sx={{
                textDecoration: 'underline',
                color: palette.primary.main,
                '&:hover': {
                  cursor: 'pointer',
                  color: palette.primary.light
                }
              }}
            >
              {isLogin ? 'Dont have an account? Sign up here.' : 'Already a member? Log in!'}
            </Typography>
          </Box>
        </form>
      )}

    </Formik>
  )
}

export default Form