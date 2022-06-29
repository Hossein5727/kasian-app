import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import DocumentMeta from "react-document-meta";

function VideoPage() {
  const [currentVideo, setCurrentVideo] = useState();
  const [videoList, setVideoList] = useState([]);
  const [videoParh, setVideoParh] = useState();

  const location = useLocation();
  const dataLocation = location.state;

  useEffect(() => {
    // console.log(location);
    setCurrentVideo(dataLocation.currentVideo.path);
    setVideoList(dataLocation.videoList);
    console.log(dataLocation.videoList);
    console.log(dataLocation.currentVideo);
  }, [currentVideo, videoList]);

  const meta = {
    title: `${videoList.title}`,
    description: "صفحه آرشیو ویدیو سایت کاسیان مدیا ",
    canonical: "http://kasianmedia.com/archives/",
    meta: {
      charset: "utf-8",
      name: {
        keywords:
          "آرشیو ویدیو,آرشیو ویدیوها,آرشیو ویدیوهای کاسیان, آرشیو ویدیوهای کاسیان مدیا",
      },
    },
  };

  return (
    <DocumentMeta {...meta}>
      <div className="w-full px-4 py-3 flex items-start gap-3">
        <div className="w-[30%] flex flex-col gap-3">
          {videoList &&
            videoList.map((item) => (
              <div
                className="w-full flex flex-col cursor-pointer"
                onClick={() => setCurrentVideo(item.path)}
              >
                <div
                  className="flex justify-end items-start gap-3 border border-border-color border-l-2 border-l-primary-color w-full px-2 py-2 rounded-lg"
                  key={item.id}
                >
                  <div className="h-[62px] w-full flex flex-col justify-between items-end">
                    <p className="text-[#CECFD3] text-sm">{item.title}</p>
                    <p className="text-[#767881] text-sm font-semibold flex flex-row-reverse gap-2 items-center">
                      <FaPlay className="rotate-180 text-primary-orange" />
                    </p>
                  </div>
                  <img
                    src={item.picture}
                    alt={item.title}
                    className="object-cover rounded-lg w-[74px] h-[62px]"
                  />
                </div>
              </div>
            ))}
        </div>

        {currentVideo && videoList && (
          <div className="w-[70%]">
            <video src={currentVideo} controls className="rounded" />
          </div>
        )}
      </div>
    </DocumentMeta>
  );
}

export default VideoPage;
