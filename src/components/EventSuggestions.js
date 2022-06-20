import React, { useEffect, useState } from "react";
import { httpGetAllEventsService } from "../services/httpGetAllEventsService";
import { Link } from "react-router-dom";

function EventSuggestions() {
  const [eventList, setEventList] = useState([]);

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
      className="px-2 py-1 flex flex-col gap-3 sticky w-full h-[100vh] overflow-y-scroll eventSuggestions "
    >
      <p className="text-[#686C70]">پس از این بخوانید ...</p>
      {eventList &&
        eventList.length &&
        eventList.map((item) => (
          <Link
            to={`/eventdetail/${item.id}`}
            key={item.id}
            className="rounded-md bg-[#151724] border border-border-color flex items-center justify-start gap-3 w-full px-2 py-2 "
          >
            <img
              src={item.picture}
              alt={item.title}
              className="w-[85px] h-[65px] object-fill rounded-md border-4 border-[#242736] "
            />
            <div className="text-sm text-[#C4C4C8] h-full  flex flex-col gap-7">
              <p className="z-[2]">{item.title}</p>
              <p className="text-xs text-[#8A8B92]">وقایع و رویدادها</p>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default EventSuggestions;
