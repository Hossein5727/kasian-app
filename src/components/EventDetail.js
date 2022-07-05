import { useEffect, useState } from "react";
import { httpGetOneEventService } from "../services/httpGetOneEventService";
import { useNavigate, useParams } from "react-router-dom";
import DocumentMeta from "react-document-meta";
import MetaTags from "react-meta-tags";
import icon from "../assests/img/logo.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useToken, useTokenActions } from "../provider/EmailDataProvider";

function EventDetail() {
  const [eventDetail, setEventDetail] = useState([]);
  const [eventFiles, setEventFiles] = useState([]);

  const params = useParams();
  const paramsId = params.id;
  const navigate = useNavigate();
  const { setNewToken } = useTokenActions();
  const token = useToken();

  const meta = {
    title: `${eventDetail.title}`,
    description: "صفحه رویداد سایت کاسیان مدیا ",
    canonical: "http://kasianmedia.com/events/eventdetail/:id",
    meta: {
      charset: "utf-8",
      name: {
        keywords: `${eventDetail.title}`,
      },
    },
  };

  useEffect(() => {
    getEventDetail();
    // console.log(eventDetail);
  }, [params]);

  useEffect(() => {
    const tokenData = JSON.parse(sessionStorage.getItem("formData"));
    if (tokenData) {
      setNewToken(tokenData);
    }
  }, []);

  const getEventDetail = async () => {
    try {
      const { data } = await httpGetOneEventService(paramsId);
      setEventDetail(data);
      setEventFiles(data.eventFiles);
      // console.log(eventFiles);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <DocumentMeta {...meta}>
      <MetaTags>
        <link rel="icon" href={icon} />
      </MetaTags>
      <div className="w-full">
        {eventDetail && (
          <div className="flex flex-col justify-center items-center gap-4 text-[#757875]">
            <div className="w-full px-3 py-4 flex flex-col justify-center items-center gap-4 rounded-md border border-border-color bg-[#1C1F2E]">
              <p className="text-sm">وقایع و رویدادها</p>
              <div className="w-14 h-[3px] rounded-lg bg-border-color "></div>
              <h2 className="text-xl text-primary-color">
                {eventDetail.title}
              </h2>
            </div>

            <div className="w-full block relative imgEventDetail  rounded-md border border-border-color bg-[#1C1F2E] overflow-hidden ">
              <img
                src={eventDetail.picture}
                className=" w-full object-fill  "
                alt={eventDetail.title}
              />
            </div>

            {eventFiles && eventFiles.length > 0 && (
              <Swiper
                slidesPerView={"auto"}
                className="w-full"
                style={{ direction: "rtl" }}
                spaceBetween={12}
              >
                {eventFiles.map((item) => (
                  <SwiperSlide
                    key={item.id}
                    style={{
                      width: "165px",
                      height: "220px",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <img
                      src={item.path}
                      className="w-full h-full object-fill rounded"
                      alt={item.id}
                    />
                    <div className="w-full z-[4] bg-white absolute left-0 bottom-0 text-center py-3  bg-opacity-60 text-sm textShadow flex flex-col justify-center items-center">
                      {token && (
                        <div
                          className={`w-full h-[20px] mt-2  bottom-1 left-4 z-[4] rounded flex justify-center items-center  gap-4 transition-all duration-200`}
                        >
                          {/* <button
                            // onClick={() => showModal(item.id)}
                            className="flex items-center gap-3 rounded px-2 py-1 bg-primary-color text-white text-base transition-all duration-300 hover:from-primary-color hover:to-primary-color "
                          >
                            <AiFillDelete />
                          </button> */}

                          <button
                            onClick={() =>
                              navigate("/editeventfile", {
                                state: {
                                  id: item.id,
                                },
                              })
                            }
                            className="flex items-center gap-3 rounded px-2 py-1 bg-primary-color  text-white text-base transition-all duration-300 hover:from-primary-color hover:to-primary-color"
                          >
                            <AiFillEdit />
                          </button>
                        </div>
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}

            <div className="w-full px-3 py-4 flex flex-col justify-center items-end gap-4 rounded-md border border-border-color bg-[#1C1F2E]">
              <h2 className="text-base text-primary-color">
                توضیحات این رویداد
              </h2>
              <p
                style={{ direction: "rtl" }}
                className="text-sm text-[#DCD3CF] font-extralight leading-7"
              >
                {eventDetail.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </DocumentMeta>
  );
}

export default EventDetail;
