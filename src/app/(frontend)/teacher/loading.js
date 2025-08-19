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
            Honorable Teacher
          </h1>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/50 backdrop-blur-[2px] rounded-lg shadow-md p-4 mb-6">
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
        <div className="bg-white/50 backdrop-blur-[2px] rounded-lg shadow-md p-6 animate-pulse">
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
        <div className="bg-white/50 backdrop-blur-[2px] rounded-lg shadow-md p-6 animate-pulse">
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
