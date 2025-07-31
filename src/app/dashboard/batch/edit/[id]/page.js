"use client";
import Loading from "@/components/Loading";
import { MESSAGE } from "@/store/constant";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function BatchUpdate() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [preData, setPreData] = useState(null);

  useEffect(() => {
    const fetchBatch = async () => {
      if (id) {
        try {
          setLoading(true);
          const res = await fetch(`/api/batch/${id}`);
          const data = await res.json();
          if (data?.batch) {
            setPreData(data.batch);
            setValue("name", data.batch.name);
          }
        } catch (err) {
          console.error("Failed to fetch batch", err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchBatch();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await fetch(`/api/batch/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await response.json();

      dispatch({
        type: MESSAGE,
        payload: {
          message: result.message || result.error || "Unknown error",
          status: result.message ? "success" : "error",
          path: result.message ? `/batch` : "",
        },
      });
    } catch (error) {
      dispatch({
        type: MESSAGE,
        payload: {
          message: "Network error occurred",
          status: "error",
          path: "",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {loading && <Loading />}
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-lg w-full">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Update Batch</h2>
              <p className="text-sm text-gray-500 mt-1">
                Batch ID:{" "}
                <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                  {id}
                </span>
              </p>
            </div>
            {preData && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Active
              </span>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Batch Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                {...register("name", {
                  required: "Batch name is required",
                  minLength: {
                    value: 3,
                    message: "Batch name must be at least 3 characters",
                  },
                })}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.name ? "border-red-300" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                placeholder="Enter batch name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                Update Batch
              </button>
              <a
                href="/batch"
                className="flex-1 text-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
              >
                Cancel
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
