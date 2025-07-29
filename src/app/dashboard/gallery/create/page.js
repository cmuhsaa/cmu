"use client";
import { LOADING_END, LOADING_START, MESSAGE } from "@/store/constant";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function GalleryAdd() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    dispatch({ type: LOADING_START });

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("youtubeLink", data.youtubeLink);

    if (data.images && data.images.length > 0) {
      for (let i = 0; i < data.images.length; i++) {
        formData.append("images", data.images[i]);
      }
    }

    const response = await fetch(`/api/gallery`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const result = await response.json();

    dispatch({
      type: MESSAGE,
      payload: {
        message: result.message || result.error || "Unknown error",
        status: result.message ? "success" : "error",
        path: result.message ? "/gallery" : "",
      },
    });

    dispatch({ type: LOADING_END });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-8 text-center">
            <h2 className="text-3xl font-bold text-white">Add New Gallery Item</h2>
            <p className="mt-2 text-purple-100">Share your visual content with the community</p>
          </div>

          {/* Form */}
          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Title Field */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    id="title"
                    type="text"
                    {...register("title", { required: "Title is required" })}
                    className={`block w-full rounded-lg border ${errors.title ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-purple-500 focus:border-purple-500'} shadow-sm sm:text-sm p-3`}
                    placeholder="Enter a descriptive title"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                  )}
                </div>
              </div>

              {/* YouTube Link Field */}
              <div>
                <label htmlFor="youtubeLink" className="block text-sm font-medium text-gray-700">
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
                  <p className="mt-1 text-xs text-gray-500">Optional YouTube video link</p>
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                  Images <span className="text-red-500">*</span>
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
                            {...register("images", { required: "At least one image is required" })}
                            multiple
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                  {errors.images && (
                    <p className="mt-1 text-sm text-red-600">{errors.images.message}</p>
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