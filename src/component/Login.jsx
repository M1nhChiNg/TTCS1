import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Mật khẩu không khớp!");
      return;
    }
    try {
      const url = isLogin
        ? "http://localhost/Website-Truyen/Api/Login.php"
        : "http://localhost/Website-Truyen/Api/Register.php";

      const res = await axios.post(url, formData);
      const data = res.data;
      if (isLogin) {
        if (data.success) {
          localStorage.setItem("user", JSON.stringify(data.user));
          alert("Đăng nhập thành công!");
          if (data.user.Role == 0) {
            window.location.href = "/admin";
          } else {
            window.location.href = "/";
          }
        } else {
          alert(data.message || "Sai tài khoản hoặc mật khẩu!");
        }
      } else {
        if (data.success) {
          alert("Đăng ký thành công! Hãy đăng nhập.");
          setIsLogin(true);
        } else {
          alert(data.message || "Email đã tồn tại!");
        }
      }
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Không thể kết nối đến server!");
    }
  };
  return (
    <div
      className="min-h-screen grid place-items-center px-4 py-8 bg-black bg-cover bg-center"
      style={{ backgroundImage: "url('/src/assets/bg-login3.jpg')" }}
    >
      <div className="w-full max-w-md sm:max-w-sm md:max-w-md bg-white/95 p-6 sm:p-8 rounded-2xl shadow-xl">
        <div className="flex justify-center mb-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center">
            {isLogin ? "Đăng nhập" : "Đăng ký"}
          </h2>
        </div>

        {/* toggle - sliding pill covers full text; text centered */}
        <div className="relative mb-6 rounded-full bg-gray-100/60 p-1">
          {/* sliding pill */}
          <div
            className={`absolute inset-y-1 left-1 w-1/2 bg-linear-to-r from-pink-600 via-pink-500 to-pink-300 rounded-full transition-transform duration-300 ease-in-out ${
              isLogin ? "translate-x-0" : "translate-x-full"
            }`}
            aria-hidden="true"
          />
          <div className="relative z-10 grid grid-cols-2 gap-0">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`h-10 flex items-center justify-center w-full rounded-full text-sm sm:text-base font-medium transition-colors ${
                isLogin ? "text-white" : "text-gray-800"
              }`}
            >
              Đăng nhập
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`h-10 flex items-center justify-center w-full rounded-full text-sm sm:text-base font-medium transition-colors ${
                !isLogin ? "text-white" : "text-gray-800"
              }`}
            >
              Đăng kí
            </button>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Tên của bạn"
            required
            className="w-full p-3 text-sm sm:text-base border-b-2 border-gray-200 bg-transparent outline-none placeholder-gray-400"
          />

          {!isLogin && (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              required
              className="w-full p-3 text-sm sm:text-base border-b-2 border-gray-200 bg-transparent outline-none placeholder-gray-400"
            />
          )}

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full p-3 text-sm sm:text-base border-b-2 border-gray-200 bg-transparent outline-none placeholder-gray-400"
          />

          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
              className="w-full p-3 text-sm sm:text-base border-b-2 border-gray-200 bg-transparent outline-none placeholder-gray-400"
            />
          )}

          {isLogin && (
            <div className="text-right">
              <p className="text-pink-600 hover:underline text-sm">
                Quên mật khẩu?
              </p>
            </div>
          )}

          <button className="w-full p-3 mt-2 bg-linear-to-r from-pink-600 via-pink-500 to-pink-300 text-white rounded-full text-base sm:text-lg font-medium hover:opacity-95 transition">
            {isLogin ? "Đăng nhập" : "Đăng ký"}
          </button>

          <p className="text-center text-gray-600 text-sm sm:text-base">
            {isLogin ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-pink-600 hover:underline"
            >
              {isLogin ? "Đăng ký" : "Đăng nhập"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
