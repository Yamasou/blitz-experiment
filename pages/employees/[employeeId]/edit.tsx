import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "app/core/layouts/Layout"
import getEmployee from "app/employees/queries/getEmployee"
import updateEmployee from "app/employees/mutations/updateEmployee"
import { EmployeeForm, FORM_ERROR } from "app/employees/components/EmployeeForm"

export const EditEmployee = () => {
  const router = useRouter()
  const employeeId = useParam("employeeId", "number")
  const [employee, { setQueryData }] = useQuery(
    getEmployee,
    { id: employeeId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateEmployeeMutation] = useMutation(updateEmployee)

  return (
    <>
      <Head>
        <title>Edit Employee {employee.id}</title>
      </Head>

      <div>
        <h1>Edit Employee {employee.id}</h1>
        <pre>{JSON.stringify(employee, null, 2)}</pre>

        <EmployeeForm
          submitText="Update Employee"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateEmployee}
          initialValues={employee}
          onSubmit={async (values) => {
            try {
              const updated = await updateEmployeeMutation({
                id: employee.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowEmployeePage({ employeeId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditEmployeePage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditEmployee />
      </Suspense>

      <p>
        <Link href={Routes.EmployeesPage()}>
          <a>Employees</a>
        </Link>
      </p>
    </div>
  )
}

EditEmployeePage.authenticate = true
EditEmployeePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditEmployeePage
