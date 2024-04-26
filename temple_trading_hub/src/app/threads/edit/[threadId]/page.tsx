'use client';

import {
  Button,
  Container,
  Stack,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

import { useEffect, useState } from 'react';
import '@styles/signIn.css';
import '@styles/global.css';
import { CloudUpload } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { UserAuth } from '@context/AuthContext';
import { useRouter } from 'next/navigation';
import { updateThread, deleteThread } from './modifyThread';
import { db } from '@firebase';
import { doc, getDoc } from 'firebase/firestore';

const createThread = ({ params }) => {
  const { user } = UserAuth();
  const [itemimage, setItemImage] = useState('');
  const [description, setDescription] = useState('');
  const [imageupload, setImageUpload] = useState('');
  const [thread, setThread] = useState('');
  const { threadId }: any = params;

  const router = useRouter();

  const handleUploadThread = async (e: any) => {
    await updateThread(e.description, imageupload, threadId)
      //@ts-ignore
      .then(router.push('/threads'));
  };

  const handleDeleteThread = async (e: any) => {
    await deleteThread(
      user.uid,
      threadId,
      thread.images && `${threadId}+${thread.images}`
    )
      //@ts-ignore
      .then(router.push('/threads'));
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (threadId) {
        const docRef = doc(db, 'threads', threadId);
        const docSnap: any = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setItemImage(data.imageUrl);
          setDescription(data.description);
          setThread(data);
        } else {
          router.push('/threads');
        }
      }
    };

    fetchProduct();
  }, []);

  useEffect(() => {
    const checkAuthentication = async () => {
      if (!user) {
        router.push('/');
      }
    };
    checkAuthentication();
  }, [user]);

  const formik = useFormik({
    initialValues: {
      description: description,
    },
    onSubmit: (values: any) => {
      handleUploadThread(values);
    },
  });

  return (
    <Container
      component='main'
      maxWidth='sm'
      sx={{
        paddingTop: '50px',
        minHeight: '70vh',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
      }}>
      <Typography component='h1' variant='h5' sx={{ mb: 1.5 }}>
        Create a thread
        <Button
          className={'submitButton'}
          sx={{ float: 'right', marginBottom: 1 }}
          type='submit'
          variant='contained'
          onClick={handleDeleteThread}>
          Delete Thread
        </Button>
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          multiline
          maxRows={4}
          minRows={4}
          size='small'
          variant='outlined'
          defaultValue={description}
          className={'outlinedTextField'}
          style={{ marginBottom: '1em' }}
          id='description'
          name='description'
          aria-label='Thread*'
          placeholder='Thread*'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          //@ts-ignore
          helperText={formik.touched.description && formik.errors.description}
        />
        {!itemimage ? null : (
          <Grid
            item
            component='img'
            justifySelf='center'
            alignSelf='center'
            width='100%'
            sx={{
              border: '2px solid #9D2235',
              mb: 1.5,
            }}
            alt=''
            src={itemimage}></Grid>
        )}
        <Button
          className={'submitButton'}
          sx={{ marginBottom: '1em' }}
          component='label'
          role={undefined}
          variant='contained'
          tabIndex={-1}
          startIcon={<CloudUpload />}>
          Upload Image
          <input
            type='file'
            accept='image/*'
            hidden
            id='image'
            name='image'
            onChange={(e: any) => {
              const fileReader = new FileReader();
              fileReader.onload = () => {
                if (fileReader.readyState === 2) {
                  formik.setFieldValue('image', fileReader.result);
                  //@ts-ignore
                  setItemImage(fileReader.result);
                  setImageUpload(e.target.files[0]);
                }
              };
              fileReader.readAsDataURL(e.target.files[0]);
            }}
          />
        </Button>

        <Button
          className={'submitButton'}
          sx={{ float: 'right' }}
          type='submit'
          variant='contained'>
          Edit Thread
        </Button>
      </form>
    </Container>
  );
};

export default createThread;
