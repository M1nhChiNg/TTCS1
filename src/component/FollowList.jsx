import Header from "./includes/Header";
import Footer from "./includes/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const FollowList = () => {
    const [FollowList, setFollowList] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        axios.post("http://localhost/Website-Truyen/Api/FollowList.php", {
      userID: user.UserID,
    })
    .then((response) => {
      setFollowList(response.data);
      console.log("Follow list:", response.data);
    })
    .catch((error) => {
      console.error("Error fetching follow list:", error);
    });
  }, []);
  return (
    <div className="bg-black pb-10 min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 text-white px-10 py-10 mb-10">
        <h2 className="uppercase text-xl mb-4">Danh sách truyện đã follow</h2>

         {FollowList && FollowList.length > 0 ? (
          <div className="flex flex-wrap gap-4 justify-start ">
            {FollowList.map((item) => (
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
export default FollowList;