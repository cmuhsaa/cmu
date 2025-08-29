"use client";
import Edit from "@/components/Edit";
import Link from "next/link";
import { getPaginatedStudents } from "@/lib/getDatas";
import { StudentFilters } from "@/components/StudentFilter";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import StudentDirectorySkeleton from "../loading";

export default function StudentPage() {
  const searchParams = useSearchParams();

  const [students, setStudents] = useState([]);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(true);

  const page = parseInt(searchParams.get("page")) || 1;
  const limit = 10;
  const search = searchParams.get("search") || "";
  const type = searchParams.get("type") || "";
  const batch = searchParams.get("batch") || "";
  const sortBy = searchParams.get("sortBy") || "createDate";
  const sortOrder = searchParams.get("sortOrder") || "desc";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const studentsData = await getPaginatedStudents({
        page,
        limit,
        search,
        type,
        batch,
        sortBy,
        sortOrder,
        isActive: true,
      });
      console.log(studentsData);
      setStudents(studentsData.students);
      setTotal(studentsData.total);
      setLoading(false);
    };

    fetchData();
  }, [page, search, type, batch, sortBy, sortOrder]);

  // Utility to rebuild query string
  const buildQuery = (params) => {
    return Object.entries(params)
      .filter(([_, value]) => value !== "")
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");
  };

  if (loading) return <StudentDirectorySkeleton />;

  return (
    <div className="rounded-2xl overflow-hidden">
      <div
        className="relative h-80 bg-cover bg-center mb-6"
        style={{
          backgroundImage: `url('/cover2.png')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-green-900/10"></div>
        <div className="relative h-full flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            Alumni Students
          </h1>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white/50 rounded-xl shadow-sm p-6 mb-8 border border-gray-100 mx-3 xl:mx-0">
        <StudentFilters />
      </div>

      {students.length === 0 ? (
        <div className="bg-white/50 rounded-xl shadow-sm p-8 text-center border border-gray-100">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="h-8 w-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <p className="text-gray-600 text-lg mb-4">
            No student data found matching your criteria.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-3 xl:px-0">
          {students.map((member) => (
            <div
              key={member._id}
              className="relative bg-white/50 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 border border-gray-100 group"
            >
              <Edit model="student" id={member._id.toString()} />
              {/* Card Header */}
              <div className="relative h-40 bg-blue-50/30 flex items-center justify-center">
                {member.avatar ? (
                  <img
                    src={member.avatar.url}
                    alt="Avatar"
                    className="w-34 h-34 rounded-full object-cover border-4 border-white shadow-md"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white shadow-md flex items-center justify-center text-gray-500">
                    <svg
                      className="h-12 w-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6">
                <Link href={`/student/${member._id}`} className="group">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-2">
                    {member.name}
                  </h3>
                </Link>

                <div className="flex items-center mb-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      member.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {member.isActive ? "Active" : "Inactive"}
                  </span>
                  {member.type && (
                    <span className="ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {member.type}
                    </span>
                  )}
                </div>

                <div className="space-y-0 text-sm mb-2">
                  <div className="flex items-center">
                    <svg
                      className="h-4 w-4 text-gray-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span className="text-gray-700">
                      {member.phone || "Not provided"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="h-4 w-4 text-gray-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span className="text-gray-700">
                      {member.batch?.name || "Batch not specified"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {students.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10">
          <div className="text-sm text-gray-600">
            Showing {(page - 1) * limit + 1}-{Math.min(page * limit, total)} of{" "}
            {total} students
          </div>
          <div className="flex gap-2">
            {page > 1 && (
              <Link
                href={`/student/filter?${buildQuery({
                  search,
                  type,
                  batch,
                  sortBy,
                  sortOrder,
                  page: page - 1,
                })}`}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors flex items-center"
              >
                Previous
              </Link>
            )}
            {Array.from(
              { length: Math.min(5, Math.ceil(total / limit)) },
              (_, i) => {
                const pageNum =
                  page <= 3
                    ? i + 1
                    : page >= Math.ceil(total / limit) - 2
                      ? Math.ceil(total / limit) - 4 + i
                      : page - 2 + i;
                return (
                  pageNum <= Math.ceil(total / limit) && (
                    <Link
                      key={pageNum}
                      href={`/student/filter?${buildQuery({
                        search,
                        type,
                        batch,
                        sortBy,
                        sortOrder,
                        page: pageNum,
                      })}`}
                      className={`px-4 py-2 border rounded-lg transition-colors ${
                        page === pageNum
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </Link>
                  )
                );
              }
            )}
            {page < Math.ceil(total / limit) && (
              <Link
                href={`/student/filter?${buildQuery({
                  search,
                  type,
                  batch,
                  sortBy,
                  sortOrder,
                  page: page + 1,
                })}`}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors flex items-center"
              >
                Next
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
