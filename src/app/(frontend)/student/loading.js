"use client";

export default function StudentDirectorySkeleton() {
  return (
    <div className="mx-auto max-w-[1440px] rounded-2xl overflow-hidden">
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

      {/* Search and Filters */}
      <div className="bg-white/40 backdrop-blur-[2px] rounded-xl shadow-md p-4 mb-6  border border-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="col-span-1 sm:col-span-2 lg:col-span-2 h-12 bg-gray-50/30 rounded-md animate-pulse"></div>
          <div className="col-span-1 sm:col-span-1 lg:col-span-1 h-12 bg-gray-50/30 rounded-md animate-pulse"></div>
          <div className="col-span-1 sm:col-span-1 lg:col-span-1 h-12 bg-gray-50/30 rounded-md animate-pulse"></div>
          <div className="col-span-1 sm:col-span-2 lg:col-span-2 flex gap-2 h-12 bg-gray-50/30 rounded-md animate-pulse"></div>
          <div className="col-span-1 sm:col-span-1 lg:col-span-1 flex gap-2 h-12 bg-gray-50/30 rounded-md animate-pulse"></div>
        </div>
      </div>

      {/* Student Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-3 xl:px-0">
        {[...Array(6)].map((_, idx) => (
          <div
            key={idx}
            className="relative bg-white/50 rounded-xl shadow-sm overflow-hidden border border-gray-100 p-6 animate-pulse"
          >
            {/* Avatar placeholder */}
            <div className="flex justify-center mb-6">
              <div className="w-34 h-34 rounded-full bg-gray-200 border-4 border-white shadow-md"></div>
            </div>

            {/* Name placeholder */}
            <div className="h-6 w-full bg-gray-200 rounde mb-4"></div>

            {/* Tags placeholders */}
            <div className="flex justify-start gap-2 mb-4">
              <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
              <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
            </div>

            {/* Info placeholders */}
            <div className="space-y-3">
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
              <div className="h-4 w-48 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
