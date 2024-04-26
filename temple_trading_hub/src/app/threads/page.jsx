'use client';
import {
  AppBar,
  Box,
  Container,
  Fab,
  Button,
  ImageList,
  ImageListItem,
  Toolbar,
} from '@mui/material';
import '../styles/About.css';
import ThreadsCard from '@components/ThreadsCard';
import AddIcon from '@mui/icons-material/Add';
import useScreenSize from '@hooks/useScreenSize';
import { useState, useEffect } from 'react';
import { UserAuth } from '@context/AuthContext';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@firebase';


const Threads = () => {
  const [threads, setThreads] = useState([]);
  const [cols, setCols] = useState(3);
  const screenSize = useScreenSize();
  const { user } = UserAuth();

  useEffect(() => {
    if (screenSize.width > 1000) {
      setCols(3);
    } else if (screenSize.width < 760) {
      setCols(1);
    } else {
      setCols(2);
    }
  }, [screenSize.width, user]);

  useEffect(() => {
    const getThreads = async () => {
      const querySnapshot = await getDocs(collection(db, 'threads'));
      const data = [];
      querySnapshot.forEach((doc) => {
        const temp = doc.data();
        data.push(temp);
      });
      setThreads(data);
    };
    getThreads();
  }, []);

  return (
    <Container maxWidth='lg' sx={{ padding: '30px' }}>
      {threads && (
        <ImageList variant='masonry' cols={cols} gap={10}>
          {
            threads.map((doc) => {
              return (
                <ImageListItem key={doc.uid}>
                  <ThreadsCard doc={doc} edit={user && user.email == doc.userEmail ? true : false} />
                </ImageListItem>
              );
            })
          }
        </ImageList>
      )}
      {user && (
        <AppBar
          position='fixed'
          color='transparent'
          sx={{ top: 'auto', bottom: 0, boxShadow: 'none', padding: '15px' }}>
          <Toolbar>
            <Box sx={{ flexGrow: 1 }} />
            <Link href={'/threads/create'}>
              <Button color='primary' variant='contained'>
                <AddIcon sx={{ mr: 1 }} />
                Create Thread
              </Button>
            </Link>
            <Box sx={{ flexGrow: 1 }} />
          </Toolbar>
        </AppBar>
      )}
    </Container>
  );
};
export default Threads;
