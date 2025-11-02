import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
const Header = () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost/Website-Truyen/Api/Home/SearchStory.php?keyword=${encodeURIComponent(keyword)}`
      );
      const data = await response.json();
      setResults(data);
      setShowDropdown(true); // hiện dropdown sau khi tìm
    } catch (error) {
      console.error("Lỗi khi tìm kiếm:", error);
    }
  };

  // Ẩn dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-4 bg-black flex items-center justify-between relative">
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-[25px] uppercase font-bold text-red-600">
          🕮 TruyệnKMA
        </Link>
        <nav className="flex items-center space-x-4">
          <Link to="/" className="text-white">Trang chủ</Link>
          <Link to="/categorylist" className="text-white">Thể loại</Link>
          <Link to="/authorlist" className="text-white">Tác giả</Link>
        </nav>
      </div>

      {/* Container input + button + dropdown */}
      <div ref={containerRef} className="relative w-80">
        <input
          type="text"
          placeholder="Search"
          className="p-3 w-full text-black bg-white rounded-md"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          onFocus={() => results.length > 0 && setShowDropdown(true)}
        />
        <button
          className="absolute right-1 top-1 p-2 text-white bg-red-600 rounded-md hover:bg-red-700 active:scale-95 transition-all"
          onClick={handleSearch}
        >
          Tìm kiếm
        </button>

        {/* Dropdown kết quả */}
        {showDropdown && results.length > 0 && (
  <div className="absolute top-full left-0 w-full bg-white text-black mt-1 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
    {results.map((item) => (
      <div
        key={item.StoryID}
        className="flex items-center p-2 hover:bg-gray-200 cursor-pointer"
      >
        <img
          src={`http://localhost/Website-Truyen/Assets/Img/${item.Img}`}
          alt={item.StoryName}
          className="w-12 h-16 object-cover rounded mr-2"
        />
        <div>
          {/* 👉 Chỉ bấm vào đây mới điều hướng */}
          <Link
            to={`/story/${item.StoryID}`}
            className="font-bold text-blue-600 hover:underline"
            onClick={() => setShowDropdown(false)}
          >
            {item.StoryName}
          </Link>
        </div>
      </div>
    ))}
  </div>
)}


      </div>

      <div className="flex items-center space-x-4">
        <nav className="flex items-center space-x-4">
          <Link to="/login" className="bg-white text-black rounded-3xl p-2 font-bold">Đăng nhập</Link>
          <Link to="/register" className="text-white border border-white rounded-3xl p-2 font-bold">Đăng ký</Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;
