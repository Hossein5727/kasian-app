import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { httpGetOneContentService } from "../services/httpGetOneContentService";

function ArchiveDetailPage() {
  const [contentDetail, setContentDetail] = useState();

  const params = useParams();
  const navigate = useNavigate();
  const paramsId = params.id;

  useEffect(() => {
    getOneContent();
    console.log(paramsId);
  }, [params]);

  const getOneContent = async () => {
    try {
      const { data } = await httpGetOneContentService(paramsId);
      setContentDetail(data);
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="px-8 py-8 w-full" style={{ direction: "rtl" }}>
      {contentDetail && (
        <div className=" w-full rounded-lg h-[380px] relative overflow-hidden animate__animated  animate__fadeIn bgArchiveDetail">
          <img
            src={contentDetail.picture}
            alt={contentDetail.title}
            className="w-full h-full object-cover   "
          />
          <h2 className="font-semibold  text-5xl absolute top-4 right-8 z-[4] text-white">
            {contentDetail.title}
          </h2>
          <div className="text-gray-300 text-xs absolute top-20 right-8 z-[4]  leading-5  textOverFlow flex items-center gap-2">
            <h4 className="text-lg font-semibold text-primary-color">خلاصه</h4>
            <p>{contentDetail.description}</p>
          </div>

          <div className="absolute left-4 top-4 w-[52%]  py-5 px-7 h-[220px] bg-transparent  flex items-center gap-3 z-[3]">
            <Swiper slidesPerView={4} style={{ width: "100%" }}>
              {contentDetail &&
                contentDetail.contentFiles.map((item) => (
                  <SwiperSlide style={{ marginLeft: "22px" }} key={item.id}>
                    <div
                      onClick={() =>
                        navigate("/video", {
                          state: {
                            currentVideo: item,
                            videoList: contentDetail.contentFiles,
                          },
                        })
                      }
                      className="w-[120px] h-[160px] cursor-pointer rounded-md overflow-hidden   flex-col transition-all duration-300 hover:shadow-lg hover:shadow-slate-400 "
                    >
                      <img
                        src={contentDetail.thumbnail}
                        alt={item.id}
                        className="object-cover w-full h-full bg-center"
                      />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArchiveDetailPage;
