import { useEffect, useState } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import { httpGetOneAudioService } from "../services/httpGetOneAudioService";
import { Button, Menu, MenuItem, Skeleton } from "@mui/material";
import playIcon from "../assests/img/play-button.svg";
import { TbArrowBigUpLines } from "react-icons/tb";
import { FiMoreVertical } from "react-icons/fi";
import { useToken, useTokenActions } from "../provider/EmailDataProvider";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";

function PodcastDetailPage() {
  const [audioData, setAudioData] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const params = useParams();
  const paramsId = params.id;
  const dataOutlet = useOutletContext();
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const token = useToken();
  const { setNewToken } = useTokenActions();
  const auth = `Bearer ${token}`;
  // console.log(dataOutlet);

  useEffect(() => {
    // console.log(paramsId);
    getOneAudio();
  }, [paramsId]);

  useEffect(() => {
    const tokenData = JSON.parse(sessionStorage.getItem("formData"));
    if (tokenData) {
      setNewToken(tokenData);
    }
  }, [token]);

  const getOneAudio = async () => {
    try {
      const { data } = await httpGetOneAudioService(paramsId);
      console.log(data);
      setAudioData(data);
    } catch (error) {}
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
    // console.log(id);
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

    if (audioData) {
      value = (
        <div className="w-full h-full z-[3] relative flex  px-[50px] pt-5 justify-start items-center gap-5">
          <div className="w-[270px] h-[240px] relative">
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
            className="relative border border-[#2E313E] h-60 w-[460px] mr-24 mt-10 flex flex-col justify-start items-center rounded-lg   "
          >
            <h3 className="w-full px-12 whitespace-nowrap  text-center text-base py-2 bg-[#DCDCDF] text-[#2D3436] rounded-tr-lg rounded-tl-lg">
              قسمت های این پادکست
            </h3>
            <div
              style={{ background: "rgba(95, 97, 108, 0.08)" }}
              className="w-[91%] flex flex-col gap-3 mt-4 mb-3 text-sm overflow-y-scroll podcastFiles "
            >
              {audioData.contentFiles.map((item) => (
                <div
                  key={item.id}
                  className="w-full py-1 flex  items-center gap-3 px-3 rounded-md border border-[#3B4151] text-white cursor-pointer transition-all duration-150 focus:border-l-2 focus:border-l-primary-color"
                >
                  <img
                    src={item.picture}
                    alt={item.title}
                    className="w-10 h-10 rounded-lg object-cover"
                    onClick={() => {
                      dataOutlet.changeSrc(item.path);
                      dataOutlet.isPlay == false &&
                        dataOutlet.changeIsPlay(true);
                    }}
                  />
                  <p className="w-full whitespace-nowrap">{item.title}</p>

                  <button className="bg-primary-color p-[4px] rounded-full mr-6 ml-3 ">
                    <img src={playIcon} className="w-[16px] " alt={playIcon} />
                  </button>

                  {token && (
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() =>
                          navigate("/editpodcastfile", {
                            state: { audioId: item.id },
                          })
                        }
                      >
                        ویرایش
                      </button>
                      <button onClick={() => showModal(item.id)}>حذف</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="bg-[#191b28d2] rounded-full py-2 px-4 absolute bottom-2 animate-bounce">
              <TbArrowBigUpLines className="rotate-180 text-[#dcdcdf] text-2xl" />
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
