import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./includes/Header";
import Footer from "./includes/Footer";

const emptyForm = {
  storyID:"",
  storyName: "",
  author: "",
  category: "",
  img: "",
  descrition: "",
};

const emptyChapter = { 
  chapterID: "",
  chapterNumber: "",
  content: "",
};

const Admin = () => {
  const [stories, setStories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // chapter modal state
  const [chaptersOpen, setChaptersOpen] = useState(false);
  const [activeStoryId, setActiveStoryId] = useState(null);
  const [chapterForm, setChapterForm] = useState(emptyChapter);
  const [isEditingChapter, setIsEditingChapter] = useState(false);
  const [loadingChapter, setLoadingChapter] = useState(false);

  useEffect(() => {
    // TODO: Thay bằng API
    axios
        .get("http://localhost/Website-Truyen/Api/StoryDetail.php" )
        .then((res1) => setStories(res1.data))
        .catch((err) => console.error(err));
  },[]);
  const openAdd = () => {
    setForm(emptyForm);
    setIsEditing(false);
    setModalOpen(true);
  };

  const openEdit = (story) => {
  setForm({
    storyID: story.StoryID,
    storyName: story.StoryName,
    author: story.AuthorName,
    category: story.CategoryName,
    descrition: story.Descrition,
    img: story.Img,
  });
  setIsEditing(true);
  setModalOpen(true);
};


  const handleDelete = async (id) => {
    if (!confirm("Bạn có chắc muốn xóa truyện này?")) return;
    try {
      await axios.post('http://localhost/Website-Truyen/Api/DeleteStory.php', { id });
      setStories((s) => s.filter((x) => x.StoryID !== id));
    } catch (err) {
      console.error(err);
      alert("Xóa thất bại");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.storyName.trim() || !form.author.trim()) {
      alert("Vui lòng điền tiêu đề và tác giả");
      return;
    }
    setLoading(true);
    try {
      if (isEditing) {
        await axios.post('http://localhost/Website-Truyen/Api/UpdateStory.php', form);
        setStories((s) =>
          s.map((st) => (st.StoryID === form.storyID ? { ...form } : st))
        );
        alert("Cập nhật thành công");
      } else {
        const res = await axios.post('http://localhost/Website-Truyen/Api/AddStory.php', form);
        const newItem = { ...form, chapters: [] };
        setStories((s) => [newItem, ...s]);
        alert("Thêm truyện thành công");
      }
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Lỗi server");
    } finally {
      setLoading(false);
    }
  };

  // Chapters management
  const openChapters = (story) => {
    setActiveStoryId(story.StoryID);
    setChaptersOpen(true);
    setChapterForm(emptyChapter);
    setIsEditingChapter(false);
  };

  const closeChapters = () => {
    setChaptersOpen(false);
    setActiveStoryId(null);
    setChapterForm(emptyChapter);
    setIsEditingChapter(false);
  };

  const getActiveStory = () => stories.find((s) => s.StoryID === activeStoryId);

  const openAddChapter = () => {
    setChapterForm(emptyChapter);
    setIsEditingChapter(false);
  };

  const openEditChapter = (ch) => {
    setChapterForm({
  chapterID: ch.ChapterID,
  chapterNumber: ch.ChapterNumber,
  content: ch.Content,
   });
    setIsEditingChapter(true);
  };

  const handleDeleteChapter = async (chapterId) => {
    if (!confirm("Xóa chương này?")) return;
    setStories((prev) =>
      prev.map((s) =>
        s.StoryID === activeStoryId
          ? { ...s, chapters: s.chapters.filter((c) => c.ChapterID !== chapterId) }
          : s
      )
    );
    await axios.post('http://localhost/Website-Truyen/Api/DeleteChapter.php', { id: chapterId });
    alert("Đã xóa chương");
  };

  const handleChapterSubmit = async (e) => {
    e.preventDefault();
    if (!chapterForm.chapterNumber.trim()) {
      alert("Vui lòng nhập số chương");
      return;
    }
    setLoadingChapter(true);
    try {
      if (isEditingChapter) {
  await axios.post('http://localhost/Website-Truyen/Api/UpdateChapter.php', {
    chapterID: chapterForm.chapterID,
    chapterNumber: chapterForm.chapterNumber,
    content: chapterForm.content,
  });
  alert("Cập nhật chương thành công");
} else {
  await axios.post('http://localhost/Website-Truyen/Api/AddChapter.php', {
    storyID: activeStoryId,
    chapterNumber: chapterForm.chapterNumber,
    content: chapterForm.content,
  });
  alert("Thêm chương thành công");
}
      setChapterForm(emptyChapter);
      setIsEditingChapter(false);
    } catch (err) {
      console.error(err);
      alert("Lỗi xử lý chương");
    } finally {
      setLoadingChapter(false);
    }
  };

  return (
    <div className=" min-h-screen bg-gray-100 flex flex-col">
      <Header></Header>
      <div className="flex-1 max-w-5xl mx-auto mt-10 ">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Admin - Quản lý truyện</h1>
          <button
            onClick={openAdd}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:opacity-90"
          >
            Thêm truyện
          </button>
        </header>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Tiêu đề
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Tác giả
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Thể Loại
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Mô tả
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {stories.length === 0 && (
                <tr key="empty">
                  <td
                    colSpan="5"
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    Không có truyện
                  </td>
                </tr>
              )}
              {stories.map((s) => (
                <tr key={s.StoryID} className="border-t">
                  <td className="px-4 py-3">{s.StoryName}</td>
                  <td className="px-4 py-3">{s.AuthorName}</td>
                  <td className="px-4 py-3">{s.CategoryName}</td>                
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {s.Descrition}
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => openEdit(s)}
                      className="px-3 py-1 bg-yellow-400 text-black rounded hover:opacity-90"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(s.StoryID)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:opacity-90"
                    >
                      Xóa
                    </button>
                    <button
                      onClick={() => openChapters(s)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:opacity-90"
                    >
                      Chapters ({(s.chapters || []).length})
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Story Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-md bg-white rounded-lg p-6 shadow-lg"
            >
              <h2 className="text-lg font-medium mb-4">
                {isEditing ? "Sửa truyện" : "Thêm truyện"}
              </h2>

              <label className="block mb-2 text-sm">Tên truyện</label>
              <input
                value={form.storyName||""}
                onChange={(e) => setForm({ ...form, storyName: e.target.value })}
                className="w-full mb-3 px-3 py-2 border rounded"
                placeholder="Tên Truyện"
              />

              <label className="block mb-2 text-sm">Tác giả</label>
              <input
                value={form.author||""}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                className="w-full mb-3 px-3 py-2 border rounded"
                placeholder="Tác giả"
              />
              <label className="block mb-2 text-sm">Thể loại</label>
              <input
                value={form.category||""}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full mb-3 px-3 py-2 border rounded"
                placeholder="Thể Loại"
              />
              <label className="block mb-2 text-sm">Đường dẫn ảnh</label>
              <input
                value={form.img||""}
                onChange={(e) => setForm({ ...form, img: e.target.value })}
                className="w-full mb-3 px-3 py-2 border rounded"
              />
              <label className="block mb-2 text-sm">Mô tả</label>
              <textarea
                value={form.descrition||""}
                onChange={(e) =>
                  setForm({ ...form, descrition: e.target.value })
                }
                className="w-full mb-4 px-3 py-2 border rounded"
                rows="3"
                placeholder="Mô tả ngắn"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border rounded"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-pink-600 text-white rounded hover:opacity-90"
                >
                  {isEditing ? "Lưu" : "Thêm"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Chapters Modal */}
        {chaptersOpen && (
          <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center pt-10 md:pt-0 bg-black/40">
            <div className="w-full max-w-3xl bg-white rounded-lg p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">
                  Chapters - {getActiveStory()?.StoryName || "Truyện"}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={openAddChapter}
                    className="px-3 py-1 bg-green-600 text-white rounded"
                  >
                    Thêm chapter
                  </button>
                  <button
                    onClick={closeChapters}
                    className="px-3 py-1 border rounded"
                  >
                    Đóng
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Danh sách chương</h3>
                  <div className="max-h-80 overflow-auto border rounded p-2">
                    {(getActiveStory()?.chapters || []).length === 0 && (
                      <p className="text-sm text-gray-500">Chưa có chapter</p>
                    )}
                    {(getActiveStory()?.chapters || []).map((ch) => (
                      <div
                        key={ch.ChapterID}
                        className="p-2 border-b last:border-b-0 flex justify-between items-start gap-2"
                      >
                        <div>
                          <div className="font-medium">{ch.ChapterNumber}</div>
                          <div className="text-sm text-gray-600 line-clamp-3">
                            {ch.Content}
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={() => openEditChapter(ch)}
                            className="px-2 py-1 bg-yellow-400 rounded text-sm"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => handleDeleteChapter(ch.ChapterID)}
                            className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                          >
                            Xóa
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">
                    {isEditingChapter ? "Sửa chapter" : "Thêm chapter"}
                  </h3>
                  <form onSubmit={handleChapterSubmit} className="space-y-3">
                    <input
                      value={chapterForm.chapterNumber||""}
                      onChange={(e) =>
                        setChapterForm({
                          ...chapterForm,
                          chapterNumber: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Tiêu đề chapter"
                    />
                    <textarea
                      value={chapterForm.content||""}
                      onChange={(e) =>
                        setChapterForm({
                          ...chapterForm,
                          content: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border rounded"
                      rows="6"
                      placeholder="Nội dung chapter"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setChapterForm(emptyChapter);
                          setIsEditingChapter(false);
                        }}
                        className="px-3 py-2 border rounded"
                      >
                        Hủy
                      </button>
                      <button
                        type="submit"
                        disabled={loadingChapter}
                        className="px-3 py-2 bg-pink-600 text-white rounded"
                      >
                        {isEditingChapter ? "Lưu chapter" : "Thêm chapter"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Admin;