import Edit from "@/components/Edit";
import { TeacherFilters } from "@/components/TeacherFilter";
import { getPaginatedTeachers } from "@/lib/getDatas";
import Link from "next/link";
import { Mail, Phone, MapPin, User, ChevronRight } from "lucide-react";

export default async function TeacherPage({ searchParams }) {
  const params = await searchParams;
  const page = parseInt(params.page) || 1;
  const limit = 10;
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
    <div className="container rounded-2xl overflow-hidden">
      <div
        className="relative h-80 bg-cover bg-center mb-6"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Beautiful%20university%20campus%20in%20Bangladesh%20with%20lush%20green%20hills%2C%20traditional%20academic%20buildings%2C%20students%20walking%20on%20pathways%2C%20serene%20natural%20environment%2C%20peaceful%20educational%20atmosphere%2C%20blue%20sky%20with%20white%20clouds%2C%20vibrant%20green%20landscapes%20surrounding%20the%20campus&width=800&height=320&seq=bg-hero-001&orientation=landscape')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-green-900/60"></div>
        <div className="relative h-full flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            Honorable Teacher
          </h1>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
        <TeacherFilters />
      </div>

      {teachers.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <User className="h-8 w-8 text-gray-400" />
          </div>
          <p className="text-gray-600 text-lg">
            No faculty members found matching your criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-3 lg:px-0">
          {teachers.map((member) => (
            <div
              key={member._id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 border border-gray-100 group"
            >
              {/* Card Header */}
              <div className="relative h-40 bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center">
                {member.avatar ? (
                  <img
                    src={member.avatar.url}
                    alt="Teacher Avatar"
                    className="w-34 h-34 rounded-full object-cover border-4 border-white shadow-md"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white shadow-md flex items-center justify-center text-gray-500">
                    <User className="h-12 w-12" />
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6">
                <Link href={`/teacher/${member._id}`} className="group">
                  <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-1">
                    {member.name}
                  </h2>
                </Link>
                {member.title && (
                  <p className="text-blue-600 font-medium mb-4">
                    {member.title}
                  </p>
                )}

                <div className="space-y-3 text-sm">
                  {member.email && (
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-gray-700 truncate">
                        {member.email}
                      </span>
                    </div>
                  )}
                  {member.phone && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-gray-700">{member.phone}</span>
                    </div>
                  )}
                  {member.address && (
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                      <span className="text-gray-700 line-clamp-2">
                        {member.address}
                      </span>
                    </div>
                  )}
                </div>

                <Link
                  href={`/teacher/${member._id}`}
                  className="mt-6 inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  View profile <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
                <Edit
                  model="teacher"
                  id={member._id.toString()}
                  className="absolute top-3 right-3 text-gray-400 hover:text-blue-600 transition-colors"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {teachers.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10">
          <div className="text-sm text-gray-600">
            Showing {(page - 1) * limit + 1}-{Math.min(page * limit, total)} of{" "}
            {total} faculty
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
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors flex items-center"
              >
                Previous
              </Link>
            )}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum =
                page <= 3
                  ? i + 1
                  : page >= totalPages - 2
                  ? totalPages - 4 + i
                  : page - 2 + i;
              return (
                pageNum <= totalPages && (
                  <Link
                    key={pageNum}
                    href={`/teacher/filter?${buildQuery({
                      search,
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
            })}
            {page < totalPages && (
              <Link
                href={`/teacher/filter?${buildQuery({
                  search,
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
