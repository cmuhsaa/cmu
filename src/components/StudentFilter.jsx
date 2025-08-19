"use client";

import { committee } from "@/lib/committee";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function StudentFilters() {
  const [batches, setBatches] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formValues, setFormValues] = useState({
    search: "",
    type: "",
    batch: "",
    sortBy: "createDate",
    sortOrder: "desc",
  });

  // Initialize form values from URL params
  useEffect(() => {
    setFormValues({
      search: searchParams.get("search") || "",
      type: searchParams.get("type") || "",
      batch: searchParams.get("batch") || "",
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
    router.push(`/student/filter?${buildQuery(params)}`);
  };

  const handleReset = () => {
    setFormValues({
      search: "",
      type: "",
      batch: "",
      sortBy: "createDate",
      sortOrder: "desc",
    });
    router.push("/student");
  };

  useEffect(() => {
    const getBatches = async () => {
      let response = await fetch("/api/batch");
      let result = await response.json();
      setBatches(result.batches);
    };
    getBatches();
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {/* Search Input - Full width on mobile, spans 2 columns on sm, 3 on lg */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-2">
        <input
          type="text"
          name="search"
          placeholder="Search name/email/phone"
          value={formValues.search}
          onChange={(e) =>
            setFormValues({ ...formValues, search: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
        />
      </div>

      {/* Type Select - Full width on mobile, half on sm, single column on lg */}
      <div className="col-span-1 sm:col-span-1 lg:col-span-1">
        <select
          name="type"
          value={formValues.type}
          onChange={(e) => setFormValues({ ...formValues, type: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
        >
          <option value="">All Types</option>
          {committee.map((item) => (
            <option key={item.value} value={item.value}>
              {item.position}
            </option>
          ))}
        </select>
      </div>

      {/* Batch Select - Full width on mobile, half on sm, single column on lg */}
      <div className="col-span-1 sm:col-span-1 lg:col-span-1">
        <select
          name="batch"
          value={formValues.batch}
          onChange={(e) =>
            setFormValues({ ...formValues, batch: e.target.value })
          }
          disabled={batches?.length === 0}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
        >
          <option value="">All Batches</option>
          {batches?.map((b) => (
            <option key={b._id} value={b._id.toString()}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      {/* Sort Controls - Full width on mobile, spans 2 columns on sm and lg */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-2 flex gap-2">
        <select
          name="sortBy"
          value={formValues.sortBy}
          onChange={(e) =>
            setFormValues({ ...formValues, sortBy: e.target.value })
          }
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
        >
          <option value="createDate">Created Date</option>
          <option value="name">Name</option>
        </select>
        <select
          name="sortOrder"
          value={formValues.sortOrder}
          onChange={(e) =>
            setFormValues({ ...formValues, sortOrder: e.target.value })
          }
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      {/* Action Buttons - Full width on mobile, single column on sm and lg */}
      <div className="col-span-1 sm:col-span-1 lg:col-span-1 flex gap-2">
        <button
          type="submit"
          className="cursor-pointer flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base"
        >
          Apply
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="cursor-pointer flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors text-sm sm:text-base"
        >
          Reset
        </button>
      </div>
    </form>
  );
}