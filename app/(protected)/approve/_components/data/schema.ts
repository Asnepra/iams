


import { z } from "zod"




export const catridgeSchema=z.object({
  empDepartment: z.string(),
  empMail: z.string(),
  empName: z.string(),
  empNumber: z.string(),
  empProfilePicture: z.string(),
  empRole: z.string(),
})

export type Catridge = z.infer<typeof catridgeSchema>
