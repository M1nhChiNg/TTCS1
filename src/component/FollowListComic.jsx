import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./includes/Header";
import Footer from "./includes/Footer";
import { Link, useNavigate } from "react-router-dom";

const FollowListComic = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setLoading(false);
      return;
    }
    const fetchFollowed = async () => {
      try {
        const res = await axios.get(
          // Thay api followList ở đây
          "http://localhost/Website-Truyen/Api/Home/GetStoryList.php",
          { params: { userID: user.UserID } }
        );
        setData(res.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Lỗi khi tải dữ liệu");
        setLoading(false);
      }
    };
    fetchFollowed();
  }, []);

  if (loading) return <p className="text-white">Loading...</p>;

  return (
    <div className="bg-black pb-10 min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 text-white px-10 py-10 mb-10">
        <h2 className="uppercase text-xl mb-4">Danh sách truyện đã follow</h2>

        {!JSON.parse(localStorage.getItem("user")) ? (
          <div className="text-center">
            <p>Bạn chưa đăng nhập.</p>
            <button
              onClick={() => navigate("/login")}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
            >
              Đăng nhập
            </button>
          </div>
        ) : error ? (
          <p className="text-red-400">Error: {error}</p>
        ) : data && data.length > 0 ? (
          <div className="flex flex-wrap gap-4 justify-start ">
            {data.map((item) => (
              <Link
                key={item.StoryID}
                to={`/comics/${item.StoryID}`}
                className="w-[200px] h-[380px] relative group shrink-0 bg-gray-800 overflow-hidden"
              >
                <div className="group-hover:scale-105 transition-transform duration-500 ease-in-out w-full h-full">
                  <img
                    src={`http://localhost/Website-Truyen/Assets/Img/${item.Img}`}
                    alt={item.StoryName}
                    className="w-full h-[300px] object-cover"
                  />
                  <div className="absolute mt-2 left-2">
                    <p className="uppercase text-shadow-md ">
                      {item.StoryName}
                    </p>
                    <p className="text-shadow-md">{item.PublishedDate}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-6">
            Bạn chưa theo dõi truyện nào.
          </p>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default FollowListComic;
