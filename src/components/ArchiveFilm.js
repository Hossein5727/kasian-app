import { useEffect, useState } from "react";
import { httpGetAllContentService } from "../services/httpGetAllContentService";
import FilterProducts from "./FilterProducts";
import { NavLink, Outlet } from "react-router-dom";
import { scrollToBottom } from "../utils/scrollToBottom";
import AddButtonProduct from "./common/AddButtonProduct";
import { useToken } from "../provider/EmailDataProvider";
import Pagination from "./common/Pagination";

function ArchiveFilm() {
  const [contentList, setContentList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const token = useToken();

  useEffect(() => {
    getAllCntentList();
  }, [contentList, pageNumber]);

  const getAllCntentList = async () => {
    try {
      const { data } = await httpGetAllContentService(pageNumber);
      setContentList(data.items);
      // console.log(data.items);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full " style={{ direction: "rtl" }}>
      <FilterProducts />
      <div className="px-4 py-2 text-primary-color text-2xl my-1 mt-2 flex justify-center w-full bg-[#1c202f9a]">
        <h3> لیست فیلم ها</h3>
      </div>

      <div className="flex justify-center items-center gap-5 px-4 py-2 flex-wrap">
        {contentList &&
          contentList.length > 0 &&
          contentList.map((item) => (
            <NavLink
              to={`/archives/archivedetail/${item.id}`}
              key={item.id}
              className="rounded-md w-[165px] transition-all duration-200 overflow-hidden hover:shadow hover:shadow-gray-400 hover:translate-y-1"
              style={({ isActive }) =>
                isActive
                  ? { border: "2px solid #F0932B", transform: "scale(1)" }
                  : { border: "2px solid transparent", transform: "scale(0.9)" }
              }
            >
              <div className="w-full " onClick={scrollToBottom}>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-[165px] h-[220px] object-cover"
                />
              </div>
            </NavLink>
          ))}
        <br />
        {token && (
          <AddButtonProduct
            toolTipTitle={"اضافه کردن فیلم"}
            productAddress="addarchive"
          />
        )}
      </div>
      {contentList.length > 0 && (
        <div className="w-full mt-4 flex justify-center items-center px-4 py-4">
          <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} />
        </div>
      )}

      <Outlet />
    </div>
  );
}

export default ArchiveFilm;
