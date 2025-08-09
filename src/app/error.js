"use client";
import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
  statusCode = 500,
  message = "Something went wrong",
}) {
  useEffect(() => {
    // Optional: Add any tracking or logging here
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-md px-4 text-center">
        {/* Animated error icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-red-50/80 p-4">
              <svg
                className="h-full w-full text-red-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <div className="absolute -inset-4 -z-10 animate-ping rounded-full bg-red-100/40 duration-1000" />
          </div>
        </div>

        {/* Error code */}
        <h1 className="mb-2 text-5xl font-bold text-gray-800">{statusCode}</h1>

        {/* Error message */}
        <h2 className="mb-6 text-xl font-medium text-gray-600">{message}</h2>

        {/* Description */}
        <p className="mb-8 text-gray-500">
          We&apos;re sorry, but something unexpected happened. Our team has been
          notified and we&apos;re working to fix it.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col space-y-3 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Go back home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Contact support
          </Link>
        </div>
      </div>
    </div>
  );
}
