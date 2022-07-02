import { useEffect, useState } from "react";
import { httpGetAllEventsService } from "../services/httpGetAllEventsService";
import { Link } from "react-router-dom";
import AddButtonProduct from "./common/AddButtonProduct";
import { useToken } from "../provider/EmailDataProvider";
import { Skeleton } from "@mui/material";

function Events() {
  const [eventList, setEventList] = useState([]);
  const [isLoadedEvent, setIsLoadedEvent] = useState(true);
  const token = useToken();

  useEffect(() => {
    getAllEvents();
  }, []);

  const getAllEvents = async () => {
    setIsLoadedEvent(false);
    try {
      const { data } = await httpGetAllEventsService();
      setEventList(data.items);
      setIsLoadedEvent(true);
    } catch (error) {
      console.log(error.message);
      setIsLoadedEvent(true);
    }
  };

  return (
    <div
      style={{ direction: "rtl" }}
      className="px-2 py-4 flex justify-start items-center flex-wrap gap-5 "
    >
      {eventList &&
        isLoadedEvent &&
        eventList.length &&
        eventList.map((item) => (
          <Link
            to={`/eventdetail/${item.id}`}
            key={item.id}
            className="rounded-md relative flex flex-col items-center justify-center w-[232px] h-[203px] overflow-hidden transition-all duration-200 hover:translate-y-1 "
          >
            <img
              src={item.picture}
              alt={item.title}
              className="w-full h-full object-fill "
            />
            <div className="w-full z-[4] bg-white absolute left-0 bottom-0 text-center py-3  bg-opacity-60 text-sm textShadow">
              <p className="z-[2]">{item.title}</p>
            </div>
          </Link>
        ))}
      {!isLoadedEvent && (
        <div className="flex items-center gap-3 flex-wrap">
          {Array.apply(null, { length: 9 }).map((item, index) => (
            <Skeleton
              variant="rectangular"
              width={232}
              height={203}
              animation="wave"
              sx={{ bgcolor: "#3f4252", borderRadius: "6px" }}
              key={index}
            />
          ))}
        </div>
      )}
      {token && (
        <AddButtonProduct
          productAddress="addevent"
          toolTipTitle={"اضافه کردن رویداد"}
        />
      )}
    </div>
  );
}

export default Events;
