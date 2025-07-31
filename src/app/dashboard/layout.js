"use client";

import LogoutButton from "@/components/Logout";
import { authentication } from "@/store/Action";
import { MESSAGE } from "@/store/constant";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function RootLayout({ children }) {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const authenticated = useSelector((state) => state.authenticated);
  const isLoading = useSelector((state) => state.isLoading);
  const auth_loaded = useSelector((state) => state.auth_loaded);

  useEffect(() => {
    if (!authenticated && !isLoading && auth_loaded) {
      dispatch({
        type: MESSAGE,
        payload: {
          message: "",
          status: "",
          path: `/auth/login`,
        },
      });
    }
  }, [authenticated]);

  useEffect(() => {
    dispatch(authentication());
  }, [pathname]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white shadow-md fixed h-full">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
        </div>
        <nav className="p-4 space-y-2">
          <NavLink href="/dashboard/post/create">Create Post</NavLink>
          <NavLink href="/dashboard/notice/create">Create Notice</NavLink>
          <NavLink href="/dashboard/gallery/create">Create Gallery</NavLink>
          <NavLink href="/dashboard/batch/create">Create Batch</NavLink>
          <NavLink href="/dashboard/student/create">Create Student</NavLink>
          <NavLink href="/dashboard/teacher/create">Create Teacher</NavLink>
          <NavLink href="/dashboard/event/create">Create Event</NavLink>
          <NavLink href="/dashboard/batch">Batches</NavLink>
          <NavLink href="/dashboard/feedback">Feedback</NavLink>
          <NavLink href="/dashboard/update-password">Update Password</NavLink>
          <NavLink href="/dashboard/update-content">Update Content</NavLink>
          <LogoutButton />
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6">{children}</div>
    </div>
  );
}

// Custom NavLink component for active state styling
function NavLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
        isActive
          ? "bg-indigo-100 text-indigo-700 font-medium"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {children}
    </Link>
  );
}
