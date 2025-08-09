"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdDashboard } from "react-icons/md";
import { MESSAGE } from "@/store/constant";
import Loading from "./Loading";
import DeleteModal from "./DeleteModal";
import { useDispatch } from "react-redux";

const Edit = ({ model, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const dispatch = useDispatch();
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

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/${model}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        dispatch({
          type: MESSAGE,
          payload: {
            message: `${model} Deleted!`,
            status: "info",
            path: `/${model}`,
          },
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: MESSAGE,
        payload: {
          message: error.message || `Unable to delete ${model}`,
          status: "error",
          path: ``,
        },
      });
      setLoading(false);
    }
  };

  return (
    <>
      <DeleteModal
        isOpen={isOpen}
        onCancel={handleCancel}
        onDelete={handleDelete}
      />
      {loading && <Loading />}
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
        <div className="absolute right-[10px] top-[10px] z-10">
          <Link
            className="text-center line-clamp-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-200"
            href={`/dashboard/${model}/edit/${id}`}
          >
            Update {model}
          </Link>
          <button
            onClick={() => setIsOpen(true)}
            className="w-full mt-1 line-clamp-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition duration-200"
          >
            Delete {model}
          </button>
        </div>
      )}
    </>
  );
};

export default Edit;
