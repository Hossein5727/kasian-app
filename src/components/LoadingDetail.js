import { Skeleton } from "@mui/material";
import React from "react";

function LoadingDetail() {
  return (
    <div className="w-full h-full z-[3] relative flex  px-[50px] pt-5 justify-start items-center gap-5">
      <div className="w-[250px] h-[240px] relative">
        <Skeleton
          variant="rectangular"
          width={250}
          height={240}
          style={{ borderRadius: "20px", background: "#191B28" }}
        />
      </div>

      <div className="flex flex-col gap-4 w-[50%] text-white">
        <Skeleton variant="text" style={{ background: "#191B28" }} />

        <Skeleton
          variant="text"
          height={130}
          style={{ background: "#191B28" }}
        />
      </div>
    </div>
  );
}

export default LoadingDetail;
