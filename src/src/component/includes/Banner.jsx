import Rating from "../../assets/rating.png";
import RatingHalf from "../../assets/rating-half.png";
import ImgTemp from "../../assets/temp-2.jpeg";

const Banner = () => {
  return (
    <div
      className="w-full h-[700px] bg-cover bg-no-repeat bg-center relative "
      style={{ backgroundImage: `url(./banner1.png)` }}
    >
      <div className="absolute w-full h-full bg-black top-0 left-0 opacity-40"></div>
      <div className="w-full h-full flex items-center justify-center space-x-[30px] p-4 relative z-20">
        <div className="flex flex-col space-y-5 items-baseline w-[50%]">
          <p className="text-white bg-linear-to-r from-red-500 to-red-200 text-md py-2 px-3">
            Manhwa
          </p>
          <div className="flex flex-col space-y-4">
            <h2 className="text-white text-[40px] font-bold">
              Con Trai Út Nhà Công Tước Là Sát Thủ Hồi Quy
            </h2>
            <div className="flex items-center space-x-3">
              <img src={Rating} alt="rating" className="w-8 h-8" />
              <img src={Rating} alt="rating" className="w-8 h-8" />
              <img src={Rating} alt="rating" className="w-8 h-8" />
              <img src={Rating} alt="rating" className="w-8 h-8" />
              <img src={RatingHalf} alt="ratinghalf" className="w-8 h-8" />
            </div>
            <p className="text-white">
              Cậu Út Nhà Công Tước Là Sát Thủ Hồi Quy là bộ manhwa Hàn Quốc
              thuộc thể loại hành động, hồi quy và phiêu lưu, kết hợp yếu tố
              kịch tính và tâm lý. Truyện kể về nhân vật chính, cậu út trong gia
              đình quý tộc, vốn là một sát thủ tài ba nhưng bị phản bội hoặc lâm
              vào hoàn cảnh nghiệt ngã trong kiếp trước...
            </p>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-white bg-black font-bold text-lg">
                Chi Tiết
              </button>
              <button className="p-2 text-white bg-red-600 font-bold text-lg">
                Đọc truyện
              </button>
            </div>
          </div>
        </div>
        <div className="w-[50%] flex items-center justify-center">
          <div className=" w-[350px] h-[450px] relative cursor-pointer">
            <img
              src={ImgTemp}
              alt="tmp"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
