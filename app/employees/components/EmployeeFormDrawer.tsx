import { z } from "zod"
import { Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerFooter,
  useDisclosure,
  Button,
} from "@chakra-ui/react"
import createEmployee from "app/employees/mutations/createEmployee"
import updateEmployee from "app/employees/mutations/updateEmployee"
import { FORM_ERROR } from "app/core/components/Form"
import { EmployeeFormSchema } from "app/employees/schemas/employeeFormSchema"
import { EmployeeForm } from "./EmployeeForm"

export const EmployeeFormDrawer = () => {
  const router = useRouter()
  const { isOpen, onClose } = useDisclosure()
  const [createEmployeeMutation] = useMutation(createEmployee)
  const [updateEmployeeMutation] = useMutation(updateEmployee)

  const handleSubmit = async (values: z.infer<typeof EmployeeFormSchema>) => {
    try {
      const mutation = values.id ? updateEmployeeMutation : createEmployeeMutation
      const employee = await mutation(values)
      await router.push(Routes.ShowEmployeePage({ employeeId: employee.id }))
    } catch (error: any) {
      return {
        [FORM_ERROR]: error.toString(),
      }
    }
  }

  return (
    <Drawer placement="right" isOpen={isOpen} onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Create employee</DrawerHeader>
        <DrawerBody>
          <EmployeeForm onSubmit={handleSubmit} id="employee-form" />
        </DrawerBody>
        <DrawerFooter>
          <Button onClick={onClose} mr="10px">
            Cancel
          </Button>
          <Button colorScheme="blue" type="submit" form="employee-form">
            Submit
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
