'use client'

import Image from "next/image"
import Link from "next/link";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();
  return (
    <Link href="/">
        <Image className="cursor-pointer" alt="Logo" src="/ic_logo.gif" height={150} width={150}
         />
    </Link>
  )
}

export default Logo;