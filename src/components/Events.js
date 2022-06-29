import { useEffect, useState } from "react";
import { httpGetAllEventsService } from "../services/httpGetAllEventsService";
import { Link } from "react-router-dom";
import AddButtonProduct from "./common/AddButtonProduct";
import { useToken } from "../provider/EmailDataProvider";

function Events() {
  const [eventList, setEventList] = useState([]);
  const token = useToken();

  useEffect(() => {
    getAllEvents();
  }, []);

  const getAllEvents = async () => {
    try {
      const { data } = await httpGetAllEventsService();
      setEventList(data.items);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      style={{ direction: "rtl" }}
      className="px-2 py-4 flex justify-start items-center flex-wrap gap-5 "
    >
      {eventList &&
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
