import { useEffect, useState } from "react";
import { httpGetOneEventService } from "../services/httpGetOneEventService";
import { useNavigate, useParams } from "react-router-dom";
import DocumentMeta from "react-document-meta";
import icon from "../assests/img/logo.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useToken, useTokenActions } from "../provider/EmailDataProvider";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { BeatLoader } from "react-spinners";

function EventDetail() {
  const [eventDetail, setEventDetail] = useState();
  const [eventFiles, setEventFiles] = useState([]);
  const [isLoadVideo, setIsLoadVideo] = useState(true);

  const params = useParams();
  const paramsId = params.id;
  const navigate = useNavigate();
  const { setNewToken } = useTokenActions();
  const token = useToken();
  const MySwal = withReactContent(Swal);
  const auth = `Bearer ${token}`;

  const meta = {
    title: `${eventDetail && eventDetail.title}`,
    description: "صفحه رویداد سایت کاسیان مدیا ",
    canonical: "http://kasianmedia.com/events/eventdetail/:id",
    meta: {
      charset: "utf-8",
      name: {
        keywords: `${eventDetail && eventDetail.title}`,
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
      setIsLoadVideo(true);
      setEventDetail(data);
      setEventFiles(data.eventFiles);
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const showModal = (id) => {
    MySwal.fire({
      title: <p>آیا از حذف اطمینان دارید؟ </p>,
      color: "#F0932B",
      icon: "question",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSelectedContentFile(id);
      }
    });
  };

  const deleteSelectedContentFile = (id) => {
    axios({
      headers: {
        Authorization: auth,
      },
      method: "DELETE",
      url: `/EventFile/Delete?id=${id}`,
    })
      .then((res) => {
        console.log(res);
        MySwal.fire({
          title: <p>فایل با موفقیت حذف شد </p>,
          color: "#F0932B",
          icon: "success",
        }).then(() => {
          window.location.reload();
          // navigate(-1);
        });
      })
      .catch((err) => {
        console.log(err);
        MySwal.fire({
          title: <p>خطا در فرایند حذف </p>,
          color: "#F0932B",
          icon: "error",
        });
      });
  };

  return (
    <DocumentMeta {...meta}>
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
                style={{ direction: "rtl", width: "100%" }}
                spaceBetween={12}
              >
                {eventFiles.map((item) => (
                  <SwiperSlide
                    key={item.id}
                    style={{
                      width: "370px",
                      height: "320px",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    {eventDetail.enEventFileType === 1 ? (
                      <div>
                        {isLoadVideo && (
                          <div className="w-full h-[210px] bg-gray-200 bg-opacity-40  flex justify-center items-center rounded">
                            <BeatLoader
                              color="#F0932B"
                              size={"27px"}
                              className="text-4xl"
                            />
                          </div>
                        )}
                        <video
                          src={item.path}
                          className={`rounded ${
                            isLoadVideo ? "hidden" : "block"
                          }`}
                          controls
                          onLoadedData={() => setIsLoadVideo(false)}
                        />
                      </div>
                    ) : (
                      <img
                        src={item.path}
                        className="w-full h-full object-fill rounded"
                        alt={item.id}
                      />
                    )}
                    {token && (
                      <div
                        className={`w-full h-[30px] bg-cyan-600 bottom-1 left-4 z-[4] rounded-br rounded-bl flex justify-center items-center  gap-4 transition-all duration-200`}
                      >
                        <button
                          onClick={() => showModal(item.id)}
                          className="flex items-center gap-3 rounded px-2 py-1 bg-primary-color text-white text-base transition-all duration-300 hover:from-primary-color hover:to-primary-color "
                        >
                          <AiFillDelete />
                        </button>

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
                    {/* </div> */}
                  </SwiperSlide>
                ))}
              </Swiper>
            )}

            <div className="w-full -mt-24 px-3 py-4 flex flex-col justify-center items-end gap-4 rounded-md border border-border-color bg-[#1C1F2E]">
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
