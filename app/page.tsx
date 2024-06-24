import Image from "next/image";
import Link from "next/link";

import LoginForm from "@/components/login-form";

export default function Login() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] bg-[#ece3d6]">
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
            <h1 className="text-2xl sm:text-2xl lg:text-4xl font-bold text-[#c4a97e]">
              Conference Hall Booking
            </h1>
          </div>
          <LoginForm />
          <div className="mt-4 text-center text-lg text-[#95866f]">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline text-[#c4a97e]">
              Go Study and clear the exam to join IOCL and then book Room
            </Link>
          </div>
        </div>
      </div>
      <div className="rounded-lg hidden lg:block">
        <Image
          src="/meeting_room.jpeg"
          alt="Image"
          width="1920"
          height="1080"
          className="rounded-lg h-full w-full object-cover dark:brightness-[0.2]"
        />
      </div>
    </div>
  );
}
