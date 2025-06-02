import Navbar from "@/components/Navbar";
import React from "react";

const ProgressPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Navbar />

      <div className="flex flex-col items-center justify-center pt-32 px-4">
        <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-lg text-center">
          {/* Construction icon */}
          <div className="mx-auto mb-6 w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-yellow-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Halaman masih dalam Pengembangan <br />
            Role: Kontraktor Desa
          </h1>

          <p className="text-gray-600 mb-6">
            Kami sedang bekerja keras untuk menyiapkan halaman ini. Silakan
            kembali lagi nanti!
          </p>

          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
            <div
              className="bg-blue-600 h-2.5 rounded-full animate-pulse"
              style={{ width: "65%" }}
            ></div>
          </div>

          <p className="text-sm text-gray-500">
            Perkiraan selesai: 30 Mei 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
