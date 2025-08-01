import Edit from "@/components/Edit";
import { TeacherFilters } from "@/components/TeacherFilter";
import { getPaginatedTeachers } from "@/lib/getDatas";
import Link from "next/link";

export default async function TeacherPage({ searchParams }) {
  const params = await searchParams;
  const page = parseInt(params.page) || 1;
  const limit = 1;
  const search = params.search || "";
  const sortBy = params.sortBy || "createDate";
  const sortOrder = params.sortOrder || "desc";

  const { teachers, total } = await getPaginatedTeachers({
    page,
    limit,
    search,
    sortBy,
    sortOrder,
  });
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
        Teachers Directory
      </h1>

      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <TeacherFilters />
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
                  href={`/teacher/filter?${buildQuery({
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
                  href={`/teacher/filter?${buildQuery({
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
