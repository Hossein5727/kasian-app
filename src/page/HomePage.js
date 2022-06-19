import React from "react";
import VideoList from "../components/VideoList";
import VideoLive from "../components/VideoLive";

function HomePage() {
  return (
    <div className="w-full flex min-h-[88.9vh]">
      <div className="w-[30%]">
        <VideoList />
      </div>
      <div className="w-[70%]">
        <VideoLive />
      </div>
    </div>
  );
}

export default HomePage;
