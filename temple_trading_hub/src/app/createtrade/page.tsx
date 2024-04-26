'use client';

import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';

import { useEffect, useState } from 'react';
import { CloudUpload } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { UserAuth } from '@context/AuthContext';
import { useRouter } from 'next/navigation';
import { uploadTrade } from './uploadTrade';

const createTradeSchema = yup.object({
  itemname: yup
    .string()
    .required('You must name your Item')
    .min(3, 'too short')
    .max(60, 'too long'),
  description: yup.string().required('Please enter a description'),
  price: yup.string().required('Please enter a price'),
  category: yup.string().required('Please select a category'),
  location: yup.string().required('please add a Location'),
});

const createTrade = () => {
  const { user } = UserAuth();
  const [itemimage, setItemImage] = useState('');
  const [imageupload, setImageUpload] = useState('');
  const [category, setCategory] = useState('Category');
  const [location, setLocation] = useState('Location');
  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };
  const handleLocationChange = (event: SelectChangeEvent) => {
    setLocation(event.target.value);
  }

  const router = useRouter();

  const handleUploadTrade = async (e: any) => {
    await uploadTrade(
      user,
      e.itemname,
      e.description,
      e.price,
      e.category == 'Category' ? '' : e.category,
      e.location == 'Location' ? '' : e.location,
      imageupload
    )
      //@ts-ignore
      .then(router.push('/createtrade/confirmationpage'));
  };

  useEffect(() => {
    const checkItemImage = async () => {};
    checkItemImage();
  }, [itemimage]);

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
      itemname: '',
      description: '',
      price: '',
      category: '',
      location: '',
    },
    validationSchema: createTradeSchema,
    onSubmit: (values: any) => {
      handleUploadTrade(values);
      //handleCreateTrade(values);
    },
  });

  return (
    <Container
      component='main'
      maxWidth='sm'
      sx={{
        paddingTop: '4.5vh',
        minHeight: '70vh',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
      }}>
      <Grid justifyContent='center' alignItems='center'>
        <Grid item>
          <Typography
            component='h1'
            variant='h5'
            sx={{ mb: 1.5 }}
            align='center'>
            Create a trade
          </Typography>
        </Grid>
        <Grid item>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              size='small'
              variant='outlined'
              style={{ marginBottom: '1em', marginRight: '1em' }}
              id='itemname'
              name='itemname'
              aria-label='Item Name*'
              placeholder='Item Name*'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.itemname && Boolean(formik.errors.itemname)}
              //@ts-ignore
              helperText={formik.touched.itemname && formik.errors.itemname}
            />

            <TextField
              fullWidth
              multiline
              maxRows={4}
              minRows={4}
              size='small'
              variant='outlined'
              style={{ marginBottom: '1em' }}
              id='description'
              name='description'
              aria-label='Item Description*'
              placeholder='Item Description*'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              //@ts-ignore
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
            <TextField
              fullWidth
              size='small'
              variant='outlined'
              style={{ marginBottom: '1em' }}
              id='price'
              name='price'
              aria-label='Item Price*'
              placeholder='Item Price*'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.price && Boolean(formik.errors.price)}
              //@ts-ignore
              helperText={formik.touched.price && formik.errors.price}
            />
      
            <FormControl
              sx={{
                width: '100%',
                marginBottom: '1em',
                marginRight: '1em',
                borderRadius: '10px',
              }}
              variant='outlined'>

              <Select
                aria-label='Category'
                placeholder='Category'
                value={category}
                onChange={(e) => {
                  handleChange(e);
                  formik.handleChange(e);
                }}
                id='category'
                name='category'>
                <MenuItem value={'Category'}>Category</MenuItem>
                <MenuItem value={'electronics'}>Electronics</MenuItem>
                <MenuItem value={'Apparel'}>Apparel</MenuItem>
                <MenuItem value={'tools'}>Tools</MenuItem>
                <MenuItem value={'instruments'}>Instruments</MenuItem>
                <MenuItem value={'misc'}>Miscellaneous</MenuItem>
              </Select>
              </FormControl>

              <FormControl
              sx={{
                width: '100%',
                marginBottom: '1em',
                marginRight: '1em',
                borderRadius: '10px',
              }}
              variant='outlined'>
              <Select
                aria-label='Location'
                placeholder='Location'
                value={location}
                onChange={(e) => {
                  handleLocationChange(e);
                  formik.handleChange(e);
                }}
                id='location'
                name='location'>
                <MenuItem value={'Location'}>Location</MenuItem>
                <MenuItem value={'Bell Tower'}>Bell Tower</MenuItem>
                <MenuItem value={'Skate Park'}>Skate Park</MenuItem>
                <MenuItem value={'Charles Library'}>Charles Library</MenuItem>
                <MenuItem value={'Ambler Campus'}>Ambler Campus</MenuItem>
                <MenuItem value={'Center City Campus'}>Center City Campus</MenuItem>
              </Select>
              </FormControl>
            <Grid>
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
            </Grid>
            <Button
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
            <Button sx={{ float: 'right' }} type='submit' variant='contained'>
              Submit Item
            </Button>

          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default createTrade;
