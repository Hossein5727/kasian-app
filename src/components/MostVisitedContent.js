import { PlayArrow } from "@mui/icons-material";
import { IoPlay } from "react-icons/io5";
import { BeatLoader } from "react-spinners";
import useSWR from "swr";

function MostVisitedContent({ setMusicSrc, changeIsPlay }) {
  const { data } = useSWR("/Content/GetMostVisited?contentType=2");

  if (!data)
    return (
      <div className="w-full flex justify-center items-center">
        <BeatLoader color="#F0932B" size={"27px"} className="text-4xl" />
      </div>
    );


  return (
    <div className="px-4 w-full h-[370px] bgSound text-white rounded-lg flex justify-start items-center gap-7">
      <img
        src={data.picture}
        alt={data.title}
        className="w-[200px] h-[280px] rounded-xl object-fill overflow-hidden"
      />
      <div className="h-[280px] py-2 flex flex-col justify-center items-start gap-5">
        <div className="bg-[#5F616C] rounded px-4 py-2 text-sm">
          <p>جدید ترین</p>
        </div>

        <h1 className="text-[28px] leading-10">{data.title}</h1>

        <h3 className="text-[15px] line-clamp-2 max-w-[250px] leading-8 text-[#DCDCDF]">
          {data.description}
        </h3>

        <div className="h-[2px] w-[525px] line-sparator"></div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setMusicSrc(data.path);
              changeIsPlay(true);
            }}
            className="p-2 rounded-full flex justify-center items-center bg-primary-color playBtn"
          >
            <IoPlay size={"26px"} />
          </button>
          <button className="py-2 px-4 flex justify-center items-center bg-[#5f616cc9] rounded-md">
            مشاهده پلی لیست
          </button>
        </div>
      </div>
    </div>
  );
}

export default MostVisitedContent;
