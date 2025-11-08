import React, { useEffect, useState } from "react";

const Banner = () => {
  const images = [
    "../../../banner1.png",
    "../../../banner2.png",
    "../../../banner3.png",
    "../../../banner4.png",
    "../../../banner5.png",
  ];

  const [index, setIndex] = useState(0);

  // Tự động chuyển ảnh mỗi 3 giây
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);
  return (
    <div className="relative w-full max-w-[1100px] mx-auto h-[500px] overflow-hidden rounded-lg shadow-lg">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all ${
              i === index ? "bg-red-600 scale-125" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Banner;