"use client";
import Loading from "@/components/Loading";
import { MESSAGE } from "@/store/constant";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { revalidatePathBatches } from "../actions";

export default function BatchAdd() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setLoading(true);

    const response = await fetch(`/api/batch/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const result = await response.json();
    revalidatePathBatches();

    if (result.message) {
      dispatch({
        type: MESSAGE,
        payload: {
          message: result.message,
          status: "success",
          path: "/dashboard/batch",
        },
      });
    } else {
      dispatch({
        type: MESSAGE,
        payload: {
          message: result.error || "Failed to add batch",
          status: "error",
          path: "",
        },
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {loading && <Loading />}
      <div className="max-w-md mx-auto bg-white/50 rounded-xl shadow-md overflow-hidden md:max-w-lg w-full">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Add New Batch</h2>
            <p className="mt-2 text-sm text-gray-600">
              Fill in the details to create a new batch
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Batch Name
                <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                {...register("name", { required: true })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter batch name"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                Create Batch
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
