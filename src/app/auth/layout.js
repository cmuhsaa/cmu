"use client";

import Loading from "@/components/Loading";
import { useSelector } from "react-redux";

export default function RootLayout({ children }) {
  const isLoading = useSelector((state) => state.isLoading);
  return (
    <div>
      {isLoading && <Loading />}
      {children}
    </div>
  );
}
