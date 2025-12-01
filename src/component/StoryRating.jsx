import React, { useState, useEffect } from "react";
import axios from "axios";

const StoryRating = ({ storyID, userID }) => {
  const [rated, setRated] = useState(false);  
  const [hover, setHover] = useState(0);
  const [selected, setSelected] = useState(0);
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    if (!userID) return;
    axios
      .get(`http://localhost/Website-Truyen/Api/Story/CheckRated.php?storyID=${storyID}&userID=${userID}`)
      .then((res) => setRated(res.data.rated))
      .catch(console.error);
    axios
      .get(`http://localhost/Website-Truyen/Api/Story/GetStoryDetail.php?StoryID=${storyID}`)
      .then((res) => setAvgRating(res.data.Rating || 0))
      .catch(console.error);
  }, [storyID, userID]);
  const handleRate = (value) => {
    if (!userID) {
      alert("Vui lòng đăng nhập để đánh giá!");
      return;
    }
    setSelected(value);

    axios
      .post("http://localhost/Website-Truyen/Api/Story/RateStory.php", {
        StoryID: storyID,
        UserID: userID,
        Rating: value,
      })
      .then((res) => {
        if (res.data.success) {
          setRated(true);
          setAvgRating(res.data.newRating);
          alert("Đánh giá thành công!");
        } else {
          alert("Bạn đã đánh giá rồi!");
        }
      })
      .catch((err) => console.error("Lỗi:", err));
  };
  if (!userID) {
    return (
      <div className="text-center mt-4 text-gray-600">
        <p>Vui lòng <a href="/login" className="text-blue-500 underline">Đăng nhập</a> để đánh giá truyện.</p>
        <div className="flex justify-center mt-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} className="text-3xl text-gray-300">★</span>
          ))}
        </div>
        <p className="text-sm text-gray-500">Rating: {avgRating.toFixed(1)} / 5</p>
      </div>
    );
  }
  if (rated) {
    return (
      <div className="text-center mt-4 text-gray-600">
        Bạn đã đánh giá truyện này.  
        <div>Rating: {avgRating.toFixed(1)} / 5</div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center mt-6 gap-2">
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={`text-3xl cursor-pointer transition-colors ${
              i <= (hover || selected) ? "text-yellow-400" : "text-gray-400"
            }`}
            onClick={() => handleRate(i)}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(0)}
          >
            ★
          </span>
        ))}
      </div>
      <p className="text-sm text-gray-500">Rating: {avgRating.toFixed(1)} / 5</p>
    </div>
  );
};

export default StoryRating;
