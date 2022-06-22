import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function VideoPage() {
  const [currentVideo, setCurrentVideo] = useState();
  const [videoList, setVideoList] = useState();

  const location = useLocation();
  const dataLocation = location.state;

  useEffect(() => {
    console.log(location);
    setCurrentVideo(dataLocation.currentVideo);
    setVideoList(dataLocation.videoList);
    // console.log(videoList);
  }, [currentVideo, videoList]);

  return (
    <div className="w-full px-4 py-3 flex items-start">
      {videoList && <div className="w-[30%]">video list</div>}
      {videoList && (
        <div className="w-[70%]">
          <video src={videoList.path} controls className="rounded" />
        </div>
      )}
    </div>
  );
}

export default VideoPage;
