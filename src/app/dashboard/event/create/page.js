"use client";
import { MESSAGE } from "@/store/constant";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { revalidatePathEvent } from "../actions";
import Loading from "@/components/Loading";

export default function EventAdd() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await fetch(`/api/event/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await response.json();
      revalidatePathEvent();

      if (result.message) {
        dispatch({
          type: MESSAGE,
          payload: {
            message: result.message,
            status: "success",
            path: "/event",
          },
        });
      } else {
        dispatch({
          type: MESSAGE,
          payload: {
            message: result.error || "Failed to add event",
            status: "error",
            path: "",
          },
        });
      }
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {loading && <Loading />}
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">
              Create New Event
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Fill in the details below to add a new event
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-4">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Title */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Event Title (English) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  {...register("title", {
                    required: "English title is required",
                  })}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                    errors.title ? "border-red-500" : "border"
                  }`}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Title Bangla */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="titleBangla"
                  className="block text-sm font-medium text-gray-700"
                >
                  Event Title (Bangla) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="titleBangla"
                  {...register("titleBangla", {
                    required: "Bangla title is required",
                  })}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                    errors.titleBangla ? "border-red-500" : "border"
                  }`}
                />
                {errors.titleBangla && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.titleBangla.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  rows={4}
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                    errors.description ? "border-red-500" : "border"
                  }`}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Event Date */}
              <div>
                <label
                  htmlFor="eventDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Event Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="eventDate"
                  {...register("eventDate", {
                    required: "Event date is required",
                  })}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                    errors.eventDate ? "border-red-500" : "border"
                  }`}
                />
                {errors.eventDate && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.eventDate.message}
                  </p>
                )}
              </div>

              {/* Location */}
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  {...register("location", {
                    required: "Location is required",
                  })}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                    errors?.location ? "border-red-500" : "border"
                  }`}
                />
                {errors?.location && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors?.location.message}
                  </p>
                )}
              </div>

              {/* Registration Start Date */}
              <div>
                <label
                  htmlFor="registrationStartDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Registration Start <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="registrationStartDate"
                  {...register("registrationStartDate", {
                    required: "Registration start date is required",
                    validate: (value) => {
                      const endDate = document.getElementById(
                        "registrationEndDate"
                      )?.value;
                      if (endDate && new Date(value) > new Date(endDate)) {
                        return "Start date must be before end date";
                      }
                      return true;
                    },
                  })}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                    errors.registrationStartDate ? "border-red-500" : "border"
                  }`}
                />
                {errors.registrationStartDate && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.registrationStartDate.message}
                  </p>
                )}
              </div>

              {/* Registration End Date */}
              <div>
                <label
                  htmlFor="registrationEndDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Registration End <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="registrationEndDate"
                  {...register("registrationEndDate", {
                    required: "Registration end date is required",
                    validate: (value) => {
                      const startDate = document.getElementById(
                        "registrationStartDate"
                      )?.value;
                      if (startDate && new Date(value) < new Date(startDate)) {
                        return "End date must be after start date";
                      }
                      return true;
                    },
                  })}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                    errors.registrationEndDate ? "border-red-500" : "border"
                  }`}
                />
                {errors.registrationEndDate && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.registrationEndDate.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => (window.location.href = "/event")}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
