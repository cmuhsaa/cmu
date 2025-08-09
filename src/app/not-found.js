"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFoundPage() {
  const router = useRouter();

  useEffect(() => {
    // Optional: Add tracking or analytics here
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-md px-4 text-center">
        {/* Animated 404 graphic */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-blue-50/80 p-4">
              <span className="text-5xl font-bold text-blue-400">404</span>
            </div>
            <div className="absolute -inset-4 -z-10 animate-pulse rounded-full bg-blue-100/40 duration-2000" />
          </div>
        </div>

        {/* Main heading */}
        <h1 className="mb-3 text-3xl font-bold text-gray-800">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="mb-8 text-gray-600">
          Oops! The page you&apos;re looking for doesn&apos;t exist or may have been
          moved.
        </p>

        {/* Popular links */}
        <div className="mb-8">
          <p className="mb-3 text-sm font-medium text-gray-700">
            Popular pages:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["/", "event", "post", "feedback"].map((link) => (
              <Link
                key={link}
                href={link === "/" ? "/" : `/${link.toLowerCase()}`}
                className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-200 hover:text-gray-900"
              >
                {link === "/"
                  ? "Home"
                  : link.charAt(0).toUpperCase() + link.slice(1)}
              </Link>
            ))}
          </div>
        </div>

        {/* Main action button */}
        <button
          onClick={() => router.back()}
          className="w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
