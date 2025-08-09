"use client";

import Loading from "@/components/Loading";
import { MESSAGE } from "@/store/constant";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const FeedbackPage = () => {
  const [loading, setLoading] = useState(false);
  const [batches, setBatches] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    batch: "",
    message: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const res = await fetch(`/api/batch`);
        const data = await res.json();
        setBatches(data.batches || []);
      } catch (err) {
        console.error("Failed to fetch batches");
      }
    };

    fetchBatches();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      batch: form.batch,
      message: form.message,
    };

    try {
      setLoading(true);
      const res = await fetch(`/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (result.message) {
        dispatch({
          type: MESSAGE,
          payload: {
            message: result.message,
            status: "success",
            path: `/`,
          },
        });
      }
    } catch (err) {
      dispatch({
        type: MESSAGE,
        payload: {
          message: "Something went wrong",
          status: "error",
          path: ``,
        },
      });
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {loading && <Loading />}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-2xl">
            Share Your Feedback
          </h2>
          <p className="mt-3 text-xl text-gray-500">
            We&apos;d love to hear about your experience
          </p>
        </div>

        <div className="grid">
          {/* Feedback Form */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="01712345678"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="batch"
                  className="block text-sm font-medium text-gray-700"
                >
                  Batch
                </label>
                <select
                  id="batch"
                  name="batch"
                  value={form.batch}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select your batch</option>
                  {batches.map((batch) => (
                    <option key={batch._id} value={batch._id}>
                      {batch.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your feedback message..."
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
                >
                  Send Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
