import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { usePaginatedQuery } from "@blitzjs/rpc";
import { useRouter } from "next/router";
import Layout from "app/core/layouts/Layout";
import getTasks from "app/tasks/queries/getTasks";

const ITEMS_PER_PAGE = 100;

export const TasksList = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ tasks, hasMore }] = usePaginatedQuery(getTasks, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
  const goToNextPage = () => router.push({ query: { page: page + 1 } });

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <Link href={Routes.ShowTaskPage({ taskId: task.id })}>
              <a>{task.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  );
};

const TasksPage = () => {
  return (
    <Layout>
      <Head>
        <title>Tasks</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewTaskPage()}>
            <a>Create Task</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <TasksList />
        </Suspense>
      </div>
    </Layout>
  );
};

export default TasksPage;
