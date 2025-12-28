import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const containerRef = useRef(null);
  const userRef = useRef(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowUserMenu(false);
    navigate("/");
  };
  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost/Website-Truyen/Api/Home/SearchStory.php?keyword=${encodeURIComponent(
          keyword
        )}`
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
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="p-4 bg-black flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-[25px] uppercase font-bold text-red-600">
          🕮 TruyệnKMA
        </Link>
        <nav className="flex items-center space-x-4">
          <Link to="/" className="text-white">
            Trang chủ
          </Link>
          <Link to="/find" className="text-white">
            Danh sách
          </Link>
          {/*<a href="#" className="text-white">
            Tác giả
          </a>*/}
        </nav>
      </div>
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
        {showDropdown && results.length > 0 ? (
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
                    to={`/comics/${item.StoryID}`}
                    className="font-bold text-blue-600 hover:none"
                    onClick={() => setShowDropdown(false)}
                  >
                    {item.StoryName}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <span>Không tìm thấy truyện.</span>
        )}
      </div>
      <div ref={userRef} className="flex items-center space-x-4 relative">
        {user ? (
          <div className="relative flex items-center space-x-3 text-white">
            <div
              className="flex items-center cursor-pointer relative"
              onClick={() => setShowUserMenu((s) => !s)}
            >
              {user.Avatar ? (
                <img
                  src={user.Avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-black font-bold">
                  {user.UserName ? user.UserName.charAt(0).toUpperCase() : "U"}
                </div>
              )}
              <span className="ml-2">
                Chào: {user.UserName || "Người dùng"}
              </span>

              {showUserMenu && (
                <div className="absolute left-0 top-full mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowUserMenu(false);
                      navigate("/history");
                    }}
                  >
                    Lịch sử đọc
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowUserMenu(false);
                      navigate("/followed");
                    }}
                  >
                    Truyện đã follow
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowUserMenu(false);
                      handleLogout();
                    }}
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Link
              to="/login"
              className="bg-white text-black rounded-3xl p-2 font-bold"
            >
              Đăng nhập
            </Link>
            <Link
              to="/register"
              className="bg-red-600 text-white rounded-3xl px-3 py-2 font-bold hover:bg-red-700"
            >
              Đăng ký
            </Link>
          </div>
        )}

        {user && user.Role == 0 && (
          <Link
            to="/admin"
            className="bg-red-600 hover:bg-red-700 rounded-3xl px-3 py-2 font-bold transition text-white"
          >
            Quản lý
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
