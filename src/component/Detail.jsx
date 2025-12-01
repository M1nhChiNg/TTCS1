import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./includes/Header";
import Footer from "./includes/Footer";
import { Link, useNavigate } from "react-router-dom";
import CommentSection from "../component/CommentSection";
import LikeButton from "../component/LikeButton";
import FollowButton from "../component/FollowButton";
import StoryRating from "../component/StoryRating";
const Detail = () => {
  const { StoryID } = useParams();
  const [data, setData] = useState([]);
  const [chapter, setChapter] = useState([]);
  const [loading, setLoanding] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [userID, setUser]= useState(); 
  const firstChapter = chapter?.data?.[0];
  const item = data?.data;
  useEffect(() => {
    // Khi component mount, tạo timeout 10 giây
    const timer = setTimeout(() => {
      axios.post("http://localhost/Website-Truyen/Api/Story/IncreaseView.php", {
        storyID: StoryID
      })
      .then(res => console.log("View tăng", res.data))
      .catch(err => console.error("Lỗi tăng view", err));
    }, 10000);
    // Nếu user rời trang trước 10s, cancel timeout
    return () => clearTimeout(timer);
  }, [StoryID]);
  useEffect(() => {
      const Suser = localStorage.getItem("user");
      if (Suser) {
        setUser(JSON.parse(Suser));      
      }
    },[]);
//data story
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost/Website-Truyen/Api/Story/GetStoryDetail.php?StoryID=${StoryID}`
        );
        setData(response);
        const res1 = await axios.get(
          `http://localhost/Website-Truyen/Api/Story/GetChapter.php?StoryID=${StoryID}`);
        setChapter(res1);
        
        setLoanding(false);
        console.log(response);
        console.log("chap",res1);
      } catch (error) {
        setError(error.message);
        setLoanding(false);
      }
    };
    fetchData();
  }, [StoryID]);
  
  if (loading) return <p>Loading... </p>;
  if (error) return <p>Error: {error}</p>;
function timeAgo(datetime) {
  const now = new Date();
  const past = new Date(datetime);
  const diff = Math.floor((now - past) / 1000); // giây

  if (diff < 60) return "Vừa xong";
  if (diff < 3600) return Math.floor(diff / 60) + " phút trước";
  if (diff < 86400) return Math.floor(diff / 3600) + " giờ trước";
  if (diff < 2592000) return Math.floor(diff / 86400) + " ngày trước";
  if (diff < 31104000) return Math.floor(diff / 2592000) + " tháng trước";
  return Math.floor(diff / 31104000) + " năm trước";
}
  return (
    <div>
      <Header></Header>
      <div className="min-h-screen bg-[#1a1b1f] text-gray-200 p-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3 bg-[#111217] p-4 rounded-lg shadow-lg">
            <img
              src={`http://localhost/Website-Truyen/Assets/Img/${item.Img}`}
              alt={item.StoryName}
              className="w-full rounded-md object-cover"
            />

            <div className="flex justify-around text-center mt-4">
              <div>
                <p className="text-xl font-bold">{chapter.data.length}</p>
                <p className="text-xs text-gray-400">Chap</p>
              </div>
              <div>
                <p className="text-xl font-bold">{item.view}</p>
                <p className="text-xs text-gray-400">Lượt xem</p>
              </div>
              <div>
                <p className="text-xl font-bold">{item.Favourite}</p>
                <p className="text-xs text-gray-400">Lượt thích</p>
              </div>
              <div>
                <p className="text-xl font-bold">{item.Follow}</p>
                <p className="text-xs text-gray-400">Theo dõi</p>
              </div>
            </div>
            <div className="mt-4 text-center">
              {/*<div className="flex justify-center text-yellow-400">★★★★☆</div>
              <p className="text-gray-400 text-sm mt-1">4/5</p>*/}
              <StoryRating storyID={StoryID} userID={userID} />
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <FollowButton storyID={StoryID} />
              <LikeButton storyID={StoryID} />
              <button className="w-full py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
              onClick={() =>
               navigate(`/read/${firstChapter.ChapterID}?story=${item.StoryID}&storyname=${item.StoryName}`)
               }
              >
                Đọc Từ Đầu
              </button>
            </div>
          </div>

          <div className="md:w-2/3 space-y-6 bg-[#111217]">
            <div className="p-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {item.StoryName}
                </h1>
                <div className="flex flex-wrap gap-2">
             {item.CategoryName && item.CategoryName.length > 0 ? (
           <span className="bg-indigo-700/40 text-sm px-2 py-1 rounded">
              {item.CategoryName}
             </span>
                 ) : (
                   "Other"
                     )}
                     </div>

              </div>
              <p className="text-sm leading-relaxed text-gray-300">
                {item.Descrition}
              </p>
              <div>
                <h2 className="text-lg font-semibold border-b border-gray-700 pb-1 mb-2">
                  Thông Tin
                </h2>
                <p className="text-sm">
                  <strong className="text-gray-400">TÁC GIẢ:</strong>{" "}
                  <span className="text-gray-300">{item.AuthorName}</span>
                </p>
                
                <p className="text-sm">
                  <strong className="text-gray-400">TRẠNG THÁI:</strong>{" Đang cập nhật"}
                  {/*<span className="text-green-400">{item.status}</span>*/}
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold border-b border-gray-700 pb-1 mb-4">
                  Danh Sách
                </h2>
                </div>
                {/* Hiển thị các chapters */}
                <div className="max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 pr-2">
                
                      <div className="grid grid-cols-2 gap-2">
                        {chapter.data && chapter.data.length > 0 ? (
                          chapter.data.map((chapList) => (
                            <Link to={`/read/${chapList.ChapterID}?story=${item.StoryID}&storyname=${item.StoryName}`}
                              key={chapList.ChapterID}
                              className="flex justify-between items-center bg-[#22232b] hover:bg-[#2c2d35] px-3 py-2 rounded-md cursor-pointer transition"
                            >
                              <div className="text-xs text-gray-400">
                               Chương: {chapList.ChapterNumber}
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <span className="text-red-500">👁️</span>
                                {chapList.view}
                                <span className="text-red-500">⏰</span>
                                {timeAgo(chapList.PublishedDate)}
                              </div>
                            </Link>
                          ))
                        ) : (
                          <span>Chapter coming soon...</span>
                        )}
                      </div>
                    
                  
                
                </div>
                {/** */}
            </div>
          </div>
        </div>
         <CommentSection storyID={StoryID} />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Detail;
