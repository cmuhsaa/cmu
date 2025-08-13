"use client";
import { MESSAGE } from "@/store/constant";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { revalidatePathStudent } from "../actions";
import { committee } from "@/lib/committee";
import Loading from "@/components/Loading";
import { clientCloudinary } from "@/config/clientCloudinary";

export default function MemberAdd() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [batches, setBatches] = useState([]);
  const [isLoadingBatches, setIsLoadingBatches] = useState(true);

  // Fetch batch list on mount
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const res = await fetch(`/api/batch`);
        const data = await res.json();
        setBatches(data.batches || []);
      } catch (err) {
        console.error("Failed to fetch batches", err);
      } finally {
        setIsLoadingBatches(false);
      }
    };
    fetchBatches();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);

    const formData = {};
    formData.name = data.name;
    formData.email = data.email;
    formData.phone = data.phone;
    formData.batch = data.batch;
    formData.about = data.about;
    formData.profession = data.profession;
    formData.address = data.address;
    formData.type = data.type;
    formData.isActive = true;

    if (data.image && data.image.length > 0) {
      formData.image = await clientCloudinary(data.image[0], "student");
    }

    try {
      const response = await fetch(`/api/student`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      revalidatePathStudent();

      dispatch({
        type: MESSAGE,
        payload: {
          message: result.message || result.error || "Unknown error",
          status: result.message ? "success" : "error",
          path: result.message ? "/student" : "",
        },
      });
      if (!result.message) setLoading(false);
    } catch (error) {
      dispatch({
        type: MESSAGE,
        payload: {
          message: error.message || "Network error occurred",
          status: "error",
          path: "",
        },
      });
      setLoading(false);
    } finally {
    }
  };

  return (
    <div className="min-h-screen">
      {loading && <Loading />}
      <div className="max-w-3xl mx-auto bg-white/50 rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Add New Member</h2>
            <p className="mt-2 text-gray-600">
              Fill in the member details below
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                  id="name"
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.name ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
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
                  id="email"
                  type="email"
                  {...register("email", {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
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
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="01712345678"
                  {...register("phone", {
                    pattern: {
                      value: /^[0-9]{10,15}$/,
                      message: "Please enter a valid phone number",
                    },
                    required: "Phone is required",
                  })}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.phone ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Batch */}
              <div>
                <label
                  htmlFor="batch"
                  className="block text-sm font-medium text-gray-700"
                >
                  Batch <span className="text-red-500">*</span>
                </label>
                <select
                  id="batch"
                  {...register("batch", { required: "Please select a batch" })}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.batch ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  disabled={isLoadingBatches}
                >
                  <option value="">
                    {isLoadingBatches ? "Loading batches..." : "Select Batch"}
                  </option>
                  {batches.map((batch) => (
                    <option key={batch._id} value={batch._id}>
                      {batch.name}
                    </option>
                  ))}
                </select>
                {errors.batch && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.batch.message}
                  </p>
                )}
              </div>

              {/* Profession */}
              <div>
                <label
                  htmlFor="profession"
                  className="block text-sm font-medium text-gray-700"
                >
                  Profession
                </label>
                <input
                  id="profession"
                  type="text"
                  {...register("profession", {})}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.profession ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                {errors.profession && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.profession.message}
                  </p>
                )}
              </div>

              {/* Type */}
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Member Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="type"
                  {...register("type", {
                    required: "Please select member type",
                  })}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.type ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                >
                  {committee.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.position}
                    </option>
                  ))}
                </select>
                {errors.type && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.type.message}
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
                  id="address"
                  type="text"
                  {...register("address", {})}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.address ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
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
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.about ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
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
                  Profile Image <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="image"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="image"
                          type="file"
                          {...register("image", {
                            required: "Image is required",
                          })}
                          accept="image/*"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
                {errors.image && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.image.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Member
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
