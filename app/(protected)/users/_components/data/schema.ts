


import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
})

export type Task = z.infer<typeof taskSchema>

// import { z } from "zod";

// export const employeeDetailsSchema = z.object({
//   empNumber: z.string(),
//   empName: z.string(),
//   empDepartment: z.string(),
//   empMail: z.string(),
//   empProfilePicture: z.string(),
//   empRole: z.string(),
// });

// export type EmployeeDetails = z.infer<typeof employeeDetailsSchema>;

// export const departmentSummarySchema = z.object({
//   empDepartment: z.string(),
//   employeeCount: z.number(),
// });

// export type DepartmentSummary = z.infer<typeof departmentSummarySchema>;
