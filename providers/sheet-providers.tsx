"use client";

import NewAccountSheet from "@/app/(protected)/(admin)/approve/_components/new-account-sheet";

const SheetProvider = () => {

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