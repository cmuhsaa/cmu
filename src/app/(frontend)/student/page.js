import { getAllBatch, getPaginatedStudents } from "@/lib/getDatas";
import Edit from "@/components/Edit";
import Link from "next/link";

export default async function StudentPage({ searchParams }) {
  const params = await searchParams;
  const page = parseInt(params?.page) || 1;
  const limit = 10;
  const search = params?.search || "";
  const type = params?.type || "";
  const batch = params?.batch || "";
  const sortBy = params?.sortBy || "createDate";
  const sortOrder = params?.sortOrder || "desc";

  const [{ students, total }, batches] = await Promise.all([
    getPaginatedStudents({
      page,
      limit,
      search,
      type,
      batch,
      sortBy,
      sortOrder,
    }),
    getAllBatch(),
  ]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Student Directory
      </h2>

      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <form
          method="get"
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          <div className="col-span-1 md:col-span-3 lg:col-span-2">
            <input
              type="text"
              name="search"
              placeholder="Search name/email/phone"
              defaultValue={search}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            name="type"
            defaultValue={type}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="Alumni">Alumni</option>
          </select>

          <select
            name="batch"
            defaultValue={batch}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Batches</option>
            {batches.map((b) => (
              <option key={b._id} value={b._id.toString()}>
                {b.name}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            <select
              name="sortBy"
              defaultValue={sortBy}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="createDate">Created Date</option>
              <option value="name">Name</option>
            </select>
            <select
              name="sortOrder"
              defaultValue={sortOrder}
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
            <Link
              href="/student"
              className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors text-center"
            >
              Reset
            </Link>
          </div>
        </form>
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

// Utility to rebuild query string
function buildQuery(params) {
  return Object.entries(params)
    .filter(([_, value]) => value !== "")
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
}
