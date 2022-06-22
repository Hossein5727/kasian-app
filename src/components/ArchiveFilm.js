import { useEffect, useState } from "react";
import { httpGetAllContent } from "../services/httpGetAllContent";
import FilterProducts from "./FilterProducts";
import { NavLink, Routes, Route, Outlet } from "react-router-dom";
import ArchiveDetailPage from "../page/ArchiveDetailPage";

function ArchiveFilm() {
  const [contentList, setContentList] = useState([]);

  useEffect(() => {
    getAllCntentList();
  }, []);

  const getAllCntentList = async () => {
    try {
      const { data } = await httpGetAllContent();
      setContentList(data.items);
      console.log(data.items);
    } catch (error) {
      console.log(error.message);
    }
  };

  const scrollToBottom = () => {
    window.scrollTo(0, 500);
  };

  return (
    <div className="w-full " style={{ direction: "rtl" }}>
      <FilterProducts />

      <div className="flex justify-start items-center gap-4 px-4 py-2">
        {contentList &&
          contentList.length > 0 &&
          contentList.map((item) => (
            <NavLink
              to={`/archives/archivedetail/${item.id}`}
              key={item.id}
              className="  rounded-md w-[280px] transition-all duration-200 overflow-hidden hover:shadow hover:shadow-gray-400 hover:translate-y-1"
              style={({ isActive }) =>
                isActive
                  ? { border: "2px solid #F0932B" }
                  : { border: "2px solid transparent" }
              }
            >
              <div className="w-full " onClick={scrollToBottom}>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </NavLink>
          ))}
      </div>

      <Outlet />
    </div>
  );
}

export default ArchiveFilm;
