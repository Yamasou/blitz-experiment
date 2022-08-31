import { Suspense } from "react"
import Head from "next/head"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import Layout from "app/core/layouts/Layout"
import getEmployees from "app/employees/queries/getEmployees"
import { Box, Button, useDisclosure, VStack } from "@chakra-ui/react"
import { EmployeesList } from "app/employees/components/EmployeesList"
import { EmployeeFormDrawer } from "app/employees/components/EmployeeFormDrawer"

const ITEMS_PER_PAGE = 100

const EmployeesPage = () => {
  const router = useRouter()
  const { onOpen } = useDisclosure()
  const page = Number(router.query.page) || 0
  const [{ employees }] = usePaginatedQuery(getEmployees, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  return (
    <Layout>
      <Head>
        <title>Employees</title>
      </Head>

      <VStack align="stretch" spacing={6}>
        <Box textAlign="right">
          <Button onClick={onOpen}>open</Button>
          <EmployeeFormDrawer />
        </Box>
        <Box>
          <Suspense fallback={<div>Loading...</div>}>
            <EmployeesList employees={employees} />
          </Suspense>
        </Box>
      </VStack>
    </Layout>
  )
}

export default EmployeesPage
