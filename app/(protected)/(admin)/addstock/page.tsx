/**
 * v0 by Vercel.
 * @see https://v0.dev/t/t7tb5l3mWNs
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */


"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import ComplaintForm from "./addStockForm"
import AddStockCatridgeForm from "./addStockForm"
import { UserData } from "@/schemas"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import Cookies from 'js-cookie';
import { CartridgeType } from "@/schemas/printerSchema"


export default function AddCartrdigeStock() {
    
    const [error, setError] = useState<string | undefined>("");
    const [assets, setAssets] = useState<CartridgeType[]>([]);
    const [userData, setUserData] = useState<UserData | null>(null); // State for user data
    const router = useRouter();

    useEffect(() => {
      getData();
    }, []);
  
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

    const getData = async () => {
        try {
          const token = Cookies.get('token');
          if (!token) {
            toast.error("Token Error")
            router.push("/");
            throw new Error('Token not found in cookies');
          }
    
          const parsedToken = parseToken(token);
          if (!parsedToken) {
            toast.error("Token Error")
            router.push("/");
            //throw new Error('Unable to parse token');
          }
    
          setUserData(parsedToken); // Set user data in state
    
          const body = { token: token };
          axios.post('/api/getCatridgeInventory', body)
          .then(async (response:any) => {
            const data = response.data;
            //console.log("data --------",data)
            if(data.message==='Login Failed'){
              setError("Login Failed");
              return;
            }
            setAssets(data);
            console.log("data catrhidge", data);
          })
        } catch (error) {
          console.error('Error fetching assets:', error);
          setError("Error fetching assets. Please try again.");
          router.push("/");
        }
      };
  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 md:px-6">
      <div className="grid gap-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Manage Printer Cartridge Stocks</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Keep track of your printer cartridge inventory and easily add new stock.
          </p>
          </div>
        
        <AddStockCatridgeForm data={assets}/>
        
        
      </div>
    </div>
  )
}