import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const DeleteEmployee = z.object({
  id: z.number(),
});

export default resolver.pipe(
  resolver.zod(DeleteEmployee),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const employee = await db.employee.deleteMany({ where: { id } });

    return employee;
  }
);
