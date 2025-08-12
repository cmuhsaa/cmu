"use client";
import { MESSAGE } from "@/store/constant";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { revalidatePathPost } from "../actions";
import Loading from "@/components/Loading";
import { clientCloudinary } from "@/config/clientCloudinary";

export default function PostAdd() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setLoading(true);

    const formData = {};
    formData.title = data.title;
    formData.content = data.content;
    formData.youtubeLink = data.youtubeLink;
    formData.images = [];

    if (data.images && data.images.length > 0) {
      for (let i = 0; i < data.images.length; i++) {
        formData.images.push(await clientCloudinary(data.images[i], "post"));
      }
    }
    if (data.images.length == 0 && !data.youtubeLink && !data.content) {
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

    const response = await fetch(`/api/post`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    revalidatePathPost();

    dispatch({
      type: MESSAGE,
      payload: {
        message: result.message || result.error || "Unknown error",
        status: result.message ? "success" : "error",
        path: result.message ? "/post" : "",
      },
    });
    if (!result.message) setLoading(false);
  };

  return (
    <div className="min-h-screen">
      {loading && <Loading />}
      <div className="max-w-md mx-auto bg-white/50 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Add New Post
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Share your thoughts with the community
            </p>
          </div>

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
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.title ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                {errors.title && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.title.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700"
              >
                Content
              </label>
              <div className="mt-1">
                <textarea
                  id="content"
                  rows={4}
                  {...register("content", {})}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.content ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                {errors.content && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.content.message}
                  </p>
                )}
              </div>
            </div>

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
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="images"
                className="block text-sm font-medium text-gray-700"
              >
                Images (upload multiple)
              </label>
              <div className="mt-1 flex items-center">
                <input
                  id="images"
                  type="file"
                  accept="image/*"
                  {...register("images")}
                  multiple
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
