import Link from "next/link";
import {
  FaCalendarAlt,
  FaImages,
  FaBullhorn,
  FaNewspaper,
  FaUserGraduate,
} from "react-icons/fa";
import {
  FiClock,
  FiMapPin,
  FiMail,
  FiPhone,
  FiBriefcase,
} from "react-icons/fi";
import { getPaginatedEvents } from "../lib/getDatas";
import { getPaginatedGalleries } from "../lib/getDatas";
import { getPaginatedNotices } from "../lib/getDatas";
import { getPaginatedPosts } from "../lib/getDatas";
import { getPaginatedStudents } from "../lib/getDatas";
import MediaCarousel from "@/components/MediaCarousel";
import StudentReq from "@/components/StuedentReq";

export const dynamic = "force-static"; // Optional: forces static + ISR

export default async function Home() {
  const [{ events }, { galleries }, { notices }, { posts }, { students }] =
    await Promise.all([
      getPaginatedEvents({ page: 1, limit: 2 }),
      getPaginatedGalleries({ page: 1, limit: 2 }),
      getPaginatedNotices({ page: 1, limit: 2 }),
      getPaginatedPosts({ page: 1, limit: 2 }),
      getPaginatedStudents({ page: 1, limit: 2, isActive: true }),
    ]);

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <h1 className="text-center text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
        চাঁচাইতারা মাদলা যুক্ত উচ্চ বিদ্যালয়
      </h1>

      <EventSection events={events} />
      <GallerySection galleries={galleries} />
      <NoticeSection notices={notices} />
      <PostSection posts={posts} />
      <StudentSection students={students} />
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg overflow-hidden">
        <StudentReq />
      </section>
    </main>
  );
}

// Event Section
function EventSection({ events }) {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-blue-100">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-blue-900 flex items-center gap-2">
            <FaCalendarAlt className="text-blue-600" /> Upcoming Events
          </h2>
          <Link
            href="/event"
            className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-900 hover:bg-blue-200 transition-colors"
          >
            View All
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {events?.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 border border-blue-100"
            >
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FaCalendarAlt className="text-blue-600 text-xl" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{event.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {event.titleBangla}
                  </p>

                  <div className="mt-3 space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <FiClock className="mr-2" />
                      {event.eventDate} • {event.createDate.formatedTime}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FiMapPin className="mr-2" />
                      {event?.location}
                    </div>
                    <div className="text-sm text-gray-600">
                      Registration: {event.registrationStartDate} to{" "}
                      {event.registrationEndDate}
                    </div>
                  </div>

                  {event.description && (
                    <p className="mt-2 text-sm text-gray-700 line-clamp-2">
                      {event.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Gallery Section
function GallerySection({ galleries }) {
  return (
    <section className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-purple-100">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-purple-900 flex items-center gap-2">
            <FaImages className="text-purple-600" /> Gallery Highlights
          </h2>
          <Link
            href="/gallery"
            className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-purple-100 text-purple-900 hover:bg-purple-200 transition-colors"
          >
            View All
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {galleries?.map((gallery) => (
            <div
              key={gallery._id}
              className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 border border-purple-100"
            >
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <FaImages className="text-purple-600 text-xl" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{gallery.title}</h3>
                  <div className="text-sm text-gray-600 mt-1">
                    Posted on {gallery.createDate.date} at{" "}
                    {gallery.createDate.formatedTime}
                  </div>

                  {(gallery.youtubeLink || gallery.images?.length > 0) && (
                    <MediaCarousel
                      youtubeLink={gallery.youtubeLink.toString()}
                      images={gallery.images.map((item) => ({ url: item.url }))}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Notice Section
function NoticeSection({ notices }) {
  return (
    <section className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-amber-100">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-amber-900 flex items-center gap-2">
            <FaBullhorn className="text-amber-600" /> Latest Notices
          </h2>
          <Link
            href="/notice"
            className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-amber-100 text-amber-900 hover:bg-amber-200 transition-colors"
          >
            View All
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {notices?.map((notice) => (
            <div
              key={notice._id}
              className={`bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 border ${
                notice.type === "urgent" ? "border-red-200" : "border-amber-100"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-lg ${
                    notice.type === "urgent" ? "bg-red-100" : "bg-amber-100"
                  }`}
                >
                  <FaBullhorn
                    className={`text-xl ${
                      notice.type === "urgent"
                        ? "text-red-600"
                        : "text-amber-600"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-900">{notice.title}</h3>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        notice.type === "urgent"
                          ? "bg-red-100 text-red-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {notice.type}
                    </span>
                  </div>

                  <div className="text-sm text-gray-600 mt-1">
                    {notice.dateTime} • {notice.createDate.formatedTime}
                  </div>

                  {notice.description && (
                    <p className="mt-2 text-sm text-gray-700 line-clamp-3">
                      {notice.description}
                    </p>
                  )}

                  {notice.images?.length > 0 && (
                    <MediaCarousel
                      images={notice.images.map((item) => ({ url: item.url }))}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Post Section
function PostSection({ posts }) {
  return (
    <section className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-green-100">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-green-900 flex items-center gap-2">
            <FaNewspaper className="text-green-600" /> Recent Posts
          </h2>
          <Link
            href="/post"
            className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-900 hover:bg-green-200 transition-colors"
          >
            View All
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {posts?.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 border border-green-100"
            >
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <FaNewspaper className="text-green-600 text-xl" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{post.title}</h3>
                  <div className="text-sm text-gray-600 mt-1">
                    Posted on {post.createDate.date} at{" "}
                    {post.createDate.formatedTime}
                  </div>

                  {post.content && (
                    <p className="mt-2 text-sm text-gray-700 line-clamp-3">
                      {post.content}
                    </p>
                  )}

                  {(post.youtubeLink || post.images?.length > 0) && (
                    <MediaCarousel
                      youtubeLink={post.youtubeLink.toString()}
                      images={post.images.map((item) => ({ url: item.url }))}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Student Section
function StudentSection({ students }) {
  return (
    <section className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-indigo-100">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-indigo-900 flex items-center gap-2">
            <FaUserGraduate className="text-indigo-600" /> New Members
          </h2>
          <Link
            href="/student"
            className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-900 hover:bg-indigo-200 transition-colors"
          >
            View All
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {students?.map((student) => (
            <div
              key={student._id}
              className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 border border-indigo-100"
            >
              <div className="flex items-start gap-4">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <FaUserGraduate className="text-indigo-600 text-xl" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{student.name}</h3>
                  <div className="text-sm text-gray-600 mt-1">
                    {student.type} • Batch: {student.batch?.name}
                  </div>

                  <div className="mt-3 space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <FiMail className="mr-2" />
                      {student.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FiPhone className="mr-2" />
                      {student.phone}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FiBriefcase className="mr-2" />
                      {student.profession}
                    </div>
                    <div className="text-sm text-gray-600">
                      {student.address}
                    </div>
                  </div>

                  {student.about && (
                    <p className="mt-2 text-sm text-gray-700 line-clamp-2">
                      {student.about}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
