import { paginate } from "blitz";
import { resolver } from "@blitzjs/rpc";
import db, { Prisma } from "db";

interface GetEmployeesInput
  extends Pick<
    Prisma.EmployeeFindManyArgs,
    "where" | "orderBy" | "skip" | "take"
  > {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetEmployeesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: employees,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.employee.count({ where }),
      query: (paginateArgs) =>
        db.employee.findMany({ ...paginateArgs, where, orderBy }),
    });

    return {
      employees,
      nextPage,
      hasMore,
      count,
    };
  }
);
