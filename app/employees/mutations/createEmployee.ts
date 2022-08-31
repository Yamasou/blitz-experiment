import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { EmployeeFormSchema } from "../schemas/employeeFormSchema"

export default resolver.pipe(
  resolver.zod(EmployeeFormSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const employee = await db.employee.create({ data: input })

    return employee
  }
)
