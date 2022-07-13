import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { httpGetAllPodcastService } from "../services/httpGetAllPodcastService";
import AddButtonProduct from "./common/AddButtonProduct";
import { FiMoreVertical } from "react-icons/fi";
import TimeLine from "./common/TimeLine";
import { useToken, useTokenActions } from "../provider/EmailDataProvider";
import { Button, Menu, MenuItem } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

function PodcastList({ isShowNav }) {
  const [podcastList, setPodcastList] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [musicSrc, setMusicSrc] = useState(null);
  const [isPlay, setIsPlay] = useState(false);
  const open = Boolean(anchorEl);

  const audioRef = useRef();
  const token = useToken();
  const { setNewToken } = useTokenActions();

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
    try {
      const { data } = await httpGetAllPodcastService();
      console.log(data);
      setPodcastList(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      className="w-full p-5 flex gap-12 flex-col relative"
      style={{ direction: "rtl" }}
    >
      <div className="w-full h-[300px] bgSound rounded-lg">
        <Outlet
          context={{
            src: musicSrc,
            changeSrc: setMusicSrc,
            changeIsPlay: setIsPlay,
          }}
        />
      </div>

      <audio src={musicSrc} ref={audioRef} />

      <div className="w-full flex justify-start items-center gap-5 flex-wrap pb-24">
        {podcastList.map((item, index) => (
          <div className="w-[32%] bg-[#1c1f2e] bg-opacity-60 p-[10px] rounded text-[#DCDCDF] flex justify-between items-center ">
            <NavLink
              to={`/podcasts/podcastdetail/${item.id}`}
              key={index}
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
              <>
                <button
                  className="text-[#5F616C] text-2xl opacity-90"
                  onClick={handleClick}
                >
                  <FiMoreVertical />
                </button>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  style={{ transform: "translateX(20px) !important" }}
                >
                  <MenuItem style={{ padding: "0" }} onClick={handleClose}>
                    <Button
                      className="buttonFontIranMateraiUI"
                      startIcon={<Edit color="warning" />}
                    >
                      ویرایش
                    </Button>
                  </MenuItem>
                  <MenuItem style={{ padding: "0" }} onClick={handleClose}>
                    <Button
                      className="buttonFontIranMateraiUI"
                      startIcon={<Delete color="error" />}
                    >
                      حذف
                    </Button>
                  </MenuItem>
                </Menu>
              </>
            )}
          </div>
        ))}

        {token && (
          <AddButtonProduct
            toolTipTitle={"اضافه کردن پادکست"}
            productAddress="addpodcast"
          />
        )}
      </div>

      {musicSrc && (
        <TimeLine audioRef={audioRef} isPlay={isPlay} setIsPlay={setIsPlay} />
      )}
    </div>
  );
}

export default PodcastList;
