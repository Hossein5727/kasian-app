import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { httpGetAllPodcastService } from "../services/httpGetAllPodcastService";
import AddButtonProduct from "./common/AddButtonProduct";
import { FiMoreVertical } from "react-icons/fi";
import TimeLine from "./common/TimeLine";
import { useToken, useTokenActions } from "../provider/EmailDataProvider";
import { Button, Menu, MenuItem, Skeleton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import MostVisitedContent from "./MostVisitedContent";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoPlay } from "react-icons/io5";
import { FaMicrophoneAlt } from "react-icons/fa";
import { scrollToBottom } from "../utils/scrollToBottom";
import { getToken } from "../utils/getToken";

function PodcastList({ isShowNav, categoryId }) {
  const [podcastList, setPodcastList] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [musicSrc, setMusicSrc] = useState(null);
  const [isPlay, setIsPlay] = useState(false);
  const [isLoadingPodcast, setIsLoadingPodcast] = useState(false);
  const open = Boolean(anchorEl);

  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const audioRef = useRef();
  const token = useToken();
  const { setNewToken } = useTokenActions();
  const auth = `Bearer ${token}`;

  useEffect(() => {
    getAllPodcastList();
  }, [categoryId]);

  useEffect(() => {
    getToken(setNewToken, token);
  }, [token]);

  const getAllPodcastList = async () => {
    setIsLoadingPodcast(true);
    try {
      const { data } = await httpGetAllPodcastService(categoryId);
      console.log(data);
      setPodcastList(data);
      setIsLoadingPodcast(false);
    } catch (error) {
      console.log(error.message);
      setIsLoadingPodcast(false);
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
      url: `/Content/Delete?id=${id}`,
    })
      .then((res) => {
        navigate("/podcasts");
      })
      .catch((err) => {});
  };

  return (
    <div
      className="w-full p-5 flex gap-12 flex-col relative"
      style={{ direction: "rtl" }}
    >
      <div className="w-full">
        {/* <Outlet
          context={{
            src: musicSrc,
            changeSrc: setMusicSrc,
            changeIsPlay: setIsPlay,
            isPlay: isPlay,
          }}
        /> */}
        <MostVisitedContent
          setMusicSrc={setMusicSrc}
          changeIsPlay={setIsPlay}
        />
      </div>

      <audio src={musicSrc} ref={audioRef} />

      <div className="w-full flex justify-start items-center gap-5 flex-wrap pb-24">
        <Swiper slidesPerView={"5"} style={{ width: "100%" }} spaceBetween={35}>
          {podcastList &&
            podcastList.length > 0 &&
            podcastList.map((item) => (
              <SwiperSlide key={item.id}>
                <NavLink
                  to={`/podcasts/podcastdetail/${item.id}`}
                  className={({ isActive }) =>
                    `slidePodcast transition-colors duration-100 ${
                      isActive ? "activeSlidePodcast" : "bg-[#212432]"
                    } `
                  }
                  onClick={scrollToBottom}
                >
                  <figure className="relative">
                    <img
                      src={item.picture}
                      alt={item.title}
                      className="rounded-lg h-[200px] object-fill"
                    />
                    <button className="absolute -bottom-4 z-[2] left-2 p-3 rounded-full flex justify-center items-center bg-[#212432] bg-opacity-70">
                      <FaMicrophoneAlt className="text-[#dcdcdf] text-xl microphoneBtn" />
                    </button>
                  </figure>

                  <p className="text-[#DCDCDF] text-opacity-75 text-[13px] mt-2">
                    {item.category.title}
                  </p>

                  <h3 className="text-white mb-1 line-clamp-2 max-w-[100%]">
                    {item.title}
                  </h3>
                </NavLink>
              </SwiperSlide>
            ))}
        </Swiper>

        {isLoadingPodcast && (
          <div className="flex items-center gap-3 flex-wrap">
            {Array.apply(null, { length: 3 }).map((item, index) => (
              <Skeleton
                variant="rectangular"
                width={350}
                height={100}
                animation="wave"
                sx={{ bgcolor: "#3f4252", borderRadius: "6px" }}
                key={index}
              />
            ))}
          </div>
        )}

        {token && (
          <AddButtonProduct
            toolTipTitle={"اضافه کردن پادکست"}
            productAddress="addpodcast"
          />
        )}
      </div>

      <Outlet />

      {musicSrc && (
        <TimeLine
          audioRef={audioRef}
          isPlay={isPlay}
          setIsPlay={setIsPlay}
          musicSrc={musicSrc}
        />
      )}
    </div>
  );
}

export default PodcastList;

// {token && (
//   <div className="flex flex-col gap-3 text-sm">
//     <button
//       onClick={() =>
//         navigate("/editpodcast", {
//           state: { audioId: item.id },
//         })
//       }
//     >
//       ویرایش
//     </button>
//     <button onClick={() => showModal(item.id)}>حذف</button>
//   </div>
// )}
