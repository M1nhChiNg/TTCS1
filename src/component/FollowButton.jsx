import React, { useEffect, useState } from "react";

export default function LikeButton({ storyID }) {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user?.UserID;
  const checkLiked = async () => {
    if (!userID) return; 
    const res = await fetch(
      `http://localhost/Website-Truyen/Api/Story/Follow.php?userID=${userID}&storyID=${storyID}`
    );
    const data = await res.json();
    setLiked(data.liked);
  };
  const toggleLike = async () => {
    if (!userID) {
      alert("Vui lòng đăng nhập để theo dõi truyện!");
      return;
    }
    setLoading(true);
    const action = liked ? "unlike" : "like";
    await fetch("http://localhost/Website-Truyen/Api/Story/Follow.php", {
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
      className={`w-full py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 ${
        liked
          ? "bg-green-600 hover:bg-green-700"
          : "bg-indigo-600 hover:bg-indigo-700"
      }`}
    >
      {liked ? "Đang Theo Dõi ✔" : "Theo Dõi"}
    </button>
  );
}
