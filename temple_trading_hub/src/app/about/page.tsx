import { Container } from '@mui/material';
import '../styles/About.css';
import React from 'react';

const About = () => {
  return (
    <Container className='about-container' maxWidth='lg'>
      <h1>About Temple University Trading Hub</h1>
      <p>
        Temple University Trading is a place where students are able to Buy and
        Sell their goods with each other in a safe environment. This is a website that
        is meant to be used only by students and employees with a valid Temple email address. Trades will
        occur in designated safe areas located on-campus. We want to make it
        easier for everyone to buy and sell goods safely.</p>
      <p></p>
      <p>Join our Owl Trading Community Today!</p>
      <div className='image-container'>
        <img src='/images/Owl.png' alt='Owl' className='owl-image' />{' '}
        {/* Using relative path to the image */}
      </div>
    </Container>
  );
};
export default About;
