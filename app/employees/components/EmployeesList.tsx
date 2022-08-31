import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer } from "@chakra-ui/react"
import { Employee } from "@prisma/client"

type Props = {
  employees: Array<Employee>
}

export const EmployeesList = ({ employees }: Props) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th isNumeric>age</Th>
          </Tr>
        </Thead>
        <Tbody>
          {employees.map(({ id, fullName, age }) => (
            <Tr key={id}>
              <Td>{id}</Td>
              <Td>{fullName}</Td>
              <Td isNumeric>{age}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
