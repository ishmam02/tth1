'use client';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Topbar from '@components/Topbar';
import NavBar from '@components/NavBar';
import { AuthContextProvider } from './context/AuthContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import theme from './theme';

const darkTheme = createTheme(theme('dark'));

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ThemeProvider theme={darkTheme}>
          <AuthContextProvider>
            <NavBar />
            {children}
          </AuthContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

//testing
