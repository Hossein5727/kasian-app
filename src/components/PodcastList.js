import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { httpGetAllPodcastService } from "../services/httpGetAllPodcastService";
import { scrollToBottom } from "../utils/scrollToBottom";
import AddButtonProduct from "./common/AddButtonProduct";
import posterMusic from "../assests/img/sound-details__image.jpg";
import { FiMoreVertical } from "react-icons/fi";
import TimeLine from "./common/TimeLine";
import music from "../assests/music/Moein Z - Che Heif (320).mp3";

function PodcastList({ isShowNav }) {
  const [podcastList, setPodcastList] = useState([]);

  const audioRef = useRef();

  // useEffect(() => {
  //   getAllPodcastList();
  // }, []);

  // const getAllPodcastList = async () => {
  //   try {
  //     const { data } = await httpGetAllPodcastService();
  //     console.log(data);
  //     setPodcastList(data);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  return (
    <div
      className="w-full p-5 flex gap-12 flex-col relative"
      style={{ direction: "rtl" }}
    >
      <div className="w-full h-[300px] bgSound rounded-lg">
        <div className="w-full h-full z-[3] relative flex  px-[50px] pt-5 justify-start items-center gap-5">
          <div className="w-[250px] h-[240px] relative">
            <img
              src={posterMusic}
              className="w-full h-full rounded-[24px] z-[2] absolute top-0"
              alt={"poster"}
            />
            <div className="w-full h-full bg-white opacity-80 z-[1] -right-[2px] absolute top-[2px] rounded-[24px]"></div>
          </div>

          <div className="flex flex-col gap-4 w-[50%] text-white">
            <h2 className="text-[26px]">عنوان ویدیو نوشته میشود</h2>

            <p className="text-justify text-[13px] test-[#DCDCDF] leading-7 opacity-90">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
              نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد
            </p>
          </div>
        </div>
      </div>

      <audio src={music} ref={audioRef} />

      <div className="w-full flex justify-start items-center gap-5 flex-wrap">
        {Array.apply(null, { length: 20 }).map((item, index) => (
          <div
            key={index}
            className="w-[32%] bg-[#1c1f2e] bg-opacity-60 p-[10px] rounded text-[#DCDCDF] flex justify-between items-center "
          >
            <img src={posterMusic} className="w-[76px] h-[68px] rounded-md" />

            <div className="h-full flex flex-col gap-3 -mr-12">
              <h3>عنوان ویدیو نوشته میشود ...</h3>
              <p className="text-[#75797C] text-xs">مدت زمان پخش : 14 دقیقه</p>
            </div>

            <button className="text-[#5F616C] text-2xl opacity-90 ">
              <FiMoreVertical />
            </button>
          </div>
        ))}
      </div>

      <TimeLine audioRef={audioRef} />

      <Outlet />
    </div>
  );
}

export default PodcastList;
