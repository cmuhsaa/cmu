"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Error = () => {
  const router = useRouter();
  router.push("/");
  return <div>Error</div>;
};

export default Error;
