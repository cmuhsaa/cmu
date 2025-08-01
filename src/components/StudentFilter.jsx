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
      className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4"
    >
      <div className="col-span-1 md:col-span-3 lg:col-span-2">
        <input
          type="text"
          name="search"
          placeholder="Search name/email/phone"
          value={formValues.search}
          onChange={(e) =>
            setFormValues({ ...formValues, search: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <select
        name="type"
        value={formValues.type}
        onChange={(e) => setFormValues({ ...formValues, type: e.target.value })}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {committee.map((item) => (
          <option key={item.value} value={item.value}>
            {item.position}
          </option>
        ))}
      </select>

      <select
        name="batch"
        value={formValues.batch}
        onChange={(e) =>
          setFormValues({ ...formValues, batch: e.target.value })
        }
        disabled={batches.length == 0}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Batches</option>
        {batches?.map((b) => (
          <option key={b._id} value={b._id.toString()}>
            {b.name}
          </option>
        ))}
      </select>

      <div className="flex gap-2">
        <select
          name="sortBy"
          value={formValues.sortBy}
          onChange={(e) =>
            setFormValues({ ...formValues, sortBy: e.target.value })
          }
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      <div className="flex gap-2 col-span-full md:col-span-1">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Apply Filters
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors text-center"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
