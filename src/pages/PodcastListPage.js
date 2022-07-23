import { useEffect, useRef, useState } from "react";
import { useToken, useTokenActions } from "../provider/EmailDataProvider";
import { getToken } from "../utils/getToken";
import poster from "../assests/img/podcast-poster-1.jpg";
import { useLocation } from "react-router-dom";
import { useMusicSrc, useMusicSrcActions } from "../provider/MusicSrcProvider";
import TimeLine from "../components/common/TimeLine";

function PodcastListPage() {
  const [currentAudio, setCurrentAudio] = useState(null);
  const [audioList, setAudioList] = useState([]);
  const [musicSrc, setMusicSrc] = useState(null);
  const [isPlay, setIsPlay] = useState(false);

  const token = useToken();
  const { setNewToken } = useTokenActions();
  const location = useLocation();
  const dataLocation = location.state;
  const audioRef = useRef();

  console.log(musicSrc);

  useEffect(() => {
    getToken(setNewToken, token);
  }, [token]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    console.log(dataLocation);
    setAudioList(dataLocation.audioList);
    setCurrentAudio(dataLocation.currentAudio);
  }, [dataLocation, audioList, currentAudio]);

  return (
    <div className="w-full" style={{ direction: "rtl" }}>
      <figure className="w-full h-64 opacity-90 relative">
        <img
          src={poster}
          alt={"poster podcast"}
          className="w-full h-full object-fill"
        />
        {dataLocation.podcastDetail && (
          <div className="absolute top-[33%] left-[40%] text-[#2D3436] flex flex-col justify-center items-center gap-4 podcastDetail bg-opacity-80 rounded-tr-lg rounded-tl-lg px-10 py-6">
            <h2 className="text-xl font-bold">
              {dataLocation.podcastDetail.title}
            </h2>
            <h2 className="whitespace-nowrap text-sm">
              {dataLocation.podcastDetail.description}
            </h2>
          </div>
        )}
      </figure>

      {audioList && audioList.length > 0 && (
        <div className="w-full px-4 py-3">
          <table
            style={{ direction: "rtl" }}
            className="w-full text-sm text-gray-500 text-right"
          >
            <thead className="text-[#DCDCDF] bg-[#2e313e03] text-sm px-4">
              <tr>
                <th scope="col" className="py-3 px-2">
                  عنوان پادکست
                </th>
                <th scope="col" className="py-3 px-2">
                  دسته بندی
                </th>
                <th scope="col" className="py-3 px-2">
                  تاریخ انتشار
                </th>
                <th scope="col" className="py-3 px-2">
                  مدت زمان
                </th>
              </tr>
            </thead>
            <div className="flex justify-center items-center relative py-2">
              <div className="bordertHead h-[2px] w-[90vw] m-auto absolute top-0 -right-[3%]"></div>
            </div>
            <tbody className="">
              {audioList.map((item, index) => (
                <tr
                  onClick={() => {
                    setMusicSrc(item.path);
                    setIsPlay(true);
                  }}
                  className={` ${
                    musicSrc == item.path ? "bg-[#2e313e81]" : "bg-[#2e313e03]"
                  } text-right transition-all duration-150 hover:bg-[#2e313e81] rounded-lg`}
                  key={item.id}
                >
                  <th
                    scope="row"
                    className="py-4 px-2 text-white font-medium flex items-center gap-3"
                  >
                    <p className="text-xs">{index + 1}</p>
                    <img
                      src={item.picture}
                      alt={item.title}
                      className="w-[35px] h-[41px] rounded-md object-fill opacity-90"
                    />
                    <div className="h-full flex flex-col justify-center gap-3">
                      <p>{item.title}</p>
                      <p className="text-xs">استودیو کاسیان</p>
                    </div>
                  </th>
                  <td className="py-4 px-2">
                    {dataLocation.podcastDetail.category.title}
                  </td>
                  <td className="py-4 px-2">{item.nCreationDate}</td>
                  <td className="py-4 px-2">اضافه نشده</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <audio src={musicSrc} ref={audioRef} />

      {musicSrc && (
        <TimeLine
          audioRef={audioRef}
          isPlay={isPlay}
          setIsPlay={setIsPlay}
          musicSrc={musicSrc}
        />
      )}
    </div>
  );
}

export default PodcastListPage;
