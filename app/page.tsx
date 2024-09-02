import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import LoginForm from "@/components/login-form";

export default function Login() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-full bg-[#ece3d6]">
      <div className="flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full sm:max-w-md lg:max-w-lg gap-6">
          <div className="flex justify-center items-center w-full">
            <Image
              src="/iocl_logo.png"
              alt="Image"
              width="220"
              height="120"
              className="rounded-lg object-cover dark:brightness-[0.2]"
            />
          </div>
          <div className="grid gap-2 text-center">
            <h1 className="text-2xl sm:text-2xl lg:text-4xl font-bold text-[#398ef0]">
              e-Catridge Request Portal
            </h1>
          </div>
          <LoginForm />
          <Button
            size={"sm"}
            variant={"link"} asChild
                    className="font-normal px-0"
                  >
                    <Link target="_blank" href="https://apps.indianoil.in/emppwd/">Forgot Password?</Link>
                  </Button>
        </div>
      </div>
      <div className="rounded-lg hidden lg:block">
        <Image
          src="/asset.webp"
          alt="Image"
          width="1920"
          height="1080"
          className="rounded-lg h-full w-full object-cover dark:brightness-[0.2]"
        />
      </div>
    </div>
  );
}
