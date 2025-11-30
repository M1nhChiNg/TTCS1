import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./includes/Header";
import Footer from "./includes/Footer";
import Banner from "./includes/Banner";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoanding] = useState(true);
  const [error, setError] = useState(null);
  const items = data?.data;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost/Website-Truyen/Api/Home/GetStoryList.php");
        setData(response);
        setLoanding(false);
        console.log(response);
      } catch (error) {
        setError(error.message);
        setLoanding(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading... </p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-black pb-10">
      <Header></Header>
      <Banner></Banner>
      <div className="text-white px-10 py-10 mb-10">
        <h2 className="uppercase text-xl mb-4">Truyện Mới Cập Nhật </h2>
        <div className="flex flex-wrap gap-4 justify-start">
          {items &&
            items.length > 0 &&
            items.map((item) => {
              return (
                <div key={item.StoryID}>
                  <Link to={`/comics/${item.StoryID}`}>
                    <div className="w-[200px] h-[400px] relative group shrink-0 bg-gray-800">
                      <div className="group-hover:scale-105 transition-transform duration-500 ease-in-out w-full h-full cursor-pointer">
                        <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>

                        <img
                          src={`http://localhost/Website-Truyen/Assets/Img/${item.Img}`}
                          alt={item.PublishedDate}
                          className="w-full h-[300px] object-cover"
                        />
                        <div className="absolute mt-2 left-2">
                          <p className="uppercase text-shadow-md ">
                            {item.StoryName || "No Title"}
                          </p>
                          <p className=" text-shadow-md ">{item.PublishedDate}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
