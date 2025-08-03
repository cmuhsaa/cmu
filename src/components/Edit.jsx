"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdDashboard } from "react-icons/md";

const Edit = ({ model, id }) => {
  const pathname = usePathname();
  return (
    <>
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
          <Link href={`/dashboard/${model}/edit/${id}`}>Update {model}</Link>
        )}
      </>
    </>
  );
};

export default Edit;
