
"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Navbar from "@/components/navbar/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'

import { useEffect, useState } from "react";
import axios from "axios";

import  Sidebar  from "@/components/sidebar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter()
  const [isValidToken, setIsValidToken] = useState(false); // Initialize as false

  useEffect(() => {
    validateToken();
  }, [router]);

  // Validate the token by making an API call
  const validateToken = async () => {
    const token = Cookies.get('token');

    if (!token) {
      router.replace('/'); // Redirect to login page if no token is found
      setIsValidToken(false); // Update isValidToken state
      return;
    }

    try {
      const res = await axios.get('/api/getassets', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data?.message === 'Invalid Token') {
        router.replace('/');
        setIsValidToken(false); // Update isValidToken state
      } else {
        setIsValidToken(true); // Token is valid
      }
    } catch (error) {
      console.error(error);
      router.replace('/');
      setIsValidToken(false); // Update isValidToken state on error
    }
  };
  return (

    <>
    {isValidToken ? (
        <div className="relative z-10">
          <Navbar  />
          <div className="hidden md:flex mt-16 max-w-48 flex-col fixed inset-y-0 ">
              <Sidebar/>
          </div>
          {children}
        </div>

  ):null}
  </>
  );
}
