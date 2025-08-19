"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function TeacherFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formValues, setFormValues] = useState({
    search: "",
    sortBy: "createDate",
    sortOrder: "desc",
  });

  // Initialize form values from URL params
  useEffect(() => {
    setFormValues({
      search: searchParams.get("search") || "",
      sortBy: searchParams.get("sortBy") || "createDate",
      sortOrder: searchParams.get("sortOrder") || "desc",
    });
  }, [searchParams]);

  const buildQuery = (params) => {
    return Object.entries(params)
      .filter(([_, value]) => value !== "")
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = {
      ...formValues,
      page: 1, // Reset to first page when filters change
    };
    router.push(`/teacher/filter?${buildQuery(params)}`);
  };

  const handleReset = () => {
    setFormValues({
      search: "",
      sortBy: "createDate",
      sortOrder: "desc",
    });
    router.push("/teacher");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-4"
    >
      <div className="flex-grow">
        <input
          type="text"
          name="search"
          placeholder="Search name/email/phone/title"
          value={formValues.search}
          onChange={(e) =>
            setFormValues({ ...formValues, search: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex gap-2">
        <select
          name="sortBy"
          value={formValues.sortBy}
          onChange={(e) =>
            setFormValues({ ...formValues, sortBy: e.target.value })
          }
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="createDate">Created Date</option>
          <option value="name">Name</option>
          <option value="title">Title</option>
        </select>

        <select
          name="sortOrder"
          value={formValues.sortOrder}
          onChange={(e) =>
            setFormValues({ ...formValues, sortOrder: e.target.value })
          }
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Apply
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="cursor-pointer px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors flex items-center"
        >
          Reset
        </button>
      </div>
    </form>
  );
}