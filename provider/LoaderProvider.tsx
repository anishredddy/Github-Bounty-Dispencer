"use client";

import FadeLoader from "react-spinners/FadeLoader";

// Default values shown

const LoaderProvider = () => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex flex-col items-center justify-center z-50">
      {/* <div className="w-16 h-16 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div> */}
      <FadeLoader color="white" radius={30} />
      <p className="text-white py-10 text-md">Loading....</p>
    </div>
  );
};

export default LoaderProvider;
