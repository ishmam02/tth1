'use client';
import * as React from 'react';
import '../Styles/global.css';
import styles from '../Styles/trading.module.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
//import { motion, useAnimation } from 'framer-motion';
import '@fontsource/inter/300.css'; // 300 represents the font weight
import '@fontsource/jua/400.css';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import { UserAuth } from '@context/AuthContext';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import { AppBar, Toolbar, Container,ToggleButton, ToggleButtonGroup } from '@mui/material';
import ItemsList from '../components/ItmesList';
import useScreenSize from '@hooks/useScreenSize';


const trading = () => {
  const { user } = UserAuth();
  const [cols, setCols] = useState(3);
  const screenSize = useScreenSize();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setSelectedCategory(newAlignment);
  };

  useEffect(() => {
    if (screenSize.width > 1000) {
      setCols(3);
    } else if (screenSize.width < 760) {
      setCols(1);
    } else {
      setCols(2);
    }
  }, [screenSize.width, user]);

  return (
    <Container maxWidth='lg' sx={{ padding: '30px', mt: 1 }}>
      <ToggleButtonGroup
      color="primary"
      value={selectedCategory}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      sx={{ flexDirection: 'row', flexWrap: 'wrap' }}
      >
        <ToggleButton value="all">All</ToggleButton>
        <ToggleButton value="electronics">Electronics</ToggleButton>
        <ToggleButton value="Apparel">Apparel</ToggleButton>
        <ToggleButton value="tools">Tools</ToggleButton>
        <ToggleButton value="instruments">Instruments</ToggleButton>
        <ToggleButton value="misc">Miscelleneous</ToggleButton>
      </ToggleButtonGroup>
      <br/>
      <br/>
      <ImageList variant='masonry' cols={cols} gap={10}>
        <ItemsList category={selectedCategory} />
      </ImageList>
      {user && (
        <AppBar
          position='fixed'
          color='transparent'
          sx={{ top: 'auto', bottom: 0, boxShadow: 'none', padding: '15px' }}>
          <Toolbar>
            <Box sx={{ flexGrow: 1 }} />
            <Link href={'/createtrade'}>
              <Button color='primary' variant='contained'>
                <AddIcon sx={{ mr: 1 }} />
                Create Trade
              </Button>
            </Link>
            <Box sx={{ flexGrow: 1 }} />
          </Toolbar>
        </AppBar>
      )}
    </Container>
  );
};

export default trading;
