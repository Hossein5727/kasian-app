import { useEffect, useState } from "react";
import { httpGetAllContentService } from "../services/httpGetAllContentService";
import FilterProducts from "./FilterProducts";
import { NavLink, Outlet } from "react-router-dom";
import { scrollToBottom } from "../utils/scrollToBottom";
import AddButtonProduct from "./common/AddButtonProduct";
import { useToken } from "../provider/EmailDataProvider";
import Pagination from "./common/Pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Skeleton } from "@mui/material";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

function ArchiveFilm(props) {
  const [contentList, setContentList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoadedThumnail, setIsLoadedThumnail] = useState(true);
  const [categoryId, setCategoryId] = useState(undefined);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const token = useToken();

  useEffect(() => {
    getAllCntentList();
  }, [categoryId]);

  const getAllCntentList = async () => {
    setIsLoadedThumnail(false);
    try {
      const { data } = await httpGetAllContentService(categoryId);
      setContentList(data);
      setIsLoadedThumnail(true);
      // console.log(data.items);
    } catch (error) {
      setIsLoadedThumnail(true);
      console.log(error.message);
    }
  };

  return (
    <div className="w-full " style={{ direction: "rtl" }}>
      <FilterProducts
        addressCategory={"/Category/GetAllContentVideoCategory"}
        setCategoryId={setCategoryId}
        categoryId={categoryId}
      />
      <div className="px-4 py-2 text-primary-color text-2xl my-1 mt-2 flex justify-center w-full bg-[#1c202f9a]">
        <h3> فیلم و سریال</h3>
      </div>

      <div className="flex justify-center items-center gap-5 px-4 py-2 overflow-x-hidden">
        <Swiper slidesPerView={"auto"} spaceBetween={36}>
          {contentList &&
            isLoadedThumnail &&
            contentList.length > 0 &&
            contentList.map((item) => (
              <SwiperSlide
                className={
                  props.selected ? "sliderArchiveActive" : "sliderArchive"
                }
                onClick={() => setIsOpenDialog(!isOpenDialog)}
                key={item.id}
              >
                <NavLink
                  to={`/archives/archivedetail/${item.id}`}
                  key={item.id}
                  className=" w-[165px]  h-[220px] rounded-md overflow-hidden flex justify-center items-center z-[4]  "
                  style={({ isActive }) =>
                    isActive
                      ? { border: "3px solid #F0932B", transform: "scale(1)" }
                      : {
                          border: "2px solid transparent",
                          transform: "scale(1)",
                        }
                  }
                >
                  <div className="w-full h-full " onClick={scrollToBottom}>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-[165px] h-[220px]  object-cover transition-all duration-150 scale-100 hover:scale-105"
                    />
                  </div>
                </NavLink>
              </SwiperSlide>
            ))}
          {token && contentList && (
            <SwiperSlide style={{ width: "90px", paddingTop: "80px" }}>
              <AddButtonProduct
                toolTipTitle={"اضافه کردن فیلم"}
                productAddress="addarchive"
              />
            </SwiperSlide>
          )}
          {!isLoadedThumnail && (
            <div className="flex items-center gap-3">
              {Array.apply(null, { length: 6 }).map((item, index) => (
                <Skeleton
                  variant="rectangular"
                  width={165}
                  height={220}
                  animation="wave"
                  sx={{ bgcolor: "#3f4252", borderRadius: "6px" }}
                  key={index}
                />
              ))}
            </div>
          )}
        </Swiper>
      </div>
      <Outlet />
    </div>
  );
}

export default ArchiveFilm;
