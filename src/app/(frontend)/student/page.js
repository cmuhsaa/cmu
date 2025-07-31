import Edit from "@/components/Edit";
import Link from "next/link";
import { getAllBatch, getPaginatedStudents } from "@/lib/getDatas";
import { StudentFilters } from "@/components/StudentFilter";

export default async function StudentPage({ searchParams }) {
  let params = await searchParams;
  const page = parseInt(params.page) || 1;
  const limit = 10;
  const search = params.search || "";
  const type = params.type || "";
  const batch = params.batch || "";
  const sortBy = params.sortBy || "createDate";
  const sortOrder = params.sortOrder || "desc";

  // Fetch data in parallel
  const [studentsData, batchesData] = await Promise.all([
    getPaginatedStudents({
      page,
      limit,
      search,
      type,
      batch,
      sortBy,
      sortOrder,
      isActive: true,
    }),
    getAllBatch(),
  ]);

  const students = studentsData.students;
  const total = studentsData.total;
  const batches = batchesData;
  const totalPages = Math.ceil(total / limit);

  // Utility to rebuild query string
  const buildQuery = (params) => {
    return Object.entries(params)
      .filter(([_, value]) => value !== "")
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Student Directory
      </h2>

      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <StudentFilters batches={JSON.parse(JSON.stringify(batches))} />
      </div>

      {students.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600">
            No student data found matching your criteria.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {students.map((member) => (
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
                        alt="Avatar"
                        className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                      />
                    </div>
                  )}

                  {/* Main Content */}
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <Link href={`/student/${member._id}`} className="group">
                        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                          {member.name}
                        </h3>
                      </Link>
                    </div>
                    <Edit model="student" id={member._id.toString()} />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-gray-800">{member.email || "-"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="text-gray-800">{member.phone || "-"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Type</p>
                        <p className="text-gray-800">{member.type || "-"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Profession</p>
                        <p className="text-gray-800">
                          {member.profession || "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Batch</p>
                        <p className="text-gray-800">
                          {member.batch?.name || "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <p
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            member.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {member.isActive ? "Active" : "Inactive"}
                        </p>
                      </div>
                    </div>

                    {member.about && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-500">About</p>
                        <p className="text-gray-800 line-clamp-2">
                          {member.about}
                        </p>
                      </div>
                    )}

                    <div className="flex justify-between mt-4 text-sm text-gray-500">
                      <span>
                        Created: {member.createDate?.date} at{" "}
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
              Showing page {page} of {totalPages} ({total} total records)
            </div>
            <div className="flex gap-2">
              {page > 1 && (
                <Link
                  href={`?${buildQuery({
                    search,
                    type,
                    batch,
                    sortBy,
                    sortOrder,
                    page: page - 1,
                  })}`}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Previous
                </Link>
              )}
              {page < totalPages && (
                <Link
                  href={`?${buildQuery({
                    search,
                    type,
                    batch,
                    sortBy,
                    sortOrder,
                    page: page + 1,
                  })}`}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
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
