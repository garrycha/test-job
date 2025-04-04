'use client';

import { useRouter } from 'next/navigation';

export default function Thanks() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto w-full sm:max-w-md">
        
        {/* Check SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto h-12 w-12 text-green-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>

        {/* Thank You Text */}
        <h2 className="mt-2 text-center text-3xl font-bold text-gray-900">
          Thank You!
        </h2>
        
        <br />
        
        <button
          type="button"
          onClick={() => router.push('/')}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        >
          Go Back to Homepage
        </button>
      </div>
    </div>
  );
}
