import { getPaginatedStudents } from "@/lib/getDatas";
import Link from "next/link";
import React from "react";

const roles = [
  { value: "president", position: "President (সভাপতি)" },
  { value: "vice_president", position: "Vice President (সহ-সভাপতি)" },
  {
    value: "general_secretary",
    position: "General Secretary (সাধারণ সম্পাদক)",
  },
  { value: "joint_secretary", position: "Joint Secretary (সহ-সম্পাদক)" },
  { value: "treasurer", position: "Treasurer (কোষাধ্যক্ষ)" },
  {
    value: "organizing_secretary",
    position: "Organizing Secretary (সাংগঠনিক সম্পাদক)",
  },
  { value: "advisor", position: "Advisor (উপদেষ্টা)" },
  { value: "legal_advisor", position: "Legal Advisor (আইন উপদেষ্টা)" },
];

export default async function StudentsPage() {
  const page = 1;
  const limit = 100;

  const allData = await Promise.all(
    roles.map(async (role) => {
      const studentsData = await getPaginatedStudents({
        page,
        limit,
        type: role.value,
        isActive: true,
      });
      return { role, students: studentsData };
    })
  );

  return (
    <div className="container mx-auto px-4 xl:px-0 py-4 xl:py-0">
      <div className="space-y-3">
        {allData.map(({ role, students }, index) => {
          if (!students?.students?.length) return null;

          return (
            <section key={role.value} className="">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-1 gap-3">
                {students.students.map((student, i) => (
                  <div
                    key={student.id || i}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <h2 className="text-sm bg-green-700 font-bold text-white p-1 text-center">
                      {role.position}
                    </h2>
                    <div className="relative h-48 bg-gray-100 flex items-center justify-center">
                      <img
                        src={student?.avatar?.url || "/placeholder.png"}
                        alt={student?.name}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-16" />
                    </div>

                    <div className="p-3">
                      <h3 className="text-sm font-semibold mb-1 text-gray-800">
                        {student?.name}
                      </h3>
                      <Link
                        href={`/student/${student?._id}`}
                        className="text-sm inline-flex items-center text-green-600 hover:text-green-800 font-medium transition-colors"
                      >
                        View Profile
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
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
