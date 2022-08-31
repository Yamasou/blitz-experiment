import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const UpdateEmployee = z.object({
  id: z.number(),
  fullName: z.string(),
  age: z.number(),
})

export default resolver.pipe(
  resolver.zod(UpdateEmployee),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const employee = await db.employee.update({ where: { id }, data })

    return employee
  }
)
