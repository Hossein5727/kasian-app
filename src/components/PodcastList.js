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
  }, []);

  useEffect(() => {
    const tokenData = JSON.parse(sessionStorage.getItem("formData"));
    if (tokenData) {
      setNewToken(tokenData);
    }
  }, [token]);

  const getAllPodcastList = async () => {
    setIsLoadingPodcast(true);
    try {
      const { data } = await httpGetAllPodcastService(categoryId);
      // console.log(data);
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
      <div className="w-full h-[360px] bgSound rounded-lg">
        <Outlet
          context={{
            src: musicSrc,
            changeSrc: setMusicSrc,
            changeIsPlay: setIsPlay,
            isPlay: isPlay,
          }}
        />
      </div>

      <audio src={musicSrc} ref={audioRef} />

      <div className="w-full flex justify-start items-center gap-5 flex-wrap pb-24">
        {podcastList &&
          !isLoadingPodcast &&
          podcastList.map((item) => (
            <div className="w-[32%] bg-[#1c1f2e] bg-opacity-60 p-[10px] rounded text-[#DCDCDF] flex justify-between items-center ">
              <NavLink
                to={`/podcasts/podcastdetail/${item.id}`}
                key={item.id}
                className="w-full flex justify-start items-center "
              >
                <img
                  src={item.picture}
                  alt={item.title}
                  className="w-[76px] h-[68px] rounded-md"
                />

                <div className="h-full flex flex-col gap-3 mr-6">
                  <h3>{item.title}</h3>
                  <p className="text-[#75797C] text-xs">{item.description}</p>
                </div>
              </NavLink>
              {token && (
                <div className="flex flex-col gap-3 text-sm">
                  <button
                    onClick={() =>
                      navigate("/editpodcast", {
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
