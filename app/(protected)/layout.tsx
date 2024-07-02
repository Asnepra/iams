 "use client"
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';
import Sidebar from '@/components/sidebar';
import Navbar from '@/components/navbar/Navbar';

interface RootLayoutProps {
  children: React.ReactNode;
}
const iamsToken="IamsToken";
const RootLayout = ({ children }: RootLayoutProps) => {
  const router = useRouter();
  const pathName=usePathname();
  const [isValidToken, setIsValidToken] = useState(false); // Initialize as false
  const [isAdmin, setIsAdmin] = useState(false); // Initialize as false

  // Validate the token and user role
  const validateToken = async () => {
    const token = Cookies.get('token');
    //console.log("token on layout", token);

    if (!token) {
      router.replace('/'); // Redirect to login page if no token is found
      setIsValidToken(false); // Update isValidToken state
      return;
    }

    try {
      const body={
        token:token
    }
      const res = await axios.post('/api/validateToken',body)
      const data=res.data;
      if(data.message==='Success'){
        setIsValidToken(true);
        if(data.isAdmin==='Admin')
          setIsAdmin(true);
      }
      else{
        router.push("/");
      }
      //console.log("data response",data);

    } catch (error) {
      //console.error(error);
      router.replace('/');
      setIsValidToken(false); // Update isValidToken state on error
    }
  };

  useEffect(() => {
    validateToken();
  }, []);


  // Render layout and children if token is valid
  return isValidToken ? (
    <div className="bg-secondary">
      <div className="relative z-10">
        <Navbar />
        <div className="hidden md:flex mt-16 max-w-48 flex-col fixed inset-y-0">
          {/* Pass isAdmin prop based on isValidToken */}
          <Sidebar isAdmin={isAdmin} />
        </div>
        {children}
      </div>
    </div>
  ) : null;
};

export default RootLayout;
