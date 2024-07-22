 "use client"
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';
import Sidebar from '@/components/sidebar';
import Navbar from '@/components/navbar/Navbar';
import { UserData } from '@/schemas';

interface RootLayoutProps {
  children: React.ReactNode;
}


function parseToken(token: string): UserData | null {
  try {
    const [, payloadBase64] = token.split('.');
    const decodedPayload = Buffer.from(payloadBase64, 'base64').toString('utf-8');
    const parsedPayload = JSON.parse(decodedPayload);
    return parsedPayload;
  } catch (error) {
    console.error('Error parsing token:', error);
    return null;
  }
}
const iamsToken="IamsToken";
const RootLayout = ({ children }: RootLayoutProps) => {
  const router = useRouter();
  const pathName=usePathname();
  const [userData, setUserData] = useState<UserData | null>(null); // State for user data
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
    const parsedToken = parseToken(token);
    setUserData(parsedToken); // Set user data in state

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

   // Function to check if the current route is allowed for admin users
   const checkAdminRouteAccess = () => {
    if (!isAdmin) {
    
      // Define the list of allowed admin routes
      const allowedAdminRoutes = ['/home',  '/request','/complaint'];
      // Check if the current pathname is not in the allowed list
      if (!allowedAdminRoutes.includes(pathName)) {
        router.replace('/home'); // Redirect to home page if trying to access unauthorized route
      }
    }
  };

  // Execute checkAdminRouteAccess whenever pathname or isAdmin changes
  useEffect(() => {
    checkAdminRouteAccess();
  }, [pathName, isAdmin]);


  // Render layout and children if token is valid
  return isValidToken ? (
    <div className="">
      <div className="relative z-10">
        <Navbar userData={userData}/>
        <div className="hidden md:flex mt-16 max-w-52 flex-col fixed inset-y-0">
          {/* Pass isAdmin prop based on isValidToken */}
          <Sidebar isAdmin={isAdmin} />
        </div>
        <div className="mt-16 h-auto flex flex-col md:ml-52 bg-muted/40 mx-2 px-2 border-b">
        {children}
        </div>
      </div>
    </div>
  ) : null;
};

export default RootLayout;
