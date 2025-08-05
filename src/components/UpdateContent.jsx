"use client";

import { revalidatePathContent } from "@/app/dashboard/update-content/action";
import { MESSAGE } from "@/store/constant";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiUpload, FiSave, FiLink, FiMessageSquare } from "react-icons/fi";
import { useDispatch } from "react-redux";
import Loading from "./Loading";

export default function OrganizationForm({ initialData = {} }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const defaultValues = {
    history: initialData?.history || "",
    formation: initialData?.formation || "",
    establishment: initialData?.establishment || "",
    vision: initialData?.vision || "",
    mission: initialData?.mission || "",
    achievements: initialData?.achievements || "",
    secretaryMessage: initialData?.secretaryMessage || {
      name: "",
      designation: "",
      message: "",
      image: "",
    },
    presidentMessage: initialData?.presidentMessage || {
      name: "",
      designation: "",
      message: "",
      image: "",
    },
    patronMessage: initialData?.patronMessage || {
      name: "",
      designation: "",
      message: "",
      image: "",
    },
    address: initialData?.address || "",
    phonePresident: initialData?.phonePresident || "",
    phoneSecretary: initialData?.phoneSecretary || "",
    email: initialData?.email || "",
    socialLinks: initialData?.socialLinks || {
      facebook: "",
      youtube: "",
      whatsapp: "",
      twitter: "",
    },
  };

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues,
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      // Append all text fields
      Object.entries(data).forEach(([key, value]) => {
        if (
          key !== "secretaryMessage" &&
          key !== "presidentMessage" &&
          key !== "patronMessage" &&
          key !== "patronImage" &&
          key !== "presidentImage" &&
          key !== "secretaryImage" &&
          key !== "socialLinks"
        ) {
          formData.append(key, value);
        }
      });
      // Append message objects
      formData.append("patronMessage", JSON.stringify(data.patronMessage));
      formData.append(
        "presidentMessage",
        JSON.stringify(data.presidentMessage)
      );
      formData.append(
        "secretaryMessage",
        JSON.stringify(data.secretaryMessage)
      );

      // Append social links
      formData.append("socialLinks", JSON.stringify(data.socialLinks));

      // Append image files if they exist
      if (data.patronImage && data.patronImage.length > 0) {
        formData.append("patronImage", data.patronImage[0]);
      }
      if (data.presidentImage && data.presidentImage.length > 0) {
        formData.append("presidentImage", data.presidentImage[0]);
      }
      if (data.secretaryImage && data.secretaryImage.length > 0) {
        formData.append("secretaryImage", data.secretaryImage[0]);
      }

      const res = await fetch("/api/linksandcontent", {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to update content");
      }

      revalidatePathContent();
      dispatch({
        type: MESSAGE,
        payload: {
          message: "Content Updated",
          status: "success",
          path: "/dashboard",
        },
      });
    } catch (error) {
      dispatch({
        type: MESSAGE,
        payload: {
          message: error.message || "An error occurred",
          status: "error",
          path: "",
        },
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {loading && <Loading />}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
            <h1 className="text-2xl font-bold">
              Organization Information Form
            </h1>
            <p className="opacity-90">Update your organization details</p>
          </div>

          {/* Main Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 md:p-8 space-y-8"
          >
            {/* History Section */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-l-4 border-blue-500">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <FiMessageSquare className="mr-2" />
                History
              </h2>
              <textarea
                {...register("history")}
                className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={5}
                placeholder="Enter organization history..."
              />
            </div>

            {/* Formation & Establishment */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
                <h3 className="font-bold mb-3">Formation</h3>
                <textarea
                  {...register("formation")}
                  className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={5}
                  placeholder="How the organization was formed..."
                />
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                <h3 className="font-bold mb-3">Establishment</h3>
                <textarea
                  {...register("establishment")}
                  className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={5}
                  placeholder="Official establishment details..."
                />
              </div>
            </div>

            {/* Vision & Mission */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-3">Vision</h3>
                <textarea
                  {...register("vision")}
                  className="w-full p-4 bg-white/10 rounded-lg focus:ring-2 focus:ring-white focus:border-white"
                  rows={4}
                  placeholder="Organization vision..."
                />
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-3">Mission</h3>
                <textarea
                  {...register("mission")}
                  className="w-full p-4 bg-white/10 rounded-lg focus:ring-2 focus:ring-white focus:border-white"
                  rows={4}
                  placeholder="Organization mission..."
                />
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Achievements</h2>
              <textarea
                {...register("achievements")}
                className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={5}
                placeholder="Organization achievements..."
              />
            </div>

            {/* Messages Sections */}
            <div className="space-y-8">
              <h2 className="text-xl font-bold">Leadership Messages</h2>

              {/* Patron Message */}
              <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-6 border-l-4 border-red-500">
                <h3 className="font-bold mb-4">Chief Patron Message</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Name
                      </label>
                      <input
                        {...register("patronMessage.name")}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Designation
                      </label>
                      <input
                        {...register("patronMessage.designation")}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Image
                      </label>
                      <div className="flex items-center space-x-2">
                        <label className="cursor-pointer bg-blue-100 text-blue-700 px-3 py-2 rounded-lg flex items-center">
                          <FiUpload className="mr-2" />
                          Upload
                          <input
                            type="file"
                            id="patronImage"
                            {...register("patronImage")}
                            className="hidden"
                            accept="image/*"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">
                      Message
                    </label>
                    <textarea
                      {...register("patronMessage.message")}
                      className="w-full p-4 border rounded-lg h-full min-h-[150px]"
                    />
                  </div>
                </div>
              </div>

              {/* President Message */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border-l-4 border-blue-500">
                <h3 className="font-bold mb-4">President Message</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Name
                      </label>
                      <input
                        {...register("presidentMessage.name")}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Designation
                      </label>
                      <input
                        {...register("presidentMessage.designation")}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Image
                      </label>
                      <div className="flex items-center space-x-2">
                        <label className="cursor-pointer bg-blue-100 text-blue-700 px-3 py-2 rounded-lg flex items-center">
                          <FiUpload className="mr-2" />
                          Upload
                          <input
                            type="file"
                            id="presidentImage"
                            {...register("presidentImage")}
                            className="hidden"
                            accept="image/*"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">
                      Message
                    </label>
                    <textarea
                      {...register("presidentMessage.message")}
                      className="w-full p-4 border rounded-lg h-full min-h-[150px]"
                    />
                  </div>
                </div>
              </div>

              {/* Secretary Message */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border-l-4 border-green-500">
                <h3 className="font-bold mb-4">Secretary Message</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Name
                      </label>
                      <input
                        {...register("secretaryMessage.name")}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Designation
                      </label>
                      <input
                        {...register("secretaryMessage.designation")}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Image
                      </label>
                      <div className="flex items-center space-x-2">
                        <label className="cursor-pointer bg-blue-100 text-blue-700 px-3 py-2 rounded-lg flex items-center">
                          <FiUpload className="mr-2" />
                          Upload
                          <input
                            type="file"
                            id="secretaryImage"
                            {...register("secretaryImage")}
                            className="hidden"
                            accept="image/*"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">
                      Message
                    </label>
                    <textarea
                      {...register("secretaryMessage.message")}
                      className="w-full p-4 border rounded-lg h-full min-h-[150px]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border-l-4 border-orange-500">
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Address
                  </label>
                  <textarea
                    {...register("address")}
                    className="w-full p-2 border rounded-lg"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    President Phone
                  </label>
                  <input
                    type="text"
                    {...register("phonePresident")}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Secretary Phone
                  </label>
                  <input
                    type="text"
                    {...register("phoneSecretary")}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border-l-4 border-purple-500">
              <h2 className="text-xl font-bold mb-4">Social Links</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 flex items-center">
                    <FiLink className="mr-2" /> Facebook
                  </label>
                  <input
                    type="url"
                    {...register("socialLinks.facebook")}
                    className="w-full p-2 border rounded-lg"
                    placeholder="https://facebook.com/yourpage"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 flex items-center">
                    <FiLink className="mr-2" /> YouTube
                  </label>
                  <input
                    type="url"
                    {...register("socialLinks.youtube")}
                    className="w-full p-2 border rounded-lg"
                    placeholder="https://youtube.com/yourchannel"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 flex items-center">
                    <FiLink className="mr-2" /> WhatsApp
                  </label>
                  <input
                    type="url"
                    {...register("socialLinks.whatsapp")}
                    className="w-full p-2 border rounded-lg"
                    placeholder="https://wa.me/yournumber"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 flex items-center">
                    <FiLink className="mr-2" /> Twitter
                  </label>
                  <input
                    type="url"
                    {...register("socialLinks.twitter")}
                    className="w-full p-2 border rounded-lg"
                    placeholder="https://twitter.com/yourhandle"
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                className="px-6 py-3 rounded-full font-medium border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-full font-medium bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900 flex items-center disabled:opacity-70"
              >
                <FiSave className="mr-2" />
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
