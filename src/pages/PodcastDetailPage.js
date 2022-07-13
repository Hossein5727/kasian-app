import { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { httpGetOneAudioService } from "../services/httpGetOneAudioService";
import { Skeleton } from "@mui/material";
import playIcon from "../assests/img/play-button.svg";

function PodcastDetailPage() {
  const [audioData, setAudioData] = useState(null);

  const params = useParams();
  const paramsId = params.id;
  const dataOutlet = useOutletContext();
  console.log(dataOutlet);

  useEffect(() => {
    // console.log(paramsId);
    getOneAudio();
  }, [paramsId]);

  const getOneAudio = async () => {
    try {
      const { data } = await httpGetOneAudioService(paramsId);
      console.log(data);
      setAudioData(data);
    } catch (error) {}
  };

  const renderUi = () => {
    let value = "";

    if (audioData) {
      value = (
        <div className="w-full h-full z-[3] relative flex  px-[50px] pt-5 justify-start items-center gap-5">
          <div className="w-[250px] h-[240px] relative">
            <img
              src={audioData.picture}
              className="w-full h-full rounded-[24px] z-[2] absolute top-0"
              alt={"poster"}
            />
            <div className="w-full h-full bg-white opacity-80 z-[1] -right-[2px] absolute top-[2px] rounded-[24px]"></div>
          </div>

          <div className="flex flex-col gap-4 w-[30%] text-white">
            <h2 className="text-[26px]">{audioData.title}</h2>

            <p className="text-justify text-[13px] test-[#DCDCDF] leading-7 opacity-90">
              <p className="text-[15px]">توضیحات</p>
              {audioData.description}
            </p>
          </div>

          <div
            style={{ background: "rgba(255, 255, 255, 0.01)" }}
            className=" border border-[#2E313E] h-52 w-[410px] mr-24 mt-10 flex flex-col justify-start items-center rounded-lg   "
          >
            <h3 className="w-full px-12 whitespace-nowrap  text-center text-base py-2 bg-[#DCDCDF] text-[#2D3436] rounded-tr-lg rounded-tl-lg">
              قسمت های این پادکست
            </h3>
            <div
              style={{ background: "rgba(95, 97, 108, 0.08)" }}
              className="w-[91%] flex flex-col gap-3 mt-4 mb-3 text-sm overflow-y-scroll podcastFiles "
            >
              {audioData.contentFiles.map((item) => (
                <button
                  key={item.id}
                  className="w-full py-1 flex  items-center gap-3 px-3 rounded-md border border-[#3B4151] text-white cursor-pointer transition-all duration-150 focus:border-l-2 focus:border-l-primary-color"
                  onClick={() => {
                    dataOutlet.changeSrc(item.path);
                    dataOutlet.isPlay == false && dataOutlet.changeIsPlay(true);
                  }}
                >
                  <img
                    src={item.picture}
                    alt={item.title}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <p className="w-full whitespace-nowrap">{item.title}</p>

                  <button className="bg-primary-color p-[4px] rounded-full mr-6 ml-3 ">
                    <img src={playIcon} className="w-[16px] " alt={playIcon} />
                  </button>
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    } else {
      value = (
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

    return value;
  };

  return <div>{renderUi()}</div>;
}

export default PodcastDetailPage;
