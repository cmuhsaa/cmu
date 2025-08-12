"use client";
import { MESSAGE } from "@/store/constant";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { revalidatePathGallery } from "../../actions";
import Loading from "@/components/Loading";
import { clientCloudinary } from "@/config/clientCloudinary";

export default function GalleryUpdate() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm();

  // Fetch existing gallery data
  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/gallery/${id}`);
        const data = await res.json();
        if (data?.gallery) {
          setValue("title", data.gallery.title);
          setValue("youtubeLink", data.gallery.youtubeLink);
        }
      } catch (err) {
        console.error("Failed to fetch gallery", err);
      }
      setLoading(false);
    };

    if (id) fetchGallery();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);

    const formData = {};
    formData.title = data.title;
    formData.youtubeLink = data.youtubeLink;
    formData.images = [];

    if (data.images && data.images.length > 0) {
      for (let i = 0; i < data.images.length; i++) {
        formData.images.push(await clientCloudinary(data.images[i], "gallery"));
      }
    }

    const response = await fetch(`/api/gallery/${id}`, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    revalidatePathGallery(id);

    dispatch({
      type: MESSAGE,
      payload: {
        message: result.message || result.error || "Unknown error",
        status: result.message ? "success" : "error",
        path: result.message ? `/gallery${id}` : "",
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
            <h2 className="text-2xl font-bold text-gray-800">Update Gallery</h2>
            <p className="mt-2 text-sm text-gray-600">
              Edit your gallery details below
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
              <input
                id="title"
                type="text"
                {...register("title", { required: "Title is required" })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="youtubeLink"
                className="block text-sm font-medium text-gray-700"
              >
                YouTube Link
              </label>
              <input
                id="youtubeLink"
                type="url"
                {...register("youtubeLink")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>

            <div>
              <label
                htmlFor="images"
                className="block text-sm font-medium text-gray-700"
              >
                Images (upload multiple)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="images"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload files</span>
                      <input
                        id="images"
                        type="file"
                        accept="image/*"
                        {...register("images")}
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
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Update Gallery
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
