import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import DocumentMeta from "react-document-meta";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useToken, useTokenActions } from "../provider/EmailDataProvider";
import VideoJS from "../components/common/VideoJS";
import videojs from "video.js";
import axios from "axios";
import { PulseLoader } from "react-spinners";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function VideoPage() {
  const [currentVideo, setCurrentVideo] = useState("");
  const [videoList, setVideoList] = useState([]);

  const token = useToken();
  const { setNewToken } = useTokenActions();
  const location = useLocation();
  const navigate = useNavigate();
  const dataLocation = location.state;
  const auth = `Bearer ${token}`;
  const MySwal = withReactContent(Swal);

  const meta = {
    title: `${currentVideo && dataLocation.currentVideo.title}`,
    description: "صفحه آرشیو ویدیو سایت کاسیان مدیا ",
    canonical: "http://kasianmedia.com/video/",
    meta: {
      charset: "utf-8",
      name: {
        keywords:
          "آرشیو ویدیو,آرشیو ویدیوها,آرشیو ویدیوهای کاسیان, آرشیو ویدیوهای کاسیان مدیا",
      },
    },
  };

  useEffect(() => {
    const tokenData = JSON.parse(localStorage.getItem("formData"));
    if (tokenData) {
      setNewToken(tokenData);
    }
  }, [token]);

  useEffect(() => {
    setVideoList(dataLocation.videoList);
    sendContentFilePath(dataLocation.currentVideo.id);
  }, [currentVideo, videoList, dataLocation]);

  const showModal = (id) => {
    MySwal.fire({
      title: <p>آیا از حذف اطمینان دارید؟ </p>,
      color: "#F0932B",
      icon: "question",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSelectedContentFile(id)
        Swal.fire("فایل با موفقیت حذف شد", "", "success");
      }
    });
  };

  const deleteSelectedContentFile = (id) => {
    axios({
      headers: {
        Authorization: auth,
      },
      method: "DELETE",
      url: `/ContentFile/Delete?id=${id}`,
    })
      .then((res) => {
        console.log(res);
        navigate("/archives");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendContentFilePath = (id) => {
    // console.log(id);
    axios.get(`/ContentFile/FindById?id=${id}`).then((res) => {
      // console.log(res.data.path);
      setCurrentVideo(res.data.path);
    });
  };

  // const playerRef = useRef(null);

  // const videoJsOptions = {
  //   autoplay: true,
  //   controls: true,
  //   responsive: true,
  //   fluid: true,
  //   sources: [
  //     {
  //       src: "https://hajifirouz7.asset.aparat.com/aparat-video/fc8762ac6c1bc9a0c0576a4cc4f05c1745911924-1080p.mp4?wmsAuthSign=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjZjMGM2NDYzMGY4NmIzYjE0Zjg1N2I1ZjU0Yjc1YTQ2IiwiZXhwIjoxNjU2ODgwNjE1LCJpc3MiOiJTYWJhIElkZWEgR1NJRyJ9.av450LitnyZN76X6zZtAOxHERkD6QhG04eBzNwvFB-A",
  //       // type: "video/mp4",
  //     },
  //   ],
  // };

  return (
    <DocumentMeta {...meta}>
      <div className="w-full px-4 py-3 flex items-start gap-3">
        <div className="w-[30%] flex flex-col gap-3">
          {videoList &&
            videoList.map((item) => (
              <div
                className="w-full flex flex-col cursor-pointer relative"
                onClick={() => sendContentFilePath(item.id)}
                key={item.id}
              >
                <div
                  className="flex justify-end items-start gap-3 border border-border-color border-l-2 border-l-primary-color w-full px-2 py-2 rounded-lg"
                  key={item.id}
                >
                  <div className="h-[62px] w-full flex flex-col justify-between items-end">
                    <p className="text-[#CECFD3] text-sm">{item.title}</p>
                    <p className="text-[#767881] text-sm font-semibold flex flex-row-reverse gap-2 items-center">
                      <FaPlay className="rotate-180 text-primary-orange" />
                    </p>
                  </div>
                  <img
                    src={item.picture}
                    alt={item.title}
                    className="object-cover rounded-lg w-[74px] h-[62px]"
                  />
                </div>
                {token && (
                  <div
                    className={`w-[65px] h-[60px] absolute bottom-1 left-4 z-[4] rounded flex justify-center items-center  gap-4 transition-all duration-200`}
                  >
                    <button
                      onClick={() => showModal(item.id)}
                      className="flex items-center gap-3 rounded px-2 py-1 bg-gradient-to-r from-primary-color to-slate-500 text-white text-base transition-all duration-300 hover:from-primary-color hover:to-primary-color "
                    >
                      <AiFillDelete />
                    </button>

                    <button
                      onClick={() =>
                        navigate("/editcontentfile", {
                          state: {
                            id: item.id,
                          },
                        })
                      }
                      className="flex items-center gap-3 rounded px-2 py-1 bg-gradient-to-r from-primary-color to-slate-500 text-white text-base transition-all duration-300 hover:from-primary-color hover:to-primary-color"
                    >
                      <AiFillEdit />
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>

        {currentVideo && videoList && (
          <div className="w-[70%]">
            <video src={currentVideo} controls className="rounded" />
            {/* <VideoJS ref={playerRef} options={videoJsOptions} /> */}
          </div>
        )}
      </div>
    </DocumentMeta>
  );
}

export default VideoPage;
