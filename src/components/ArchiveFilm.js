import { useEffect, useState } from "react";
import { httpGetAllContentService } from "../services/httpGetAllContentService";
import FilterProducts from "./FilterProducts";
import { NavLink, Outlet } from "react-router-dom";
import { scrollToBottom } from "../utils/scrollToBottom";
import AddButtonProduct from "./common/AddButtonProduct";
import { useToken } from "../provider/EmailDataProvider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Skeleton } from "@mui/material";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import "swiper/css/pagination";
import { Pagination } from "swiper";

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
      // console.log(data);
      setContentList(data);
      setIsLoadedThumnail(true);
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
        <h3>ویدیوها</h3>
      </div>

      <div className="w-full flex justify-start items-center overflow-x-hidden px-6 py-3">
        <Swiper
          modules={[Pagination]}
          pagination={{
            dynamicBullets: true,
          }}
          slidesPerView={7}
          spaceBetween={36}
          style={{
            width: "100%",
          }}
        >
          {contentList &&
            isLoadedThumnail &&
            contentList.length > 0 &&
            contentList.map((item) => (
              <SwiperSlide key={item.id} onClick={scrollToBottom}>
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
                  <div className="w-full h-full ">
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
        </Swiper>
        {!isLoadedThumnail && (
          <div className="w-full flex  justify-start gap-3 absolute right-[112px] top-[200px]">
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
      </div>
      <Outlet />
    </div>
  );
}

export default ArchiveFilm;
