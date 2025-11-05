
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useLocation,useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const StoryReader = () => {
    const { ChapterID } = useParams();
        const [data, setData] = useState([]);
        const [loading, setLoanding] = useState(true);
        const [error, setError] = useState(null);
        const location = useLocation();
       const queryParams = new URLSearchParams(location.search);
        const StoryID = queryParams.get("story")
        const location1 = useLocation();
       const queryParams1 = new URLSearchParams(location1.search);
        const StoryName = queryParams1.get("storyname")
        const navigate = useNavigate();
          const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);
  useEffect(() => {
    const fetchData = async () => {        
      try {
        const response = await axios.get(`http://localhost/Website-Truyen/Api/Chapter/Chapter.php?ChapterID=${ChapterID}`);
        setData(response.data);
        setLoanding(false);
        console.log(response);
      } catch (error) {
        setError(error.message);
        setLoanding(false);
      }
    };
    fetchData();
  }, [ChapterID]);
  // Lấy danh sách chương
  useEffect(() => {
    if (!StoryID) return;
    axios
      .get(`http://localhost/Website-Truyen/Api/Story/GetChapter.php?StoryID=${StoryID}`)
      .then((res2) => setChapters(res2.data))
      .catch((err) => console.error(err));
  }, [StoryID]);

  // Ẩn popup khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowPopup(false);
      }
    };
    if (showPopup) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showPopup]);

  if (!data) return <p className="text-white text-center mt-10">Đang tải chương...</p>;
  return (
    <div>
      <div className="bg-[#111] min-h-screen text-white flex flex-col items-center">
        {/* Breadcrumb */}
        <div className="w-full max-w-4xl text-sm text-gray-300 mt-3 px-4">
          <Link to="/" className="hover:text-red-400 cursor-pointer">Trang Chủ</Link>{" "}
          &gt;{" "}
          <Link to={`/comics/${StoryID}`} className="hover:text-red-400 cursor-pointer">{StoryName}</Link>{" "}
          &gt; <span className="text-red-500">Chương </span>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-center mt-4 gap-3 text-gray-300">
          <button
          className={`px-4 py-2 border border-gray-600 rounded ${
            data.PrevChapterID ? "hover:bg-gray-700" : "opacity-40 cursor-not-allowed"
          }`}
          onClick={() =>
            data.PrevChapterID &&
            navigate(`/read/${data.PrevChapterID}?story=${StoryID}&storyname=${StoryName}`)
          }
        >
          &lt; Trước
        </button>
          <button
          onClick={() => setShowPopup(!showPopup)}
          className="px-4 py-2 border border-gray-600 rounded hover:bg-gray-700">
            Chương
          </button>
          <button
          className={`px-4 py-2 border border-gray-600 rounded ${
            data.NextChapterID ? "hover:bg-gray-700" : "opacity-40 cursor-not-allowed"
          }`}
          onClick={() =>
            data.NextChapterID &&
            navigate(`/read/${data.NextChapterID}?story=${StoryID}&storyname=${StoryName}`)
          }
        >
          Sau &gt;
        </button>
        </div>

        {/*  */}
        <div className="flex flex-col items-center mt-6 gap-4 w-full">
          {data.Content}
        </div>

        <div className="flex items-center justify-center mt-4 gap-3 text-gray-300">
          <button
          className={`px-4 py-2 border border-gray-600 rounded ${
            data.PrevChapterID ? "hover:bg-gray-700" : "opacity-40 cursor-not-allowed"
          }`}
          onClick={() =>
            data.PrevChapterID &&
            navigate(`/read/${data.PrevChapterID}?story=${StoryID}&storyname=${StoryName}`)
          }
        >
          &lt; Trước
        </button>
          <button 
          onClick={() => setShowPopup(!showPopup)}
          className="px-4 py-2 border border-gray-600 rounded hover:bg-gray-700">
            Chương
          </button>
          <button
          className={`px-4 py-2 border border-gray-600 rounded ${
            data.NextChapterID ? "hover:bg-gray-700" : "opacity-40 cursor-not-allowed"
          }`}
          onClick={() =>
            data.NextChapterID &&
            navigate(`/read/${data.NextChapterID}?story=${StoryID}&storyname=${StoryName}`)
          }
        >
          Sau &gt;
        </button>
        </div>
        {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={popupRef}
            className="bg-[#222] p-4 rounded-lg shadow-lg w-[400px] max-h-[70vh] overflow-y-auto"
          >
            <h3 className="text-xl font-semibold mb-3 text-center">Danh sách chương</h3>
            {chapters.length > 0 ? (
              chapters.map((ch) => (
                <button
                  key={ch.ChapterID}
                  onClick={() => {
                    navigate(`/read/${ch.ChapterID}?story=${StoryID}`);
                    setShowPopup(false);
                  }}
                  className={`block w-full text-left p-2 rounded ${
                    ch.ChapterID == ChapterID ? "bg-red-500" : "hover:bg-gray-600"
                  }`}
                >
                  Chương {ch.ChapterNumber}
                </button>
              ))
            ) : (
              <p className="text-center text-gray-400">Không có chương nào.</p>
            )}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default StoryReader;
