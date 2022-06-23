import React from "react";
import VideoList from "../components/VideoList";
import VideoLive from "../components/VideoLive";
import DocumentMeta from "react-document-meta";

function HomePage() {
  const meta = {
    title: "کاسیان tv",
    description: "صفحه اصلی سایت کاسیان مدیا ",
    canonical: "http://kasianmedia.com/",
    meta: {
      charset: "utf-8",
      name: {
        keywords: "کاسیان tv,کاسیان live,کاسیان تی وی,کاسیان لایو ",
      },
    },
  };

  return (
    <DocumentMeta {...meta} className="w-full flex min-h-[88.9vh]">
      <div className="w-full flex min-h-[88.9vh]">
        <div className="w-[30%]">
          <VideoList />
        </div>
        <div className="w-[70%]">
          <VideoLive />
        </div>
      </div>
    </DocumentMeta>
  );
}

export default HomePage;
