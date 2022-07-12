import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { httpGetOneAudioService } from "../services/httpGetOneAudioService";
import posterMusic from "../assests/img/sound-details__image.jpg";

function PodcastDetailPage() {
  const [audioData, setAudioData] = useState(null);

  const params = useParams();
  const paramsId = params.id;

  useEffect(() => {
    // console.log(paramsId);
    getOneAudio();
  }, []);

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
              src={posterMusic}
              className="w-full h-full rounded-[24px] z-[2] absolute top-0"
              alt={"poster"}
            />
            <div className="w-full h-full bg-white opacity-80 z-[1] -right-[2px] absolute top-[2px] rounded-[24px]"></div>
          </div>

          <div className="flex flex-col gap-4 w-[50%] text-white">
            <h2 className="text-[26px]">{audioData.title}</h2>

            <p className="text-justify text-[13px] test-[#DCDCDF] leading-7 opacity-90">
              <p className="text-[15px]">توضیحات</p>
              {audioData.description}
            </p>
          </div>

          <div
            style={{ background: "rgba(255, 255, 255, 0.01)" }}
            className=" border border-[#2E313E] h-52 mt-10 flex flex-col justify-start items-center rounded-lg "
          >
            <h3 className="w-full px-12 whitespace-nowrap  text-center text-base py-2 bg-[#DCDCDF] text-[#2D3436] rounded-tr-lg rounded-tl-lg">
              قسمت های این پادکست
            </h3>
            <div
              style={{ background: "rgba(95, 97, 108, 0.08)" }}
              className="w-[91%] flex flex-col gap-3 mt-4 mb-3 text-sm "
            >
              {audioData.contentFiles.map((item) => (
                <div
                  key={item.id}
                  className="w-full py-2 flex items-center gap-3 px-3 rounded-md border border-[#3B4151] text-white cursor-pointer"
                >
                  <img src={item.picture} alt={item.title} className="w-10 h-10 rounded-lg object-cover" />
                  <p>{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    } else {
      value = (
        <div className="w-full h-full z-[3] relative flex  px-[50px] pt-5 justify-start items-center gap-5">
          <div className="w-[250px] h-[240px] relative">
            <img
              src={posterMusic}
              className="w-full h-full rounded-[24px] z-[2] absolute top-0"
              alt={"poster"}
            />
            <div className="w-full h-full bg-white opacity-80 z-[1] -right-[2px] absolute top-[2px] rounded-[24px]"></div>
          </div>

          <div className="flex flex-col gap-4 w-[50%] text-white">
            <h2 className="text-[26px]">عنوان ویدیو نوشته میشود</h2>

            <p className="text-justify text-[13px] test-[#DCDCDF] leading-7 opacity-90">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
              نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد
            </p>
          </div>
        </div>
      );
    }

    return value;
  };

  return <div>{renderUi()}</div>;
}

export default PodcastDetailPage;
