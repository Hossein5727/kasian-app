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

          <div className="bg-sky-400 mr-20">podcast files</div>
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
