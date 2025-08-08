"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdDashboard } from "react-icons/md";

const Edit = ({ model, id }) => {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const authCheck = async () => {
      const response = await fetch("/api/admin/verifyAdmin");
      const result = await response.json();
      setIsAuthenticated(result.success);
    };
    authCheck();
  }, [pathname]);

  if (!isAuthenticated) return null;

  return (
    <>
      {model == "dashboard" ? (
        <Link
          href={`${id}`}
          className={`flex items-center px-4 py-3 rounded-xl transition-all ${
            "/dashboard" === pathname
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
              : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          <MdDashboard className="w-4 h-4 mr-2" />
          <span className="font-medium">Dashboard</span>
        </Link>
      ) : (
        <Link className="line-clamp-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-200" href={`/dashboard/${model}/edit/${id}`}>Update {model}</Link>
      )}
    </>
  );
};

export default Edit;
