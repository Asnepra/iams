"use client";

import NewAccountSheet from "@/app/(protected)/(admin)/approve/_components/new-account-sheet";
import { useEffect, useState } from "react";

const SheetProvider = () => {

  
  

  const [isMounted, setIsMounted]= useState(false);

  useEffect(()=>{
    setIsMounted(true);
  })

  if(!!isMounted) return null;

//   const isMounted = useMountedState()

//   if(!isMounted) return null
  
  return (
    <>
      <NewAccountSheet />
      {/* <EditAccountSheet /> */}
    </>
  )
}

export default SheetProvider