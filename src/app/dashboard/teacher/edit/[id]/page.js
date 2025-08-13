"use client";
import { MESSAGE } from "@/store/constant";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { revalidatePathTeacher } from "../../actions";
import Loading from "@/components/Loading";
import { clientCloudinary } from "@/config/clientCloudinary";

export default function TeacherUpdate() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch existing teacher data
  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/teacher/${id}`);
        const data = await res.json();

        if (data?.teacher) {
          reset(data.teacher); // Reset form with fetched data
        }
      } catch (err) {
        console.error("Failed to fetch teacher", err);
        dispatch({
          type: MESSAGE,
          payload: {
            message: "Failed to load teacher data",
            status: "error",
          },
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTeacher();
  }, [id, reset]);

  const onSubmit = async (data) => {
    setLoading(true);

    const formData = {};
    formData.name = data.name;
    formData.email = data.email;
    formData.phone = data.phone;
    formData.title = data.title;
    formData.about = data.about;
    formData.address = data.address;

    if (data.image && data.image.length > 0) {
      formData.image = await clientCloudinary(data.image[0], "teacher");
    }

    try {
      const response = await fetch(`/api/teacher/${id}`, {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      await revalidatePathTeacher(id);

      dispatch({
        type: MESSAGE,
        payload: {
          message: result.message || result.error || "Unable to update",
          status: result.message ? "success" : "error",
          path: `/teacher/${id}`,
        },
      });
      if (!result.message) setLoading(false);
    } catch (error) {
      dispatch({
        type: MESSAGE,
        payload: {
          message: error.message || "Update failed",
          status: "error",
        },
      });
      setLoading(false);
    } finally {
    }
  };

  return (
    <div className="min-h-screen">
      {loading && <Loading />}
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/50 shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Update Teacher</h2>
            <p className="mt-1 text-sm text-gray-600">
              Update the teacher details below
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-4">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  className={`mt-1 block p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                    errors.name ? "border-red-500" : "border"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className={`mt-1 block p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                    errors.email ? "border-red-500" : "border"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register("phone", {
                    pattern: {
                      value: /^[0-9]{10,15}$/,
                      message: "Please enter a valid phone number",
                    },
                    required: "Phone is required",
                  })}
                  className={`mt-1 block p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                    errors.phone ? "border-red-500" : "border"
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Professional Title
                </label>
                <input
                  type="text"
                  id="title"
                  {...register("title", {})}
                  className={`mt-1 block p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                    errors.title ? "border-red-500" : "border"
                  }`}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  {...register("address", {})}
                  className={`mt-1 block p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                    errors.address ? "border-red-500" : "border"
                  }`}
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* About */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-gray-700"
                >
                  About
                </label>
                <textarea
                  id="about"
                  rows={4}
                  {...register("about", {})}
                  className={`mt-1 block p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                    errors.about ? "border-red-500" : "border"
                  }`}
                />
                {errors.about && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.about.message}
                  </p>
                )}
              </div>

              {/* Profile Image */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Profile Image
                </label>
                <div className="mt-1 flex items-center">
                  <input
                    type="file"
                    id="image"
                    {...register("image", { required: "Image required" })}
                    accept="image/*"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                  {errors.image && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.about.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.push(`/teacher/${id}`)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Update Teacher
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
