import React from "react";

const StoryReader = () => {
  {
    /* Gọi api vào đây */
  }
  const images = [
    "https://images.pexels.com/photos/36478/amazing-beautiful-beauty-blue.jpg",
    "https://images.pexels.com/photos/36744/agriculture-arable-clouds-countryside.jpg",
    "https://images.pexels.com/photos/70577/sunset-birds-flying-sky-70577.jpeg",
  ];

  return (
    <div>
      <div className="bg-[#111] min-h-screen text-white flex flex-col items-center">
        {/* Breadcrumb */}
        <div className="w-full max-w-4xl text-sm text-gray-300 mt-3 px-4">
          <span className="hover:text-red-400 cursor-pointer">Trang Chủ</span>{" "}
          &gt;{" "}
          <span className="hover:text-red-400 cursor-pointer">Story Name</span>{" "}
          &gt; <span className="text-red-500">Chương </span>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-center mt-4 gap-3 text-gray-300">
          <button className="px-4 py-2 border border-gray-600 rounded hover:bg-gray-700">
            &lt; Trước
          </button>
          <button className="px-4 py-2 border border-gray-600 rounded hover:bg-gray-700">
            Chương
          </button>
          <button className="px-4 py-2 border border-gray-600 rounded hover:bg-gray-700">
            Sau &gt;
          </button>
        </div>

        {/* Ảnh minh họa */}
        <div className="flex flex-col items-center mt-6 gap-4 w-full">
          {images.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`page-${idx}`}
              className="w-[750px] max-w-full rounded-md shadow-lg"
            />
          ))}
        </div>

        <div className="flex items-center justify-center mt-4 gap-3 text-gray-300">
          <button className="px-4 py-2 border border-gray-600 rounded hover:bg-gray-700">
            &lt; Trước
          </button>
          <button className="px-4 py-2 border border-gray-600 rounded hover:bg-gray-700">
            Chương
          </button>
          <button className="px-4 py-2 border border-gray-600 rounded hover:bg-gray-700">
            Sau &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryReader;
