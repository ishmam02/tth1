'use client';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
//import { motion, useAnimation } from 'framer-motion';
import styles from '../Styles/TopBar.module.css';
import '@fontsource/inter/300.css'; // 300 represents the font weight
import '@fontsource/jua/400.css';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@images/temple-logo-t-box.webp';
import { UserAuth } from '@context/AuthContext';
import { useEffect } from 'react';
import { Avatar } from '@mui/material';

const TopBar = () => {
  const { user, logOut } = UserAuth();

  const handleSignOut = async (e: any) => {
    logOut();
  };

  useEffect(() => {
    const checkAuthentication = async () => {};
    checkAuthentication();
  }, [user]);

  return (
    <div className={styles.topBar}>
      <Link href={'/'} className={styles.section}>
        <Image
          src={logo.src}
          alt='Logo'
          className={styles.vercelLogo}
          style={{ marginRight: '10px' }}
          width={100}
          height={100}
          priority
        />
        Temple Trading Hub
      </Link>
      <div className={styles.section2}></div>
      <div className={styles.topButtons}>
        <Stack spacing={2} direction='row'>
          <Button className={styles.buttonstyle} variant='text'>
            <Link href={'/'}>Home</Link>
          </Button>
          {/* fix later
                    <span>|</span> */}
          <Button className={styles.buttonstyle} variant='text'>
            <Link href={'/trading'}>Trading</Link>
          </Button>
          <Button className={styles.buttonstyle} variant='text'>
            <Link href={'/threads'}>Threads</Link>
          </Button>{' '}
          <Button className={styles.buttonstyle} variant='text'>
            <Link href={'/about'}>About Us</Link>
          </Button>
          {!user ? (
            <Button className={styles.buttonstyle} variant='text'>
              <Link href={'/auth/signin'}>Sign In</Link>
            </Button>
          ) : (
            <Button
              className={styles.buttonstyle}
              variant='text'
              onClick={handleSignOut}>
              Sign Out
            </Button>
          )}
          {!user ? null : <Avatar />}
        </Stack>
      </div>
    </div>
  );
};

export default TopBar;
