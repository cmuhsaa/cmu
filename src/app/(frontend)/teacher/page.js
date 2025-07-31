"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Edit from "@/components/Edit";
import Link from "next/link";
import { LOADING_END, LOADING_START } from "@/store/constant";
import { useDispatch } from "react-redux";

export default function TeacherPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [teachers, setTeachers] = useState([]);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();

  const page = parseInt(searchParams.get("page")) || 1;
  const limit = 10;
  const search = searchParams.get("search") || "";
  const sortBy = searchParams.get("sortBy") || "createDate";
  const sortOrder = searchParams.get("sortOrder") || "desc";

  useEffect(() => {
    const fetchTeachers = async () => {
      dispatch({ type: LOADING_START });
      try {
        const queryParams = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          ...(search && { search }),
          sortBy,
          sortOrder,
        }).toString();

        const response = await fetch(`/api/teacher?${queryParams}`);
        const data = await response.json();

        setTeachers(data.teachers);
        setTotal(data.total);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      } finally {
        dispatch({ type: LOADING_END });
      }
    };

    fetchTeachers();
  }, [page, search, sortBy, sortOrder]);

  const totalPages = Math.ceil(total / limit);

  const buildQuery = (params) => {
    return Object.entries(params)
      .filter(([_, val]) => val !== "")
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join("&");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Faculty Directory
      </h1>

      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const params = {
              search: formData.get("search") || "",
              sortBy: formData.get("sortBy") || "createDate",
              sortOrder: formData.get("sortOrder") || "desc",
              page: 1, // Reset to first page when filters change
            };
            router.push(`?${buildQuery(params)}`);
          }}
          className="flex flex-col md:flex-row gap-4"
        >
          <div className="flex-grow">
            <input
              type="text"
              name="search"
              placeholder="Search name/email/phone/title"
              defaultValue={search}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex gap-2">
            <select
              name="sortBy"
              defaultValue={sortBy}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="createDate">Created Date</option>
              <option value="name">Name</option>
              <option value="title">Title</option>
            </select>

            <select
              name="sortOrder"
              defaultValue={sortOrder}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Apply
            </button>
            <Link
              href="/teacher"
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors flex items-center"
            >
              Reset
            </Link>
          </div>
        </form>
      </div>

      {teachers.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600">
            No faculty members found matching your criteria.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {teachers.map((member) => (
            <div
              key={member._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Avatar Section */}
                  {member.avatar && (
                    <div className="flex-shrink-0">
                      <img
                        src={member.avatar.url}
                        alt="Teacher Avatar"
                        className="w-24 h-24 rounded-full object-cover border-4 border-gray-100"
                      />
                    </div>
                  )}

                  {/* Main Content */}
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link href={`/teacher/${member._id}`} className="group">
                          <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                            {member.name}
                          </h2>
                        </Link>
                        {member.title && (
                          <p className="text-blue-600 font-medium">
                            {member.title}
                          </p>
                        )}
                      </div>
                      <Edit model="teacher" id={member._id.toString()} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          Contact Information
                        </p>
                        <p className="text-gray-800">
                          {member.email || "No email"}
                        </p>
                        <p className="text-gray-800">
                          {member.phone || "No phone"}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="text-gray-800">
                          {member.address || "No address"}
                        </p>
                      </div>
                    </div>

                    {member.about && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-500">About</p>
                        <p className="text-gray-800 line-clamp-3">
                          {member.about}
                        </p>
                      </div>
                    )}

                    <div className="flex justify-between mt-4 text-sm text-gray-500">
                      <span>
                        Joined: {member.createDate?.date} at{" "}
                        {member.createDate?.formatedTime}
                      </span>
                      <span>
                        Updated: {member.updateDate?.date} at{" "}
                        {member.updateDate?.formatedTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
            <div className="text-sm text-gray-600">
              Showing page {page} of {totalPages} ({total} faculty members)
            </div>
            <div className="flex gap-2">
              {page > 1 && (
                <Link
                  href={`?${buildQuery({
                    search,
                    sortBy,
                    sortOrder,
                    page: page - 1,
                  })}`}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Previous
                </Link>
              )}
              {page < totalPages && (
                <Link
                  href={`?${buildQuery({
                    search,
                    sortBy,
                    sortOrder,
                    page: page + 1,
                  })}`}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Next
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
