import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./includes/Header";
import Footer from "./includes/Footer";
import { Link, useNavigate } from "react-router-dom";
const HistoryList = () => {
    const [HistoryList, setHistoryList] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
    axios.post("http://localhost/Website-Truyen/Api/GetHistory.php", {
        userID: user.UserID})
        .then ((response) => {
            setHistoryList(response.data);
            console.log("History list:", response.data);
        })
    },[]);
  return (
     <div className="bg-black pb-10 min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 text-white px-10 py-10">
        <h2 className="uppercase text-xl mb-6">Lịch sử truyện đã đọc</h2>

        {HistoryList && HistoryList.length > 0 ? (
          <div className="flex flex-col gap-4">
            {HistoryList.map((item) => (
              <div
                key={item.StoryID}
                className="flex items-start gap-4 p-4 rounded bg-[#222]"
              >
                <Link to={`/comics/${item.StoryID}`} className="shrink-0">
                  <img
                    src={`http://localhost/Website-Truyen/Assets/Img/${item.Img}`}
                    alt={item.StoryName}
                    className="w-[110px] h-[150px] object-cover rounded"
                  />
                </Link>

                <div className="flex-1">
                  <Link
                    to={`/comics/${item.StoryID}`}
                    className="text-lg font-semibold hover:text-red-400"
                  >
                    {item.StoryName}
                  </Link>

                  <div className="mt-2 text-sm text-gray-300">
                    {/* Thay chap đã đọc gần nhất */}
                    {item.ChapterID ? (
                      <Link
                        to={`/read/${item.ChapterID}?story=${
                          item.StoryID
                        }&storyname=${encodeURIComponent(item.StoryName)}`}
                        className="text-sm text-gray-400 hover:text-gray-200"
                      >
                        Chương {item.ChapterNumber}
                      </Link>
                    ) : (
                      <span className="text-gray-400">
                        (Chưa có chương gần nhất)
                      </span>
                    )}
                  </div>

                  {/*<div className="mt-3 text-xs text-gray-500">
                    <span>Ngày đọc: {item.ReadDate || item.PublishedDate}</span>
                  </div>*/}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-6">
            Bạn chưa đọc truyện nào.
          </p>
        )}
      </main>

      <Footer />
    </div>
  );
};
export default HistoryList;