'use client';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  Link as Li,
} from '@mui/material';
import Link from 'next/link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserAuth } from '@context/AuthContext';

const signUp = () => {
  const router = useRouter();
  const { user, signUp } = UserAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSignUp = async (e: any) => {
    e.preventDefault();
    await signUp(email, password);
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      if (user) {
        router.push('/');
      }
    };
    checkAuthentication();
  }, [user]);
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
          Sign Up
        </Typography>
        <Box component='form' noValidate onSubmit={handleSignUp} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {/* <Grid item xs={12}>
              <TextField
                autoComplete='username'
                name='userName'
                required
                fullWidth
                id='userName'
                autoFocus
                hiddenLabel
                size='small'
                variant='outlined'
                aria-label='Username*'
                placeholder='Username*'
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='email'
                name='email'
                autoComplete='email'
                onChange={(e) => setEmail(e.target.value)}
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
                autoComplete='new-password'
                onChange={(e) => setPassword(e.target.value)}
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
            Sign Up
          </Button>
          <Grid container justifyContent='center'>
            <Grid item>
              Already have an account? <Li href='/auth/signin'>Sign in</Li>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default signUp;
