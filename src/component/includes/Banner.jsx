import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  // Lấy dữ liệu từ API
  useEffect(() => {
    axios.get("http://localhost/Website-Truyen/Api/Banner.php") 
      .then(res => setBanners(res.data))
      .catch(err => console.error("Lỗi lấy banner:", err));
  }, []);

  // Tự động chuyển ảnh mỗi 4 giây
  useEffect(() => {
    if (banners.length === 0) return;

    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [banners]);

  const handleClick = (storyID) => {
    navigate(`/comics/${storyID}`);
  };

  if (banners.length === 0) return null;

  return (
    <div className="relative w-full max-w-[1100px] mx-auto h-[500px] overflow-hidden rounded-lg shadow-lg">
      {banners.map((banner, i) => (
        <img
          key={i}
          src={`http://localhost/Website-Truyen/Assets/Img/${banner.Img}`}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 cursor-pointer ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => handleClick(banner.StoryID)}
        />
      ))}

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
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
