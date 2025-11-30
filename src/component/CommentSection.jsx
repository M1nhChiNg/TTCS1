import React, { useEffect, useState } from "react";

export default function CommentSection({ storyID }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user?.UserID;
  const username = user?.Username;

  // Lấy danh sách comment
  const fetchComments = async () => {
    try {
      const res = await fetch(`http://localhost/Website-Truyen/Api/comment.php?storyID=${storyID}`);
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error("Lỗi khi tải comment:", err);
    }
  };

  // Gửi comment mới
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userID) {
      alert("Bạn cần đăng nhập để bình luận!");
      return;
    }

    if (!content.trim()) {
      alert("Nội dung bình luận không được để trống!");
      return;
    }

    await fetch("http://localhost/Website-Truyen/Api/comment.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        storyID,
        userID,
        content,
      }),
    });
    
    setContent("");
    fetchComments(); 
  };

  useEffect(() => {
    fetchComments();
  }, [storyID]);

  return (
    <div className="bg-gray-900 w-full px-4 py-4 rounded-xl mt-4">
      <h2 className="text-xl font-bold mb-3">💬 Bình luận</h2>

      {/* Form nhập comment */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-xl shadow-md space-y-3"
      >
        <textarea
          placeholder={
            userID ? "Viết bình luận..." : "Đăng nhập để bình luận..."
          }
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={!userID}
          className="w-full text-black border p-2 rounded-lg h-24 focus:ring focus:ring-blue-200"
        ></textarea>
        <button
          type="submit"
          disabled={!userID}
          className={`w-full py-2 rounded-lg transition ${
            userID
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          Gửi bình luận
        </button>
      </form>

      {/* Danh sách comment */}
      <div className="space-y-4 mt-6">
        {comments.length === 0 && (
          <p className="text-gray-500 text-center">Chưa có bình luận nào</p>
        )}

        {comments.map((c) => (
          <div
            key={c.CommentID}
            className="bg-gray-50 border p-3 rounded-xl shadow-sm"
          >
            <p className="font-semibold text-blue-600">
              {c.Username ?? `User #${c.UserID}`}
            </p>
            <p className="text-gray-800">{c.Contentc}</p>
            <span className="text-xs text-gray-400">
              {new Date(c.CreatAT).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
