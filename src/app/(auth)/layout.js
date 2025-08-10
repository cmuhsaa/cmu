"use client";

import Loading from "@/components/Loading";
import { useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const authCheck = async () => {
      const response = await fetch("/api/admin/verifyAdmin");
      const result = await response.json();
      setIsAuthenticated(result.success);
      setLoaded(true);
    };
    authCheck();
  }, [pathname]);

  useEffect(() => {
    if (isAuthenticated && loaded) router.push("/");
  }, [isAuthenticated, pathname, loaded]);

  const isLoading = useSelector((state) => state.isLoading);
  return (
    <div>
      {isLoading && !loaded && <Loading />}
      {children}
    </div>
  );
}
