"use client"
import AddAssetForm from "@/components/addAssetForrm";


import { Button } from "@/components/ui/button";

import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
  SelectLabel,
  SelectGroup
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TrashIcon, UploadIcon, Wand2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState, useTransition } from "react";
import axios from "axios";
import FormError from "@/components/form-error";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";


import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";



export default function Home() {  
    const [error, setError] = useState<string>("Something went wrong");
    const [categoryData, setCategoryData] = useState([]);
    const [subcategoryData, setSubCategoryData] = useState([]);
    const [locationData, setLocationData] = useState([]);
    const [manufacturerData, setManufacturerData] = useState([]);
    const [osData, setOsData] = useState([]);
    const [processorData, setProcessorData] = useState([]);
    //const [locationData, setLocationData] = useState([]);
    //const [manufacturerData, setManufacturerData] = useState([]);

    const [assetData, setAssetData] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState<number | null>(null); // Store the selected country ID


 useEffect(() => {
    const fetchData = async () => {
      try {
        const [locationResponse, categoryResponse, assetResponse, subcategoryResponse, manufacturerResponse,osResponse,processorResponse] = await Promise.all([
          axios.get("/api/locationmaster"),
          axios.get("/api/categorymaster"),
          axios.get("/api/assetmodel"),
          axios.get("/api/subcategorymaster"),
          axios.get("/api/manufacturer"),
          //
          axios.get("/api/osmaster"),
          axios.get("/api/processormaster"),
          // axios.get("http://10.14.84.34:3001/api/assetmodel"),
          // axios.get("http://10.14.84.34:3001/api/subcategorymaster"),
          // axios.get("http://10.14.84.34:3001/api/manufacturer")
        ]);

        setLocationData(locationResponse.data);
        setCategoryData(categoryResponse.data);
        setAssetData(assetResponse.data);
        setSubCategoryData(subcategoryResponse.data);
        setManufacturerData(manufacturerResponse.data);
        setOsData(osResponse.data);
        setProcessorData(processorResponse.data);
        //console.log("gdf",categoryResponse.data);
        //setLoading(false);
      } catch (error) {
        setError("Something went wrong");
        console.error("Error fetching data", error);
        //setLoading(false);
      }
    };

    fetchData();
  }, []);

  
  return (
   <main className="h-auto ">
    <div className="text-2xl rounded-md px-4 text-white/90 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% "> Add Assets
        <p className=" text-base text-white/90 dark:text-gray-400">
            Fill out the form to request a new laptop, printer, or other asset. Or Upload the CSV file
        </p>
    </div>
    <div className="p-4 space-4 flex">
        <div className="w-1/2 space-y-4">
            
            <div className="h-full p-2 space-y-2 max-w-3xl mx-auto">
            <AddAssetForm categoryData={categoryData} subcategoryData={subcategoryData} assetData={assetData}
            manufacturerData={manufacturerData} locationData={locationData} osData={osData} processorData={processorData} />
            </div>
 
        </div>
        
      </div>
    </main>
  );
}
