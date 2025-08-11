"use client";
import { MESSAGE } from "@/store/constant";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { revalidatePathGallery } from "../actions";
import Loading from "@/components/Loading";
import { clientCloudinary } from "@/config/clientCloudinary";

export default function GalleryAdd() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setLoading(true);

    if (data.images.length == 0 && !data.youtubeLink) {
      dispatch({
        type: MESSAGE,
        payload: {
          message: "Image or yt video is required",
          status: "error",
          path: "",
        },
      });
      setLoading(false);
      return;
    }

    const formData = {};
    formData.title = data.title;
    formData.youtubeLink = data.youtubeLink;
    formData.images = [];

    if (data.images && data.images.length > 0) {
      for (let i = 0; i < data.images.length; i++) {
        formData.images.push(await clientCloudinary(data.images[i], "gallery"));
      }
    }

    const response = await fetch(`/api/gallery`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    revalidatePathGallery();

    dispatch({
      type: MESSAGE,
      payload: {
        message: result.message || result.error || "Unknown error",
        status: result.message ? "success" : "error",
        path: result.message ? "/gallery" : "",
      },
    });
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen">
      {loading && <Loading />}
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/50 rounded-xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-8 text-center">
            <h2 className="text-3xl font-bold text-white">
              Add New Gallery Item
            </h2>
            <p className="mt-2 text-purple-100">
              Share your visual content with the community
            </p>
          </div>

          {/* Form */}
          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Title Field */}
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
                    className={`block w-full rounded-lg border ${
                      errors.title
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                    } shadow-sm sm:text-sm p-3`}
                    placeholder="Enter a descriptive title"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.title.message}
                    </p>
                  )}
                </div>
              </div>

              {/* YouTube Link Field */}
              <div>
                <label
                  htmlFor="youtubeLink"
                  className="block text-sm font-medium text-gray-700"
                >
                  YouTube Link
                </label>
                <div className="mt-1">
                  <input
                    id="youtubeLink"
                    type="url"
                    {...register("youtubeLink")}
                    className="block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm p-3"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Optional YouTube video link
                  </p>
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label
                  htmlFor="images"
                  className="block text-sm font-medium text-gray-700"
                >
                  Images
                </label>
                <div className="mt-1">
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-lg">
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
                          htmlFor="images"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none"
                        >
                          <span>Upload files</span>
                          <input
                            id="images"
                            type="file"
                            accept="image/*"
                            {...register("images", {})}
                            multiple
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
                  {errors.images && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.images.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Upload Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
