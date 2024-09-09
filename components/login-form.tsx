"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import axios from 'axios';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/schemas";

import { useTransition, useState } from "react";

import Link from "next/link";
import FormError from "./form-error";

const LoginForm = () => {


  const [isPending, startTransition] = useTransition();
  const router= useRouter();
  const [isAuthenticated , setisAuthented] = useState(false); // TODO: ADD 2FA
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
  startTransition(() => {

    axios.post("http://10.14.84.38:9001/api/loginauth2",{
      username:values.email,
    password:values.password

    }).then((response)=>{
      //console.log("login auth response", response.data[0]);
      const d=response.data[0];
      //console.log("auth status", d.auth_status);
      setisAuthented(d.auth_status);
      if(d.auth_status){

        axios.post('/api/login', values)
        .then(async (response:any) => {
        const data = response.data;
        //console.log("data --------",data)
        if(data.message==='Login Failed'){
          setError("Login Failed");
          return;
        }
        
          const { token } = data;
        document.cookie = `token=${token}; path=/`
        //console.log("lgoin success", token);
        router.push('/home')
          // Handle successful login
          // Uncomment this section and implement the logic as needed
          // form.reset(); // Optionally reset the form
          // setSuccess("Login successful");
          // Redirect user, update UI, etc.
        
      })
      .catch((err:any) => {
        // Handle other errors (e.g., network errors)
        setError("Something went wrong.");
      });
    }
    else{
      setError("Incorrect credentials");
    }
      
    }).catch((error)=>{
      setError("Login Failed, try again");
      //console.log("error login", error);
    })
   

    
  
  });
};


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

          <>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0051xxx"
                      {...field}
                      type="number"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="******"
                      {...field}
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        
        
        <FormError message={error} />
        <Button type="submit" className="w-full" disabled={isPending}>
          {"Login"}
        </Button>
      </form>
    </Form>
  );
};
export default LoginForm;
