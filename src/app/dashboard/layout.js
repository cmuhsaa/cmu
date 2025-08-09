"use client";
import Loading from "@/components/Loading";
import SidebarDashboard from "@/components/SidebarDashboard";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function BackgroundPage({ children }) {
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
    if (!isAuthenticated && loaded) router.push("/");
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen">
      {!loaded && <Loading />}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <SidebarDashboard />
          <div className="lg:col-span-3">{children}</div>
        </div>
      </div>
    </div>
  );
}
