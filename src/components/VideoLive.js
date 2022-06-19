import { useEffect, useState } from "react";
import { httpGetAllLivesService } from "../services/httpGetAllLivesService";
import VideoPlayer from "react-video-js-player";
// import "video.js/dist/video-js.css";

function VideoLive() {
  const [currentVideo, setCurrentVideo] = useState([]);
  const [posterVideo, setPosterVideo] = useState("");

  const getcurrentVideo = async () => {
    try {
      const { data } = await httpGetAllLivesService();
      setCurrentVideo(data.items);
      console.log(data.items.thumbnail);
      setPosterVideo(
        data.items.map((item) => {
          return item.thumbnail;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getcurrentVideo();
  }, []);

  return (
    <div className="px-3 py-3">
      {currentVideo &&
        currentVideo.map((item) => (
          <div>
            {item.contentFiles.map((item) => (
              <div>
                {item.path && posterVideo && (
                  <video
                    src={item.path}
                    controls
                    className=" rounded-md w-full h-full "
                    poster={posterVideo}
                    // width="720"
                    // height="420"
                  />
                )}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}

export default VideoLive;
