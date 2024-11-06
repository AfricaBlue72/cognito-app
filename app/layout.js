"use client";

import React, { useEffect, useState } from 'react';
import { configureAmplify } from '../libs/cognitoConfig';
import localFont from "next/font/local";
import { Providers } from './themeProvider';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthProvider } from '../libs/AuthContext';
import { SnackBarProvider } from './context/SnackBarContext';
import "./globals.css";

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
    // Configure Amplify when the app component mounts
    try {
      configureAmplify();
      console.log('Amplify configuration attempted');
    } catch (error) {
      console.error('Error during Amplify configuration:', error);
      setError('Failed to configure Amplify');
    }
  }, []);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          <Providers>
            <SnackBarProvider>
              <Header />
              <main>{children}</main>
              <Footer />
            </SnackBarProvider>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
