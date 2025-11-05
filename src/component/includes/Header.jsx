import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
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
      <div className="flex items-center space-x-4 ">
        <input
          type="text"
          placeholder="Search"
          className="p-4 text-black bg-white"
        />
        <button className="p-2 text-white bg-red-600 rounded-md ">
          Tìm kiếm
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <nav className="flex items-center space-x-4">
          <Link to={'/login'}
            className="bg-white text-black rounded-3xl p-2 font-bold ">
            Đăng nhập
          </Link>
          {/*<a
            
            className="text-white border border-white rounded-3xl p-2 font-bold"
          >
            Đăng ký
          </a>*/}
        </nav>
      </div>
    </div>
  );
};

export default Header;
