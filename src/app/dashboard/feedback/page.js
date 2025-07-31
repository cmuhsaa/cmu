"use client";
import { LOADING_END, LOADING_START } from "@/store/constant";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Feedback = () => {
  const [feedbacksData, setFeedbacksData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        dispatch({ type: LOADING_START });
        const data = await feedbacks();
        setFeedbacksData(data.feedbacks);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }

      dispatch({ type: LOADING_END });
    };
    fetchFeedbacks();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Customer Feedback
      </h2>

      {feedbacksData?.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600">No feedback submissions yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {feedbacksData?.map((feedback) => (
            <div
              key={feedback._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {feedback.name}
                      {feedback.email && (
                        <span className="block text-sm font-normal text-gray-500 mt-1">
                          {feedback.email}
                        </span>
                      )}
                    </h3>
                  </div>
                  <div className="text-sm text-gray-500">
                    {feedback.createDate?.date} at{" "}
                    {feedback.createDate?.formatedTime}
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  {feedback.phone && (
                    <p className="flex items-center gap-2 text-gray-700">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      {feedback.phone}
                    </p>
                  )}

                  {feedback.batch?.name && (
                    <p className="flex items-center gap-2 text-gray-700">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                      {feedback.batch.name}
                    </p>
                  )}

                  {feedback.message && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Message:</p>
                      <p className="text-gray-700">{feedback.message}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Feedback;

// fetcher function
const feedbacks = async (dispatch) => {
  const response = await fetch(`/api/feedback/`, {
    credentials: "include",
  });

  const data = await response.json();
  return data;
};
