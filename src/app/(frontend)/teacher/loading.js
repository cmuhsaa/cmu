import Link from "next/link";

export default function StudentDirectorySkeleton() {
  return (
    <div className="mx-auto px-4 py-8 max-w-[1440px]">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Teachers Directory
      </h1>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="w-full md:w-64 h-10 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="w-32 h-10 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="w-32 h-10 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="w-32 h-10 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
      </div>

      {/* Student Cards */}
      <div className="space-y-4">
        {/* Student Card 1 */}
        <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-gray-200"></div>

            {/* Content */}
            <div className="flex-grow space-y-4">
              <div className="flex justify-between">
                <div className="w-48 h-6 bg-gray-200 rounded"></div>
                <div className="w-20 h-6 bg-gray-200 rounded"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="w-20 h-4 bg-gray-200 rounded"></div>
                    <div className="w-32 h-4 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>

              <div className="w-full h-4 bg-gray-200 rounded"></div>

              <div className="flex justify-between">
                <div className="w-48 h-4 bg-gray-200 rounded"></div>
                <div className="w-48 h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        {/* Student Card 1 */}
        <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-gray-200"></div>

            {/* Content */}
            <div className="flex-grow space-y-4">
              <div className="flex justify-between">
                <div className="w-48 h-6 bg-gray-200 rounded"></div>
                <div className="w-20 h-6 bg-gray-200 rounded"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="w-20 h-4 bg-gray-200 rounded"></div>
                    <div className="w-32 h-4 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>

              <div className="w-full h-4 bg-gray-200 rounded"></div>

              <div className="flex justify-between">
                <div className="w-48 h-4 bg-gray-200 rounded"></div>
                <div className="w-48 h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
