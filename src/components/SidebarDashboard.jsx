"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FiMenu,
  FiHome,
  FiChevronUp,
  FiChevronDown,
  FiPlus,
  FiUsers,
  FiCalendar,
  FiImage,
  FiFileText,
  FiLock,
} from "react-icons/fi";
import LogoutButton from "./Logout";

const SidebarData = {
  sidebarItems: [
    {
      href: "/",
      label: "Home",
      icon: <FiHome className="w-5 h-5 mr-3" />,
    },
    {
      href: "/dashboard/post/create",
      label: "Create Post",
      icon: <FiPlus className="w-5 h-5 mr-3" />,
    },
    {
      href: "/dashboard/notice/create",
      label: "Create Notice",
      icon: <FiFileText className="w-5 h-5 mr-3" />,
    },
    {
      href: "/dashboard/gallery/create",
      label: "Create Gallery",
      icon: <FiImage className="w-5 h-5 mr-3" />,
    },
    {
      href: "/dashboard/batch/create",
      label: "Create Batch",
      icon: <FiUsers className="w-5 h-5 mr-3" />,
    },
    {
      href: "/dashboard/student/create",
      label: "Create Student",
      icon: <FiUsers className="w-5 h-5 mr-3" />,
    },
    {
      href: "/dashboard/teacher/create",
      label: "Create Teacher",
      icon: <FiUsers className="w-5 h-5 mr-3" />,
    },
    {
      href: "/dashboard/event/create",
      label: "Create Event",
      icon: <FiCalendar className="w-5 h-5 mr-3" />,
    },
    {
      href: "/dashboard/student/request",
      label: "Student Request",
      icon: <FiUsers className="w-5 h-5 mr-3" />,
    },
    {
      href: "/dashboard/batch",
      label: "Batches",
      icon: <FiUsers className="w-5 h-5 mr-3" />,
    },
    {
      href: "/dashboard/feedback",
      label: "Feedback",
      icon: <FiFileText className="w-5 h-5 mr-3" />,
    },
    {
      href: "/dashboard/update-password",
      label: "Update Password",
      icon: <FiLock className="w-5 h-5 mr-3" />,
    },
    {
      href: "/dashboard/update-content",
      label: "Update Content",
      icon: <FiUsers className="w-5 h-5 mr-3" />,
    },
  ],
};

export default function SidebarDashboard() {
  const { sidebarItems } = SidebarData;
  const pathname = usePathname();
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(true);

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-8">
        {/* Navigation Menu - Collapsible with smooth transition */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setIsMainMenuOpen(!isMainMenuOpen)}
          >
            <h3 className="text-lg font-bold text-gray-800 flex items-center">
              <FiMenu className="w-5 h-5 mr-2 text-blue-600" />
              Dashboard Menu
            </h3>
            {isMainMenuOpen ? (
              <FiChevronUp className="w-5 h-5 text-gray-500 transition-transform duration-200" />
            ) : (
              <FiChevronDown className="w-5 h-5 text-gray-500 transition-transform duration-200" />
            )}
          </div>

          <nav
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isMainMenuOpen ? "max-h-[1000px] mt-4" : "max-h-0"
            }`}
          >
            <div className="space-y-2">
              {sidebarItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-xl transition-all ${
                    pathname.startsWith(item.href)
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                      : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
              <div className="px-4 py-3">
                <LogoutButton />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
