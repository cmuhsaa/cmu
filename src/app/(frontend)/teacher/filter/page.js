import React, { Suspense } from "react";
import TeacherPage from "./TeacherList";
import StudentDirectorySkeleton from "../loading";

const Page = async ({ searchParams }) => {
  const params = await searchParams;
  return (
    <Suspense fallback={<StudentDirectorySkeleton />}>
      <TeacherPage key={JSON.stringify(params)} searchParams={params} />
    </Suspense>
  );
};

export default Page;
