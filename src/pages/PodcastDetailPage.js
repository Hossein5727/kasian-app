import { useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { useToken, useTokenActions } from "../provider/EmailDataProvider";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Edit, Delete, ArrowLeft } from "@mui/icons-material";
import axios from "axios";
import useSWR from "swr";
import { getToken } from "../utils/getToken";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import LoadingDetail from "../components/LoadingDetail";

function PodcastDetailPage() {
  const params = useParams();
  const paramsId = params.id;
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const token = useToken();
  const { setNewToken } = useTokenActions();
  const auth = `Bearer ${token}`;
  const { data } = useSWR(`/Content/FindById?id=${paramsId}`);

  useEffect(() => {
    getToken(setNewToken, token);
  }, [token]);

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
          navigate("/podcasts");
        });
      }
    });
  };

  const deleteContent = (id) => {
    axios({
      headers: {
        Authorization: auth,
      },
      method: "DELETE",
      url: `/ContentFile/Delete?id=${id}`,
    })
      .then((res) => {
        navigate("/podcasts");
      })
      .catch((err) => {});
  };

  const renderUi = () => {
    let value = "";

    if (data) {
      value = (
        <div className="w-full h-[380px] overflow-hidden -mt-28 animate__animated animate__fadeIn z-[3] relative flex  px-[50px] pt-1 justify-start items-center gap-5 podcastDetailBg">
          <img
            src={data.picture}
            alt={data.title}
            className="w-full h-full object-fill absolute left-0 top-0 "
          />
          <h2 className="font-semibold  text-3xl absolute top-4 right-8 z-[4] text-white">
            {data.title}
          </h2>

          <div className="h-[2px] w-[525px] absolute top-16 right-6 line-sparator"></div>

          <div className="text-gray-300 text-xs absolute top-20 right-9 z-[4]  leading-5  textOverFlow flex items-center gap-2">
            <p>{data.description}</p>
          </div>

          <div className="absolute left-4 top-4 w-[52%]  py-5 px-7 h-[250px] bg-transparent  flex flex-col items-start justify-center gap-3 z-[3]">
            <div className="w-full px-2 flex justify-between items-center">
              <h3 className="text-[#F6BE80] text-[17px] leading-8">
                اپیزودهای این پادکست:
              </h3>

              <button
                onClick={() =>
                  navigate("/podcastlist", {
                    state: {
                      currentAudio: null,
                      audioList: data.contentFiles,
                      podcastDetail: data,
                    },
                  })
                }
                className="text-[#75797C]"
              >
                مشاهده همه <ArrowLeft />{" "}
              </button>
            </div>
            <Swiper
              navigation={{
                enabled: true,
              }}
              pagination={{
                enabled: true,
                clickable: true,
              }}
              modules={[Navigation, Pagination]}
              slidesPerView={4}
              style={{ width: "100%", position: "relative" }}
            >
              {data &&
                data.contentFiles.map((item) => (
                  <SwiperSlide
                    style={{ marginLeft: "22px", cursor: "pointer" }}
                    key={item.id}
                  >
                    <div
                      onClick={() =>
                        navigate("/podcastlist", {
                          state: {
                            currentAudio: item,
                            audioList: data.contentFiles,
                            podcastDetail: data,
                          },
                        })
                      }
                      className="w-[110px] h-[140px] cursor-pointer rounded-md overflow-hidden flex-col transition-all duration-30"
                    >
                      <img
                        src={item.picture}
                        alt={item.id}
                        className="object-cover w-full h-full bg-center"
                      />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      );
    } else if (!data) {
      value = <LoadingDetail />;
    }

    return value;
  };

  return <div>{renderUi()}</div>;
}

export default PodcastDetailPage;
