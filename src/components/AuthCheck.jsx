"use client";
import { AUTH_SUCCESS } from "@/store/constant";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const AuthCheck = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    const authCheck = async () => {
      const response = await fetch("/api/admin/verifyAdmin");
      const result = await response.json();
      if (result.success) {
        dispatch({ type: AUTH_SUCCESS });
      }
    };
    authCheck();
  }, [pathname]);

  return null;
};

export default AuthCheck;
