import Edit from "@/components/Edit";
import { getTeacherById } from "@/lib/getData";
import { getPaginatedTeachers } from "@/lib/getDatas";
import { notFound } from "next/navigation";
import React from "react";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const teacher = await getTeacherById(id);

  if (!teacher) {
    notFound();
  }
  return {
    title: "Alumni Teacher | " + teacher.name,
    description: "Alumni Teacher | " + teacher.about,
  };
}

const Page = async ({ params }) => {
  const { id } = await params;
  const teacher = await getTeacherById(id);

  if (!teacher) {
    notFound();
  }

  return (
    <div className="relative p-3 xl:p-0">
      <Edit model="teacher" id={id.toString()} />
      <div className="bg-white/50 rounded-xl shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 md:p-8 text-white">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {teacher.avatar && (
              <img
                src={teacher.avatar.url}
                alt="Teacher Avatar"
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white/20 shadow-lg"
              />
            )}
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold">{teacher.name}</h1>
              {teacher.title && (
                <p className="text-lg md:text-xl text-white/90 mt-1">
                  {teacher.title}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-gray-50 rounded-lg p-5">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Contact Details
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900 font-medium">
                    {teacher.email || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-900 font-medium">
                    {teacher.phone || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="text-gray-900">{teacher.address || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="md:col-span-2">
            <div className="bg-gray-50 rounded-lg p-5 h-full">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                About
              </h2>
              <div className="prose max-w-none text-gray-700">
                <p className="whitespace-pre-line">
                  {teacher.about || "No information available"}
                </p>
              </div>
            </div>
          </div>

          {/* Meta Information */}
          <div className="md:col-span-3 border-t pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Created
                </h3>
                <p>
                  {teacher.createDate?.date || "N/A"} at{" "}
                  {teacher.createDate?.formatedTime || "N/A"}
                </p>
              </div>
              {teacher.updateDate && (
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Updated
                  </h3>
                  <p>
                    {teacher.updateDate.date} at{" "}
                    {teacher.updateDate.formatedTime}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

export async function generateStaticParams() {
  const teachers = await getPaginatedTeachers({ page: 1, limit: Infinity });
  return teachers.teachers.map((teacher) => ({
    id: teacher._id.toString(),
  }));
}
