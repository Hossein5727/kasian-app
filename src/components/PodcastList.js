import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { httpGetAllCategoryPodcastService } from "../services/httpGetAllCategoryPodcastService";
import { httpGetAllPodcastService } from "../services/httpGetAllPodcastService";
import { scrollToBottom } from "../utils/scrollToBottom";
import FilterProducts from "./FilterProducts";

function PodcastList() {
  const [podcastList, setPodcastList] = useState([]);

  useEffect(() => {
    getAllPodcastList();
  }, []);

  const getAllPodcastList = async () => {
    try {
      const { data } = await httpGetAllPodcastService();
      setPodcastList(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full" style={{ direction: "rtl" }}>
      <FilterProducts
        addressCategory={"/Category/GetAllContentSoundCategory"}
      />

      <div className="px-4 py-2 text-primary-color text-2xl my-1 mt-2 flex justify-center w-full bg-[#1c202f9a]">
        <h3> لیست پادکست ها</h3>
      </div>

      <div className="flex justify-start items-center gap-4 px-4 py-2">
        {podcastList &&
          podcastList.length > 0 &&
          podcastList.map((item) => (
            <NavLink
              to={`/podcasts/podcastdetail /${item.id}`}
              key={item.id}
              className="rounded-md w-[240px] transition-all duration-200 overflow-hidden hover:shadow hover:shadow-gray-400 hover:translate-y-1"
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

export default PodcastList;
