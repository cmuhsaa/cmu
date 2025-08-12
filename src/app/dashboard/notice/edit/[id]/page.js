"use client";
import { MESSAGE } from "@/store/constant";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { revalidatePathNotice } from "../../actions";
import Loading from "@/components/Loading";
import { clientCloudinary } from "@/config/clientCloudinary";

export default function NoticeUpdate() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/notice/${id}`);
        const data = await res.json();
        if (data?.notice) {
          const fields = ["title", "description", "type", "dateTime"];
          fields.forEach((field) => setValue(field, data.notice[field]));
        }
      } catch (err) {
        console.error("Failed to fetch notice", err);
        dispatch({
          type: MESSAGE,
          payload: {
            message: "Failed to load notice data",
            status: "error",
          },
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchNotice();
  }, [id, setValue, dispatch]);

  const onSubmit = async (data) => {
    setLoading(true);

    const formData = {};
    formData.title = data.title;
    formData.description = data.description;
    formData.type = data.type;
    formData.dateTime = data.dateTime;
    formData.images = [];

    if (data.images && data.images.length > 0) {
      for (let i = 0; i < data.images.length; i++) {
        formData.images.push(await clientCloudinary(data.images[i], "notice"));
      }
    }

    const response = await fetch(`/api/notice/${id}`, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    revalidatePathNotice(id);

    dispatch({
      type: MESSAGE,
      payload: {
        message: result.message || result.error || "Unknown error",
        status: result.message ? "success" : "error",
        path: result.message ? `/notice/${id}` : "",
      },
    });
    if (!result.message) setLoading(false);
  };

  return (
    <div className="min-h-screen">
      {loading && <Loading />}
      <div className="max-w-3xl mx-auto bg-white/50 rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">Update Notice</h2>
          <p className="mt-1 text-blue-100">Edit the notice details below</p>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="title"
                  type="text"
                  {...register("title", { required: "Title is required" })}
                  className={`block p-2 w-full rounded-md shadow-sm ${
                    errors.title
                      ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  } sm:text-sm`}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.title.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  rows={5}
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className={`block p-2 w-full rounded-md shadow-sm ${
                    errors.description
                      ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  } sm:text-sm`}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Type
                </label>
                <div className="mt-1">
                  <select
                    id="type"
                    {...register("type", {})}
                    className={`block p-2 w-full rounded-md shadow-sm ${
                      errors.type
                        ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    } sm:text-sm`}
                  >
                    <option value="">Select Type</option>
                    <option value="general">General</option>
                    <option value="urgent">Urgent</option>
                  </select>
                  {errors.type && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.type.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="dateTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date & Time
                </label>
                <div className="mt-1">
                  <input
                    id="dateTime"
                    type="datetime-local"
                    {...register("dateTime", {})}
                    className={`block p-2 w-full rounded-md shadow-sm ${
                      errors.dateTime
                        ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    } sm:text-sm`}
                  />
                  {errors.dateTime && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.dateTime.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="images"
                className="block text-sm font-medium text-gray-700"
              >
                Update Images
              </label>
              <div className="mt-1">
                <input
                  id="images"
                  type="file"
                  accept="image/*"
                  {...register("images")}
                  multiple
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="mt-2 text-xs text-gray-500">
                  Upload new images to replace existing ones (optional)
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Update Notice
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
