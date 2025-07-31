"use client";
import { useRouter } from "next/navigation";
import React from "react";

const NotFound = () => {
  const router = useRouter();
  router.push("/");
  return <div>NotFound</div>;
};

export default NotFound;
