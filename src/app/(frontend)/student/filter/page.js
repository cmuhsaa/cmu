import React, { Suspense } from "react";
import StudentPage from "./StudentList";
import StudentDirectorySkeleton from "../loading";

const Page = async ({ searchParams }) => {
  const params = await searchParams;
  return (
    <Suspense
      key={JSON.stringify(params)}
      fallback={<StudentDirectorySkeleton />}
    >
      <StudentPage searchParams={params} />
    </Suspense>
  );
};

export default Page;
