"use client";
import { LOADING_END, LOADING_START, MESSAGE } from "@/store/constant";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { revalidatePathEvent } from "../../actions";

export default function EventUpdate() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm();

  // Watch date fields for validation
  const watchStartDate = watch("registrationStartDate");
  const watchEndDate = watch("registrationEndDate");

  useEffect(() => {
    const fetchEvent = async () => {
      if (id) {
        try {
          const res = await fetch(`/api/event/${id}`);
          const data = await res.json();
          if (data?.event) {
            const fields = [
              "title",
              "titleBangla",
              "description",
              "eventDate",
              "registrationStartDate",
              "registrationEndDate",
              "location",
            ];
            fields.forEach((field) => setValue(field, data.event[field]));
          }
        } catch (err) {
          console.error("Failed to fetch event", err);
          dispatch({
            type: MESSAGE,
            payload: {
              message: "Failed to load event data",
              status: "error",
              path: "",
            },
          });
        }
      }
    };
    fetchEvent();
  }, [id, setValue, dispatch]);

  const onSubmit = async (data) => {
    dispatch({ type: LOADING_START });

    try {
      const response = await fetch(`/api/event/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await response.json();
      revalidatePathEvent();

      dispatch({
        type: MESSAGE,
        payload: {
          message: result.message || result.error || "Failed to update event",
          status: result.message ? "success" : "error",
          path: result.message ? "/event" : "",
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
      dispatch({ type: LOADING_END });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Update Event</h2>
            <p className="mt-1 text-sm text-gray-600">
              Edit the event details below
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
                  Title (English) <span className="text-red-500">*</span>
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
                  Title (Bangla) <span className="text-red-500">*</span>
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
                    required: "Start date is required",
                    validate: (value) => {
                      if (
                        watchEndDate &&
                        new Date(value) > new Date(watchEndDate)
                      ) {
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
                    required: "End date is required",
                    validate: (value) => {
                      if (
                        watchStartDate &&
                        new Date(value) < new Date(watchStartDate)
                      ) {
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
                Update Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
