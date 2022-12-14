import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import Layout from "app/core/layouts/Layout";
import getTask from "app/tasks/queries/getTask";
import updateTask from "app/tasks/mutations/updateTask";
import { TaskForm, FORM_ERROR } from "app/tasks/components/TaskForm";

export const EditTask = () => {
  const router = useRouter();
  const taskId = useParam("taskId", "number");
  const [task, { setQueryData }] = useQuery(
    getTask,
    { id: taskId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );
  const [updateTaskMutation] = useMutation(updateTask);

  return (
    <>
      <Head>
        <title>Edit Task {task.id}</title>
      </Head>

      <div>
        <h1>Edit Task {task.id}</h1>
        <pre>{JSON.stringify(task, null, 2)}</pre>

        <TaskForm
          submitText="Update Task"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateTask}
          initialValues={task}
          onSubmit={async (values) => {
            try {
              const updated = await updateTaskMutation({
                id: task.id,
                ...values,
              });
              await setQueryData(updated);
              router.push(Routes.ShowTaskPage({ taskId: updated.id }));
            } catch (error: any) {
              console.error(error);
              return {
                [FORM_ERROR]: error.toString(),
              };
            }
          }}
        />
      </div>
    </>
  );
};

const EditTaskPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditTask />
      </Suspense>

      <p>
        <Link href={Routes.TasksPage()}>
          <a>Tasks</a>
        </Link>
      </p>
    </div>
  );
};

EditTaskPage.authenticate = true;
EditTaskPage.getLayout = (page) => <Layout>{page}</Layout>;

export default EditTaskPage;
