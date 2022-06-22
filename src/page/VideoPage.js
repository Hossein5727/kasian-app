import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

function VideoPage() {
  const [currentVideo, setCurrentVideo] = useState();
  const [videoList, setVideoList] = useState([]);

  const location = useLocation();
  const dataLocation = location.state;

  useEffect(() => {
    // console.log(location);
    setCurrentVideo(dataLocation.currentVideo);
    setVideoList(dataLocation.videoList);
    console.log(videoList);
  }, [currentVideo, videoList]);

  return (
    <div className="w-full px-4 py-3 flex items-start gap-3">
      {videoList && (
        <div className="w-[30%] flex flex-col">
          <div
            className="flex justify-end items-start gap-3 border border-border-color border-l-2 border-l-primary-color w-full px-2 py-2 rounded-lg"
            key={videoList.id}
          >
            <div className="h-[62px] w-full flex flex-col justify-between items-end">
              <p className="text-[#CECFD3] text-sm">{videoList.title}</p>
              <p className="text-[#767881] text-sm font-semibold flex flex-row-reverse gap-2 items-center">
                <FaPlay className="rotate-180 text-primary-orange" />
              </p>
            </div>
            <img
              src={videoList.picture}
              alt={videoList.title}
              className="object-cover rounded-lg w-[74px] h-[62px]"
            />
          </div>
        </div>
      )}
      {currentVideo && (
        <div className="w-[70%]">
          <video src={videoList.path} controls className="rounded" />
        </div>
      )}
    </div>
  );
}

export default VideoPage;
