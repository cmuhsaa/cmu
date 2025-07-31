"use client";
import { revalidatePathStudent } from "@/app/dashboard/student/actions";
import { MESSAGE } from "@/store/constant";
import React from "react";
import { useDispatch } from "react-redux";

const DeleteStudent = ({ id }) => {
  const dispatch = useDispatch();
  return (
    <button
      onClick={async () => {
        const response = await fetch(`/api/student/${id}`, {
          method: "DELETE",
          credentials: "include",
          body: new FormData(),
        });

        const result = await response.json();
        revalidatePathStudent(id);
        dispatch({
          type: MESSAGE,
          payload: {
            message: "Student has been deleted",
            status: "info",
            path: `/dashboard/student/request`,
          },
        });
      }}
    >
      Delete
    </button>
  );
};

export default DeleteStudent;
