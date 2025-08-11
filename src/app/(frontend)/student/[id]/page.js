import Edit from "@/components/Edit";
import { getStudentById } from "@/lib/getData";
import { getPaginatedStudents } from "@/lib/getDatas";
import { notFound } from "next/navigation";
import React from "react";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const student = await getStudentById(id);

  if (!student) {
    notFound();
  }
  return {
    title: "Alumni Student | " + student.name,
    description: "Alumni Student | " + student.about,
  };
}

const Page = async ({ params }) => {
  const { id } = await params;
  const student = await getStudentById(id);

  if (!student) {
    notFound();
  }

  return (
    <div className="relative p-3 xl:p-0">
      <Edit model="student" id={id} />
      <div className="bg-white/50 rounded-xl shadow-md overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 md:p-8 text-white flex flex-col md:flex-row items-start md:items-center gap-6">
          {student.avatar && (
            <img
              src={student.avatar.url}
              alt="Student Avatar"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-md"
            />
          )}
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-white">
              {student.name}
            </h1>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs md:text-sm font-medium bg-blue-100 text-blue-800">
                {student.type}
              </span>
              <span className="px-3 py-1 rounded-full text-xs md:text-sm font-medium bg-green-100 text-green-800">
                {student.profession}
              </span>
              {student.batch?.name && (
                <span className="px-3 py-1 rounded-full text-xs md:text-sm font-medium bg-purple-100 text-purple-800">
                  {student.batch.name}
                </span>
              )}
              <span
                className={`px-3 py-1 rounded-full text-xs md:text-sm font-medium ${
                  student.isActive
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {student.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">
              Contact Information
            </h2>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-900">{student.email || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-gray-900">{student.phone || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="text-gray-900">{student.address || "N/A"}</p>
            </div>
          </div>

          {/* About Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">
              About
            </h2>
            <p className="text-gray-900 whitespace-pre-line">
              {student.about || "No information available"}
            </p>
          </div>

          {/* Meta Information */}
          <div className="md:col-span-2 pt-4 border-t">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Created
                </h3>
                <p>
                  {student.createDate?.date || "N/A"} at{" "}
                  {student.createDate?.formatedTime || "N/A"}
                </p>
              </div>
              {student.updateDate && (
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Updated
                  </h3>
                  <p>
                    {student.updateDate.date} at{" "}
                    {student.updateDate.formatedTime}
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
  const students = await getPaginatedStudents({ page: 1, limit: Infinity });
  return students.students.map((student) => ({
    id: student._id.toString(),
  }));
}
