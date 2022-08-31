import { Routes } from "@blitzjs/next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@blitzjs/rpc";
import Layout from "app/core/layouts/Layout";
import createEmployee from "app/employees/mutations/createEmployee";
import {
  EmployeeForm,
  FORM_ERROR,
} from "app/employees/components/EmployeeForm";

const NewEmployeePage = () => {
  const router = useRouter();
  const [createEmployeeMutation] = useMutation(createEmployee);

  return (
    <Layout title={"Create New Employee"}>
      <h1>Create New Employee</h1>

      <EmployeeForm
        submitText="Create Employee"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateEmployee}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const employee = await createEmployeeMutation(values);
            router.push(Routes.ShowEmployeePage({ employeeId: employee.id }));
          } catch (error: any) {
            console.error(error);
            return {
              [FORM_ERROR]: error.toString(),
            };
          }
        }}
      />

      <p>
        <Link href={Routes.EmployeesPage()}>
          <a>Employees</a>
        </Link>
      </p>
    </Layout>
  );
};

NewEmployeePage.authenticate = true;

export default NewEmployeePage;
