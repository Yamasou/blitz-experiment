import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "app/core/layouts/Layout"
import getEmployee from "app/employees/queries/getEmployee"
import deleteEmployee from "app/employees/mutations/deleteEmployee"

export const Employee = () => {
  const router = useRouter()
  const employeeId = useParam("employeeId", "number")
  const [deleteEmployeeMutation] = useMutation(deleteEmployee)
  const [employee] = useQuery(getEmployee, { id: employeeId })

  return (
    <>
      <Head>
        <title>Employee {employee.id}</title>
      </Head>

      <div>
        <h1>Employee {employee.id}</h1>
        <pre>{JSON.stringify(employee, null, 2)}</pre>

        <Link href={Routes.EditEmployeePage({ employeeId: employee.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteEmployeeMutation({ id: employee.id })
              router.push(Routes.EmployeesPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowEmployeePage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.EmployeesPage()}>
          <a>Employees</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Employee />
      </Suspense>
    </div>
  )
}

ShowEmployeePage.authenticate = true
ShowEmployeePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowEmployeePage
