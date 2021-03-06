import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Swiper, SwiperSlide } from "swiper/react";
import { useToken } from "../provider/EmailDataProvider";
import { httpGetOneContentService } from "../services/httpGetOneContentService";
// import required modules
import { Navigation, Pagination } from "swiper";
import "swiper/css/navigation";
import "swiper/css/pagination";

function ArchiveDetailPage() {
  const [contentDetail, setContentDetail] = useState();

  const params = useParams();
  const paramsId = params.id;
  const navigate = useNavigate();
  const token = useToken();
  const MySwal = withReactContent(Swal);

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

  const auth = `Bearer ${token}`;

  const showModal = (id) => {
    MySwal.fire({
      title: <p>آیا از حذف اطمینان دارید؟ </p>,
      color: "#F0932B",
      icon: "question",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteContent(id);
        Swal.fire("فایل با موفقیت حذف شد", "", "success").then(() => {
          window.location.reload();
          navigate("/archives");
        });
      }
    });
  };

  const deleteContent = (id) => {
    // console.log(id);
    axios({
      headers: {
        Authorization: auth,
      },
      method: "DELETE",
      url: `/Content/Delete?id=${id}`,
    })
      .then((res) => {
        navigate("/archives");
      })
      .catch((err) => {});
  };

  return (
    <div className="px-8 py-8 w-full" style={{ direction: "rtl" }}>
      {contentDetail && (
        <div className=" w-full rounded-lg h-[380px]  relative overflow-hidden animate__animated  animate__fadeIn bgArchiveDetail">
          <img
            src={contentDetail.picture}
            alt={contentDetail.title}
            className="w-full h-full object-fill    "
          />
          <h2 className="font-semibold  text-5xl absolute top-4 right-8 z-[4] text-white">
            {contentDetail.title}
          </h2>
          <div className="text-gray-300 text-xs absolute top-20 right-8 z-[4]  leading-5  textOverFlow flex items-center gap-2">
            <h4 className="text-lg font-semibold text-primary-color">خلاصه</h4>
            <p>{contentDetail.description}</p>
          </div>

          <div className="absolute left-4 top-4 w-[52%]  py-5 px-7 h-[220px] bg-transparent  flex items-center gap-3 z-[3]">
            <Swiper
              navigation={{
                // nextEl: ".nextSlide",
                // prevEl: ".prevSlide ",
                enabled: true,
              }}
              pagination={{
                enabled: true,
                clickable: true,
                // bulletClass: ".bullet",
              }}
              modules={[Navigation, Pagination]}
              slidesPerView={4}
              style={{ width: "100%", position: "relative" }}
            >
              {contentDetail &&
                contentDetail.contentFiles.map((item) => (
                  <SwiperSlide
                    style={{ marginLeft: "22px", cursor: "pointer" }}
                    key={item.id}
                  >
                    <div
                      onClick={() =>
                        navigate("/video", {
                          state: {
                            currentVideo: item,
                            videoList: contentDetail.contentFiles,
                          },
                        })
                      }
                      className="w-[120px] h-[160px] cursor-pointer rounded-md overflow-hidden flex-col transition-all duration-30"
                    >
                      <img
                        src={item.picture}
                        alt={item.id}
                        className="object-cover w-full h-full bg-center"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              {/* navigaiton BUTTONS */}
              {/* <div className="nextSlide swiper-button-white">
                <GrFormNext className="swiper-button-white" />
              </div>
              <div className="prevSlide swiper-button-white">
                <GrFormPrevious />
              </div> */}
            </Swiper>
          </div>
          {token && (
            <div
              className={`w-[165px] h-[220px] z-[4]  absolute right-5 bottom-5  rounded flex justify-center items-center flex-col gap-4 transition-all duration-200`}
            >
              <button
                onClick={() => showModal(contentDetail.id)}
                className="flex items-center gap-3 rounded px-4 py-2 bg-gradient-to-r from-bg-home to-slate-600 text-white text-lg transition-all duration-300 hover:from-bg-home hover:to-bg-home "
              >
                <p>حذف</p>
                <AiFillDelete />
              </button>

              <button
                onClick={() =>
                  navigate("/editarchive", {
                    state: contentDetail.id,
                  })
                }
                className="flex items-center gap-3 rounded px-4 py-2 bg-gradient-to-r from-bg-home to-slate-600 text-white text-lg transition-all duration-300 hover:from-bg-home hover:to-bg-home"
              >
                <p>ویرایش</p>
                <AiFillEdit />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ArchiveDetailPage;
