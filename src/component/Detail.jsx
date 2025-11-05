import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "./includes/Header";
import Footer from "./includes/Footer";
import { Link } from "react-router-dom";
const Detail = () => {
  const { StoryID } = useParams();
  const [data, setData] = useState([]);
  const [chapter, setChapter] = useState([]);
  const [loading, setLoanding] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const item = data?.data;
  const handleAddComment = (e) => {
    const comment = e.target.value;
    if (comment.trim() === "") return;
    const newComment = {
      id: comments.length + 1,
      name: "Người dùng mới",
      text: comment,
    };
    setComments([newComment, ...comments]);
    setComment("");
  };

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
        console.log("chap",res1)
      } catch (error) {
        setError(error.message);
        setLoanding(false);
      }
    };
    fetchData();
  }, [StoryID]);
  if (loading) return <p>Loading... </p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
     {/* <Helmet>
        <title>{data.data.seoOnPage.titleHead}</title>
      </Helmet>*/}
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
                <p className="text-xl font-bold">15</p>
                <p className="text-xs text-gray-400">Chap</p>
              </div>
              <div>
                <p className="text-xl font-bold">14.783</p>
                <p className="text-xs text-gray-400">Lượt xem</p>
              </div>
              <div>
                <p className="text-xl font-bold">225</p>
                <p className="text-xs text-gray-400">Theo dõi</p>
              </div>
            </div>

            <div className="mt-4 text-center">
              <div className="flex justify-center text-yellow-400">★★★★☆</div>
              <p className="text-gray-400 text-sm mt-1">4/5</p>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <button className="w-full py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700">
                Theo Dõi
              </button>
              <button className="w-full py-2 bg-yellow-600 rounded-lg hover:bg-yellow-700">
                Like
              </button>
              <button className="w-full py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
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
                {item.Decrition}
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
                                <span className="text-red-500">👁️</span>#
                                {chapList.view}
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
        <div className="bg-gray-900 p-4 rounded-xl max-w-4xl mx-auto mt-4">
          <h3 className="text-xl font-bold mb-3">BÌNH LUẬN</h3>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Nhập bình luận..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 p-2 rounded-lg text-white outline-none  bg-gray-800"
            />
            <button
              onClick={handleAddComment}
              className="bg-red-600 hover:bg-red-500 px-4 rounded-lg cursor-pointer"
            >
              GỬI
            </button>
          </div>

          <div className="space-y-3">
            {comments.map((c) => (
              <div
                key={c.id}
                className="bg-gray-800 p-3 rounded-lg text-sm flex flex-col"
              >
                <span className="text-red-400 font-semibold">{c.name} </span>
                <p className="text-gray-200 mt-1">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Detail;
