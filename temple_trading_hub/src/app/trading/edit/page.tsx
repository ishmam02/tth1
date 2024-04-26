"use client"

import { UserAuth } from "@context/AuthContext";
import { CloudUpload } from "@mui/icons-material";
import { Button, Container, FormControl, Grid, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as yup from 'yup'; 
import { updateTrade } from './updateTrade';
import { deleteTrade } from "./deleteTrade";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@firebase";

const createTradeSchema = yup.object({
    itemname: yup
      .string()
      .min(3, 'too short')
      .max(60, 'too long'),
    description: yup.string(),
    price: yup.string(),
    category: yup.string(),
    location: yup.string(),
  });

const editTrade = () => {
    const searchParams = useSearchParams();

    const { user } = UserAuth();
    const [product, setProduct] = useState("");
    const [itemimage, setItemImage] = useState(searchParams.get('imageurl'));
    const [imageupload, setImageUpload] = useState('');
    const [category, setCategory] = useState("Category");
    const [location, setLocation] = useState('Location');

    useEffect(() => {
        const fetchProduct = async () => {
          if (searchParams.get("id")) {
            //@ts-ignore
            const docRef = doc(db, 'listings', searchParams.get("id"));
            const docSnap: any = await getDoc(docRef);
    
            if (docSnap.exists()) {
              setProduct(docSnap.data());
            } else {
              console.log('Product not found');
            }
          }
        };
    
        fetchProduct();
      }, []);

    const handleLocationChange = (event: SelectChangeEvent) => {
      setLocation(event.target.value);
    }

    const handleChange = (e: SelectChangeEvent) => {
      setCategory(e.target.value);
    };

    const handleDelete = async() => {
        //@ts-ignore
        await deleteTrade(user.email, searchParams.get("id"), product.images[0]).then(router.push("/"));
    }
  
    const router = useRouter();

    const handleUploadTrade = async (e: any) => {

        await updateTrade(
          user,
          e.itemname,
          e.description,
          e.price,
          e.category == 'Category' ? '' : e.category,
          e.location == 'Location' ? '' : e.location,
          imageupload,
          searchParams.get("id")
        )
          //@ts-ignore
          .then(router.push('/createtrade/confirmationpage'));
      };

    const formik = useFormik({
        initialValues: {
            //@ts-ignore
          itemname: product.title,
          //@ts-ignore
          description: product.description,
          //@ts-ignore
          price: product.price,
          //@ts-ignore
          category: product.category,
          //@ts-ignore
          location: product.location
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
        <Button
        variant="contained"
        sx={{ float: 'right', marginBottom: 1 }}
        onClick={handleDelete}>Delete Trade</Button>
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
              //@ts-ignore
              defaultValue={product.title}
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
              //@ts-ignore
              defaultValue={product.description}
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
              //@ts-ignore
              defaultValue={product.price}
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
              variant='outlined'
              >
              <Select
                aria-label='Category'
                placeholder='Category'
                value={category}
                onChange={(e) => {
                    //@ts-ignore
                  handleChange(e);
                  formik.handleChange(e);
                }}
                id='category'
                name='category'
                //@ts-ignore
                defaultValue={product.category}>
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
              {!itemimage ? (
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
                //@ts-ignore
                src={product.imageUrl}></Grid>
              ) : (
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
}


export default editTrade;