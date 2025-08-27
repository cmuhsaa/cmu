"use client";
import React from "react";

export default function DeleteModal({ isOpen, onCancel, onDelete }) {
  if (!isOpen) return null;

  return (
    <div className="fixed max-h-[100dvh] inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full h-full flex items-center justify-center">
        <div className=" max-w-lg bg-white w-full h-full sm:w-2/3 sm:h-auto sm:rounded-lg shadow-lg flex flex-col justify-between p-6">
          {/* Modal Header */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Confirm Deletion
          </h2>

          {/* Modal Body */}
          <p className="text-gray-600 flex-1">
            Are you sure you want to delete this item? This action cannot be
            undone.
          </p>

          {/* Modal Footer */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onDelete}
              className="px-5 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
