import React from "react";
import Loading from "./Loading";

const StoryLoading = () => {
  return (
    <div>
      <div className="w-[200px] h-[400px] relative  shrink-0 bg-gray-800">
        <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>
        <Loading width="100%" height="300px" radius="8px"></Loading>
        <div className=" mt-2 left-2">
          <div className="mt-5"></div>
          <Loading height="30px"></Loading>
          <div className="mt-8"></div>
          <Loading height="15px"></Loading>
        </div>
      </div>
    </div>
  );
};

export default StoryLoading;
