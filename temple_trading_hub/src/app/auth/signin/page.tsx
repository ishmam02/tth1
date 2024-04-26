'use client';

import '../../Styles/global.css';
import { UserAuth } from '@context/AuthContext';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Link as Li,
  CssBaseline,
  Avatar,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import '../../styles/signin.css';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useFormik } from 'formik';
import * as yup from 'yup';

const signInSchema = yup.object({
  email: yup
    .string()
    .required('Provide @temple.edu Email')
    .email()
    .min(13, 'email too short')
    .max(60, 'too long'),
  password: yup.string().required('Please enter your password'),
});

const signIn = () => {
  const router = useRouter();
  const { user, signIn } = UserAuth();

  const handleSignIn = async (e: any) => {
    await signIn(e.email, e.password);
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      if (user) {
        router.push('/');
      }
    };
    checkAuthentication();
  }, [user]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signInSchema,
    onSubmit: (values: any) => {
      handleSignIn(values);
    },
  });

  return (
    <Container
      component='main'
      maxWidth='xs'
      sx={{
        height: '75vh',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
      }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Avatar sx={{ m: 1, bgcolor: 'primary.main', color: 'white' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign In
        </Typography>
        <Box
          component='form'
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='email'
                name='email'
                autoComplete='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                //@ts-ignore
                helperText={formik.touched.email && formik.errors.email}
                hiddenLabel
                size='small'
                variant='outlined'
                aria-label='Email Address*'
                placeholder='Email Address*'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='password'
                type='password'
                id='password'
                autoComplete='current-password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                //@ts-ignore
                helperText={formik.touched.password && formik.errors.password}
                hiddenLabel
                size='small'
                variant='outlined'
                aria-label='Password*'
                placeholder='Password*'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container justifyContent='center'>
            <Grid item>
              New to the platform? <Li href='/auth/signup'>Sign Up</Li>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    // <Grid
    //   container
    //   justifyContent='center'
    //   alignItems='center'
    //   direction='column'
    //   style={{ minHeight: '50vh' }}>
    //   <Grid item>
    //     <Typography variant='h4' color='primary'>
    //       Sign In
    //     </Typography>
    //   </Grid>

    //   <Grid
    //     container
    //     direction='column'
    //     alignItems='center'
    //     justifyContent='center'>
    //     <form onSubmit={formik.handleSubmit}>
    //       <TextField
    //         fullWidth
    //         id='email'
    //         name='email'
    //         value={formik.values.email}
    //         onChange={formik.handleChange}
    //         onBlur={formik.handleBlur}
    //         error={formik.touched.email && Boolean(formik.errors.email)}
    //         //@ts-ignore
    //         helperText={formik.touched.email && formik.errors.email}
    //         style={{ marginBottom: '1em' }}
    //       />

    //       <TextField
    //         fullWidth
    //         id='password'
    //         name='password'
    //         type='password'
    //         value={formik.values.password}
    //         onChange={formik.handleChange}
    //         onBlur={formik.handleBlur}
    //         error={formik.touched.password && Boolean(formik.errors.password)}
    //         //@ts-ignore
    //         helperText={formik.touched.password && formik.errors.password}
    //         style={{ marginBottom: '1em' }}
    //       />

    //       <Button type='submit' fullWidth variant='contained'>
    //         Sign In
    //       </Button>
    //     </form>
    //   </Grid>
    //   <Grid item>
    //     <Typography variant='body1'>
    //       Dont have an account? <Link href={'/auth/signup'}>Sign Up</Link>
    //     </Typography>
    //   </Grid>
    // </Grid>
  );
};

export default signIn;
