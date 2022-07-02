import { useEffect, useState } from "react";
import { httpGetCurrentLiveService } from "../services/httpGetAllLivesService";
// import VideoPlayer from "react-video-js-player";
// import "video.js/dist/video-js.css";

function VideoLive() {
  const [currentVideo, setCurrentVideo] = useState();
  const [posterVideo, setPosterVideo] = useState("");

  const getcurrentVideo = async () => {
    try {
      const { data } = await httpGetCurrentLiveService();
      console.log(data);
      setCurrentVideo(data);
      console.log(data.contentFiles[0].path);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getcurrentVideo();
  }, []);

  return (
    <div className="px-3 py-3">
      {currentVideo && currentVideo.contentFiles && (
        <video
          src={currentVideo.contentFiles[0].path}
          controls
          className=" rounded-md w-full h-[500px] object-fill "
          poster={currentVideo.picture}
          // width="720"
        />
      )}
    </div>
  );
}

export default VideoLive;
