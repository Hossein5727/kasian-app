import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { httpGetAllLivesService } from "../services/httpGetAllLivesService";

function VideoList() {
  const [dataVideoLives, setDataVideoLives] = useState([]);

  const getDataVIdeoLives = async () => {
    try {
      const { data } = await httpGetAllLivesService();
      setDataVideoLives(data.items);
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getDataVIdeoLives();
  }, []);

  return (
    <div className="px-4 py-3 flex flex-col items-end gap-4">
      <p className="text-primary-text-light2 text-[17px]">لیست برنامه ها</p>
      {dataVideoLives &&
        dataVideoLives.length > 0 &&
        dataVideoLives.map((item) => (
          <div
            className="flex justify-end items-start gap-3 border border-border-color border-l-2 border-l-primary-color w-full px-2 py-2 rounded-lg"
            key={item.id}
          >
            <div className="h-[62px] w-full flex flex-col justify-between items-end">
              <p className="text-[#CECFD3] text-sm">{item.title}</p>
              <p className="text-[#767881] text-sm font-semibold flex flex-row-reverse gap-2 items-center">
                <FaPlay className="rotate-180 text-primary-orange" />
                {item.nPlayTime}
              </p>
            </div>
            <img
              src={item.thumbnail}
              alt={item.title}
              className="object-cover rounded-lg w-[74px] h-[62px]"
            />
          </div>
        ))}
    </div>
  );
}

export default VideoList;
