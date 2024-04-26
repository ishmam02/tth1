'use client'
//import Image from "next/image";
import './styles/global.css';
import './styles/About.css';
import '@fontsource/kadwa/700.css';
// import Item from '@components/ItemEx';
// import img1 from './images/plato_complete_works.jpg';
import vans from './Images/worn_Vans.webp';
import guitar from './Images/A_guitar.jpg';
import airpods from './Images/airpods.webp';
// import img4 from './Images/worn_Vans.webp';
// import img5 from './Images/used_iphone_xr.webp';
import brad from './images/brad.webp';
import angelina from './images/angelina.webp';
import React, { useEffect, useState } from 'react';
import { Container, CssBaseline, Box, Avatar, Stack, Button, Typography } from '@mui/material';
import Link from 'next/link';
import { db } from '@firebase';
import { collection, getDocs } from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';


const Vans = vans.src;
const Guitar = guitar.src;
const Airpods = airpods.src;
const Brad = brad.src;
const Angelina = angelina.src;
// const Sweater = img3.src;
// const vans = img4.src;
// const XR = img5.src;
//import Stack from '@mui/material/Stack';
//import Button from '@mui/material/Button';

//testing

// Example hero image - replace with your specific image
import heroImage from './Images/splashgraphic.jpg';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  createdAt: Date; 
 }

function ElegantSite() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const productsRef = collection(db, 'listings');
        const snapshot = await getDocs(productsRef);
        const products: Product[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFeaturedProducts(products);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };

 
    fetchFeaturedProducts();

    // Set up listener for changes in the 'listings' collection
    const unsubscribe = onSnapshot(collection(db, 'listings'), (snapshot) => {
      const updatedProducts: Product[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFeaturedProducts(updatedProducts);
    });

    // Clean up listener
    return () => unsubscribe();
  }, []);

  const addNewItem = async () => {
    try {
       await addDoc(collection(db, 'listings'), {
         title: 'New Item',
         description: 'Description of new item',
         price: 0,
         imageUrl: 'URL_of_new_item_image',
         createdAt: new Date(), // Ensure this field is included
       });
       console.log('New item added successfully!');
    } catch (error) {
       console.error('Error adding new item:', error);
    }
   };

  return (
    <React.Fragment>
      <CssBaseline />
      {/* Hero Section */}
      <Container maxWidth="md" sx={{
          height: '30vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: `url(${heroImage.src})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          color: '#333',
          textAlign: 'center',
          padding: 4,
          borderRadius: '40px',
          marginBottom: '45px',
          marginTop: '60px',
      }}>
      <img src={heroImage.src} alt="Hero Image" style={{
          width: '55%',
          height: 'auto',
          borderRadius: '40px',
          boxShadow: '0px 0px 15px 5px rgba(255, 0, 0, 0.7)' // Red glow effect
      }} />
  
  </Container>

      {/* Product Showcase */}
      <Container maxWidth="md" sx={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
        <Typography variant="h4" sx={{ marginBottom: 3 }}>
          Featured Products
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 3, marginTop: 3, whiteSpace: 'nowrap' }}>
          {featuredProducts.slice(0, 5).map(product => (
            <Box key={product.id} sx={{ textAlign: 'center', margin: '20px', display: 'inline-block' }}>
              <Link href={`/trading/${product.id}`} passHref>
                <Box sx={{ display: 'inline-block', textDecoration: 'none', color: 'inherit', position: 'relative' }}>
                 <Avatar
                   alt={product.title}
                   src={product.imageUrl}
                   sx={{
                     width: 200,
                     height: 200,
                     marginBottom: 1,
                     borderRadius: '50%', 
                     boxShadow: '0 0 10px 3px rgba(255, 0, 0, 0.5)', 
                   }}
                 />
                 <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{product.title}</Typography>
                 <Typography variant="body2">${product.price}</Typography>
                </Box>
              </Link>
            </Box>
          ))}
        </Box>
      </Container>
      
      {/* Testimonials */}
      <Container maxWidth="md" sx={{ marginTop: 3 }}>
        <Typography variant="h4" sx={{ marginBottom: 3 }}>
          Testimonials
        </Typography>
        {/* Testimonial 1 */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <Avatar alt="Brad Pitt" src={Brad} sx={{ marginRight: 2 }} />
          <Box sx={{ backgroundColor: '#333', padding: '20px', borderRadius: '10px', width: '100%' }}>
            <Typography variant="body1" sx={{ fontStyle: 'italic', marginBottom: 1 }}>
              "What a great way to trade items on-campus!"
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              - Brad Pitt
            </Typography>
          </Box>
        </Box>
 
        
        {/* Testimonial 2 */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <Avatar alt="Angelina Jolie" src={Angelina} sx={{ marginRight: 2 }} />
          <Box sx={{ backgroundColor: '#333', padding: '20px', borderRadius: '10px', width: '100%' }}>
            <Typography variant="body1" sx={{ fontStyle: 'italic', marginBottom: 1 }}>
              "It's so easy to find the items that I wanted!"
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              - Angelina Jolie
            </Typography>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default ElegantSite;









// function ImageAvatars() {
//   return (
//     <Stack direction="row" spacing={2}>
//       <React.Fragment>
//         <CssBaseline />
//         <Container maxWidth="sm" sx={{
//           display: 'flex',       // Makes the container a flex container
//           flexDirection: 'column', // Stack children vertically
//           alignItems: 'center',  // Center horizontally
//           justifyContent: 'center', // Center vertically
//           height: '200vh'         // Use full viewport height
//         }}>

//           {/* Box with rounded corners */}
//           <Box sx={{
//             bgcolor: '#e89d1e',
//             width: '100%',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'top',
//             padding: 2,
//             borderRadius: '16px'  // Rounded corners, adjust this value as needed
//           }}>
//             <Avatar alt="Worn Vans" src={vans.src} sx={{ width: 100, height: 100 }} />
//             <Avatar alt="A Guitar" src={guitar.src} sx={{ width: 100, height: 100 }} />
//             <Avatar alt="Airpods" src={airpods.src} sx={{ width: 100, height: 100 }} />
//           </Box>

//         </Container>
//       </React.Fragment>
//     </Stack>
    
//   );

  
// }
// export default ImageAvatars; 
 

/* function Hub() {
  return (
    // <main className={styles.Hello}>
    //   <div className={styles.upper_content}>
    //     <div className={styles.display_demo}>
    //       <Item
    //         imageUrl={Plato}
    //         item_name='Plato complete works'
    //         item_condition='Good Condition'
    //       />
    //       <Item
    //         imageUrl={Sweater}
    //         item_name='pastel-sweater'
    //         item_condition='Never Worn'
    //       />
    //       <Item
    //         imageUrl={StanleyCup}
    //         item_name='Stanley Cup - white'
    //         item_condition='never used'
    //       />
    //       <Item
    //         imageUrl={vans}
    //         item_name='Low Top Vans - Black'
    //         item_condition='Heavily Used'
    //       />
    //       <Item
    //         imageUrl={Rev}
    //         item_name='Revenge Hoodie Embroidered'
    //         item_condition='Never Worn'
    //       />
    //       <Item
    //         imageUrl={XR}
    //         item_name='Iphone XR - Black'
    //         item_condition='used'
    //       />
    //     </div>
    //     <div className={styles.slogan}>
    //       <h1 id={styles.one}>
    //         Trading made <span>Simple</span>,
    //       </h1>
    //       <h1 id={styles.two}>
    //         Trading made <span>Safe</span>,
    //       </h1>
    //       <h1 id={styles.three}>
    //         Trading made <span>Easy</span>.
    //       </h1>
    //     </div>
    //   </div>
    // </main>
    <Container className='about-container' maxWidth='lg'>
      <div className='about-container'>
        <h1>
          Trading made <span>SIMPLE</span>
        </h1>
        <h1>
          Trading made <span>Safe</span>
        </h1>
        <h1>
          Trading made <span>Easy</span>
        </h1>
      </div>
    </Container>
  );
} */

//export default Hub;
