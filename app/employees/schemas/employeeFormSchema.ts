import { z } from "zod"

export const EmployeeFormSchema = z.object({
  id: z.number().optional(),
  fullName: z.string(),
  age: z.number(),
})
