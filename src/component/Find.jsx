import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./includes/Header";
const Find = () => {
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [stories, setStories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");

  // Lấy danh sách thể loại và tác giả khi load trang
  useEffect(() => {
    axios
      .get("http://localhost/Website-Truyen/Api/CategoryList/CategoryList.php")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));

    axios
      .get("http://localhost/Website-Truyen/Api/AuthorList/AuthorList.php")
      .then((res) => setAuthors(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Lọc theo thể loại hoặc tác giả (chỉ 1 loại được chọn)
  useEffect(() => {
    if (selectedCategory) {
      axios
        .get("http://localhost/Website-Truyen/Api/Category/Category.php", {
          params: { CategoryID: selectedCategory },
        })
        .then((res) => setStories(res.data))
        .catch((err) => console.error(err));
    } else if (selectedAuthor) {
      axios
        .get("http://localhost/Website-Truyen/Api/Author/Author.php", {
          params: { AuthorID: selectedAuthor },
        })
        .then((res) => setStories(res.data))
        .catch((err) => console.error(err));
    } else {
      setStories([]);
    }
  }, [selectedCategory, selectedAuthor]);

  // Khi chọn thể loại → reset tác giả
  const handleSelectCategory = (catID) => {
    setSelectedCategory(catID === selectedCategory ? "" : catID);
    setSelectedAuthor(""); // reset tác giả
  };

  // Khi chọn tác giả → reset thể loại
  const handleSelectAuthor = (authorID) => {
    setSelectedAuthor(authorID === selectedAuthor ? "" : authorID);
    setSelectedCategory(""); // reset thể loại
  };

  return (
    
    <div className="bg-black pb-10">
      <Header></Header>
      <h1 className="text-2xl font-bold text-center mb-6 text-white">📚 Danh sách truyện</h1>

      {/* Danh sách tác giả & thể loại */}
      <div className="grid grid-cols-2 gap-6 mb-10 text-white">
        {/* Cột trái: tác giả */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-center">✍️ Tác giả</h2>
          <div className="grid grid-cols-3 gap-3">
            {authors.map((author) => (
              <button
                key={author.AuthorID}
                onClick={() => handleSelectAuthor(author.AuthorID)}
                className={`p-3 rounded-lg bg-yellow-400 border text-sm transition ${
                  selectedAuthor === author.AuthorID
                    ? "bg-red-500 text-white border-blue-500"
                    : "hover:bg-gray-100 border-gray-300"
                }`}
              >
                {author.AuthorName}
              </button>
            ))}
          </div>
        </div>

        {/* Cột phải: thể loại */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-center">🏷️ Thể loại</h2>
          <div className="grid grid-cols-3 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.CategoryID}
                onClick={() => handleSelectCategory(cat.CategoryID)}
                className={`p-3 bg-blue-400 rounded-lg border text-sm transition ${
                  selectedCategory === cat.CategoryID
                    ? "bg-green-500 text-white border-green-500"
                    : "hover:bg-gray-100 border-gray-300"
                }`}
              >
                {cat.CategoryName}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Danh sách truyện */}
      <div>
        <h2 className="text-lg text-white font-semibold mb-3 text-center">
           Kết quả tìm kiếm
        </h2>

        {stories.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {stories.map((story) => (
              <div
                key={story.StoryID}
                className=" w-[200px] h-[400px] border rounded-lg p-4 shadow-md hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition duration-300 ease-in-out"
              >
                <img
                  src={`http://localhost/Website-Truyen/Assets/Img/${story.Img}`}
                  alt={story.StoryName}
                  className="w-full h-[300px] object-cover"
                />
                <h3 className="font-semibold text-white">{story.StoryName}</h3>
                {/*<p className="text-sm text-gray-500">Tác giả: {story.AuthorName}</p>
                <p className="text-sm text-gray-500">
                  Thể loại: {story.CategoryName}
                </p>*/}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-6">
            Chưa có truyện để hiển thị
          </p>
        )}
      </div>
    </div>
  );
};

export default Find;
