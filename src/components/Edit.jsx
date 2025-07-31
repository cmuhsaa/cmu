"use client";
import React from "react";
import Link from "next/link";

const Edit = ({ model, id }) => {
  return (
    <>
      <>
        {model == "dashboard" ? (
          <Link href={`${id}`}>Dashboard</Link>
        ) : (
          <Link href={`/dashboard/${model}/edit/${id}`}>Update {model}</Link>
        )}
      </>
    </>
  );
};

export default Edit;
