
"use client"
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';
import Sidebar from '@/components/sidebar';
import Navbar from '@/components/navbar/Navbar';
import { normalRoutes, itAdminRoutes, hrAdminRoutes, UserData, IT_ADMIN_USER_ROLE, HR_ADMIN_USER_ROLE } from '@/schemas';
import SheetProvider from '@/providers/sheet-providers';

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

const RootLayout = ({ children }: RootLayoutProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const [userData, setUserData] = useState<UserData | null>(null); // State for user data
  const [isValidToken, setIsValidToken] = useState(false); // Initialize as false
  const [allowedRoutes, setAllowedRoutes] = useState(normalRoutes); // State for allowed routes

  // Validate the token and user role
  const validateToken = async () => {
    const token = Cookies.get('token');

    if (!token) {
      router.replace('/'); // Redirect to login page if no token is found
      setIsValidToken(false); // Update isValidToken state
      return;
    }

    try {
      const body = {
        token: token
      };

      // Parse and set user data
      const parsedToken = parseToken(token);
      setUserData(parsedToken);

      // Validate token on server side
      const res = await axios.post('/api/validateToken', body);
      const data = res.data;

      if (data.message === 'Success') {
        setIsValidToken(true);
      } else {
        router.push("/"); // Redirect to login page if validation fails
      }

    } catch (error) {
      console.error('Error validating token:', error);
      router.replace('/');
      setIsValidToken(false); // Update isValidToken state on error
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  // Function to set allowed routes based on userRole
  const setAllowedRoutesByRole = () => {
    if (userData) {
      switch (userData.userRole) {
        case IT_ADMIN_USER_ROLE:
          setAllowedRoutes(itAdminRoutes);
          break;
        case HR_ADMIN_USER_ROLE:
          setAllowedRoutes(hrAdminRoutes);
          break;
        default:
          setAllowedRoutes(normalRoutes);
          break;
      }
    }
  };

  // Execute setAllowedRoutesByRole whenever userData changes
  useEffect(() => {
    if (isValidToken && userData) {
      setAllowedRoutesByRole();
    }
  }, [isValidToken, userData]);

  // Function to check if the current route is allowed for the user
  const checkRouteAccess = () => {
    if (!userData) return;

    const allowedRoutePaths = allowedRoutes.map(route => route.href);

    // Check if the current pathname is not in the allowed list
    if (!allowedRoutePaths.includes(pathName)) {
      router.replace('/home'); // Redirect to home page if trying to access unauthorized route
    }
  };

  // Execute checkRouteAccess whenever pathname or allowedRoutes changes
  useEffect(() => {
    if (isValidToken) {
      checkRouteAccess();
    }
  }, [pathName, allowedRoutes, isValidToken]);

  // Render layout and children if token is valid
  return isValidToken ? (
    <div className="">
      <div className="relative z-10">
        <Navbar userData={userData} routes={allowedRoutes} />
        <div className="Z-10 hidden md:flex mt-16 max-w-52 flex-col fixed inset-y-0">
          <Sidebar routes={allowedRoutes} />
        </div>
        <div className="mt-16 h-auto flex flex-col md:ml-52 bg-muted/40 mx-2 px-2 border-b">
        <SheetProvider></SheetProvider>
          {children}
        </div>
      </div>
    </div>
  ) : null;
};

export default RootLayout;
