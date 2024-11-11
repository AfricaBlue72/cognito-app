"use client";

import React, { useEffect, useState } from 'react';
import { configureAmplify } from '../libs/cognitoConfig';
import localFont from "next/font/local";
import { ThemeProvider } from './contexts/themeProvider';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthProvider } from './contexts/AuthContext';
import { SnackBarProvider } from './contexts/SnackBarContext';
import "./globals.css";

import { I18nextProvider } from 'react-i18next';
import i18n from '../i18next';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  const [error, setError] = useState(null);

  useEffect(() => {
    console.warn('RootLayout useEffect');
    // // Configure Amplify when the app component mounts
    // try {
    //   configureAmplify();
    //   console.log('Amplify configuration attempted');
    // } catch (error) {
    //   console.error('Error during Amplify configuration:', error);
    //   setError('Failed to configure Amplify');
    // }
  }, []);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <ThemeProvider>
            <SnackBarProvider>
              <Header />
              <main>{children}</main>
              <Footer />
            </SnackBarProvider>
          </ThemeProvider>
        </AuthProvider>
      </I18nextProvider>
      </body>
    </html>
  );
}
