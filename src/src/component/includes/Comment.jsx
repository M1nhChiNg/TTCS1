import axios from "axios";
import React, { useEffect, useState } from "react";

const Comment = () => {
  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");

  // Lấy danh sách comment khi load trang
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const res = await axios.get("http://localhost/backend/get_comments.php");
    setComments(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !content) return alert("Vui lòng nhập đầy đủ thông tin!");

    await axios.post("http://localhost/backend/add_comment.php", {
      username,
      content,
    });

    setUsername("");
    setContent("");
    fetchComments(); // load lại comment mới nhất
  };

  return (
    <div className="bg-gray-900 p-4 rounded-xl max-w-4xl mx-auto mt-4">
      <h3 className="text-xl font-bold mb-3">BÌNH LUẬN</h3>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Tên của bạn"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-1 p-2 rounded-lg bg-gray-700 focus:outline-none"
          required
        />
        <textarea
          placeholder="Nội dung bình luận..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 p-2 rounded-lg text-white  bg-gray-800 focus:outline-none"
          required
        />
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-500 px-4 rounded-lg cursor-pointer"
        >
          Gửi
        </button>
      </form>

      {/* Danh sách bình luận */}
      <div className="space-y-4">
        {comments.map((cmt) => (
          <div key={cmt.id}>
            <p className="text-sm text-gray-400">
              <strong className="text-red-600">{cmt.username}</strong> ·{" "}
              {new Date(cmt.created_at).toLocaleString()}
            </p>
            <div className="bg-gray-700 p-3 rounded-lg border border-gray-600">
              <p className="mt-1">{cmt.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;