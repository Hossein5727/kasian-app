import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { httpGetAllPodcastService } from "../services/httpGetAllPodcastService";
import { scrollToBottom } from "../utils/scrollToBottom";
import AddButtonProduct from "./common/AddButtonProduct";
import posterMusic from "../assests/img/sound-details__image.jpg";
import { FiMoreVertical } from "react-icons/fi";
import TimeLine from "./common/TimeLine";
import music from "../assests/music/Moein Z - Che Heif (320).mp3";
import { useToken } from "../provider/EmailDataProvider";

function PodcastList({ isShowNav }) {
  const [podcastList, setPodcastList] = useState([]);

  const audioRef = useRef();
  const token = useToken();

  useEffect(() => {
    getAllPodcastList();
  }, []);

  const getAllPodcastList = async () => {
    try {
      const { data } = await httpGetAllPodcastService();
      console.log(data);
      setPodcastList(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      className="w-full p-5 flex gap-12 flex-col relative"
      style={{ direction: "rtl" }}
    >
      <div className="w-full h-[300px] bgSound rounded-lg">
        <Outlet />
        
      </div>

      <audio src={music} ref={audioRef} />

      <div className="w-full flex justify-start items-center gap-5 flex-wrap pb-24">
        {podcastList.map((item, index) => (
          <NavLink
            to={`/podcasts/podcastdetail/${item.id}`}
            key={index}
            className="w-[32%] bg-[#1c1f2e] bg-opacity-60 p-[10px] rounded text-[#DCDCDF] flex justify-between items-center "
          >
            <img src={posterMusic} className="w-[76px] h-[68px] rounded-md" />

            <div className="h-full flex flex-col gap-3 -mr-12">
              <h3>{item.title}</h3>
              <p className="text-[#75797C] text-xs">مدت زمان پخش : 14 دقیقه</p>
            </div>

            <button className="text-[#5F616C] text-2xl opacity-90 ">
              <FiMoreVertical />
            </button>
          </NavLink>
        ))}

        {token && (
          <AddButtonProduct
            toolTipTitle={"اضافه کردن پادکست"}
            productAddress="addpodcast"
          />
        )}
      </div>

      <TimeLine audioRef={audioRef} />
    </div>
  );
}

export default PodcastList;
