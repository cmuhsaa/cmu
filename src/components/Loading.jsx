"use client";
import { useEffect, useState } from "react";

export default function FullScreenLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm">
      <div className="text-center">
        {/* Logo or brand mark can go here */}
        <div className="mb-8 flex justify-center">
          <div className="h-16 w-16 animate-pulse rounded-full bg-gray-200/80" />
        </div>

        {/* Progress bar */}
        <div className="mb-2 h-1.5 w-64 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full bg-gray-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading text with subtle animation */}
        <p className="text-sm font-medium text-gray-600">
          Loading{" "}
          <span className="inline-block animate-[pulse_1.5s_ease-in-out_infinite]">
            .
          </span>
          <span
            className="inline-block animate-[pulse_1.5s_ease-in-out_infinite]"
            style={{ animationDelay: "0.2s" }}
          >
            .
          </span>
          <span
            className="inline-block animate-[pulse_1.5s_ease-in-out_infinite]"
            style={{ animationDelay: "0.4s" }}
          >
            .
          </span>
        </p>
      </div>
    </div>
  );
}
