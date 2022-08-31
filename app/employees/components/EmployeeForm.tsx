import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export const EmployeeForm = <S extends z.ZodType<any, any>>(props: FormProps<S>) => {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="fullName" label="Name" />
      <LabeledTextField name="age" type="number" label="Age" />
    </Form>
  )
}
