import React, { useEffect, useState } from "react";

export default function LikeButton({ storyID }) {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user?.UserID;

  //  Kiểm tra đã like chưa
  const checkLiked = async () => {
    if (!userID) return; 
    const res = await fetch(
      `http://localhost/Website-Truyen/Api/Story/Favourite.php?userID=${userID}&storyID=${storyID}`
    );
    const data = await res.json();
    setLiked(data.liked);
  };

  //  Gửi hành động like/unlike
  const toggleLike = async () => {
    if (!userID) {
      alert("Vui lòng đăng nhập để yêu thích truyện!");
      return;
    }
    setLoading(true);
    const action = liked ? "unlike" : "like";
    await fetch("http://localhost/Website-Truyen/Api/Story/Favourite.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userID, storyID, action }),
    });

    setLiked(!liked);
    setLoading(false);
  };

  useEffect(() => {
    checkLiked();
  }, [storyID]);

  return (
    <button
      onClick={toggleLike}
      disabled={loading}
      className={`w-full py-2 bg-yellow-600 rounded-lg hover:bg-yellow-700 ${
        liked
          ? "bg-red-600 text-white"
          : "bg-yellow-600 text-black"
      }`}
    >
      {liked ? "💔 Bỏ Thích" : "❤️ Thích"}
    </button>
  );
}
