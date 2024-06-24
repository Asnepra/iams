import * as zod from "zod";

export const LoginSchema = zod.object({
  email: zod.string().min(6,{message:"Emoployee Number 6 digit is required"}),
  password: zod.string().min(1, { message: "Password is required" }),
});
