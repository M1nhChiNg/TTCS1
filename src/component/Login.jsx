import React, { useState } from "react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      className="grid w-full h-screen place-items-center"
      style={{ backgroundImage: "url('/src/assets/bg-login3.jpg')" }}
    >
      <div className="w-[430px] bg-white p-8 rounded-2xl shadow-lg">
        <div className="flex justify-center mb-4">
          <h2 className="text-3xl font-semibold text-center">
            {isLogin ? "Đăng nhập" : "Đăng ký"}
          </h2>
        </div>

        <div className="relative flex h-12 mb-6 border border-gray-300 rounded-full overflow-hidden">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-1/2 text-lg font-medium transition-all z-10 ${
              isLogin ? "text-white" : "text-black"
            }`}
          >
            Đăng nhập
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`w-1/2 text-lg font-medium transition-all z-10 ${
              !isLogin ? "text-white" : "text-black"
            }`}
          >
            Đăng kí
          </button>
          <div
            className={`absolute top-0 h-full w-1/2 rounded-full bg-linear-to-r from-pink-600 via-pink-500 to-pink-200 ${
              isLogin ? "left-0" : "left-1/2"
            } `}
          ></div>
        </div>

        <form className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Enter your name"
              required
              className="w-full p-3 border-b-2 border-gray-300 outline-none focus:via-pink-500 placeholder-gray-400"
            />
          )}
          <input
            type="email"
            placeholder="Email address"
            required
            className="w-full p-3 border-b-2 border-gray-300 outline-none focus:via-pink-500 placeholder-gray-400"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full p-3 border-b-2 border-gray-300 outline-none focus:via-pink-500 placeholder-gray-400"
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm your name"
              required
              className="w-full p-3 border-b-2 border-gray-300 outline-none focus:via-pink-500 placeholder-gray-400"
            />
          )}

          {isLogin && (
            <div className="text-right">
              <p className="text-pink-600 hover:underline">Quên mật khẩu?</p>
            </div>
          )}

          <button className="w-full p-3 bg-linear-to-r from-pink-600 via-pink-500 to-pink-200 text-white rounded-full text-lg font-medium hover:opacity-90 transition">
            {isLogin ? "Đăng nhập" : "Đăng ký"}
          </button>

          <p className="text-center text-gray-600">
            {isLogin ? "Chưa có tài khoản? " : "Đã có tài khoản "}
            <a
              href="#"
              onClick={() => setIsLogin(!isLogin)}
              className="text-pink-600 hover:underline"
            >
              {isLogin ? "Đăng ký" : "Đăng nhập"}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
