import { useEffect, useState } from "react";
import { httpGetOneEventService } from "../services/httpGetOneEventService";
import { useParams } from "react-router-dom";

function EventDetail() {
  const [eventDetail, setEventDetail] = useState([]);
  const params = useParams();
  const paramsId = params.id;

  useEffect(() => {
    getEventDetail();
    // console.log(eventDetail);
  }, [eventDetail, params]);

  const getEventDetail = async () => {
    try {
      const { data } = await httpGetOneEventService(paramsId);
      setEventDetail(data);
      //   console.log(eventDetail);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="w-full">
      {eventDetail && (
        <div className="flex flex-col justify-center items-center gap-4 text-[#757875]">
          <div className="w-full px-3 py-4 flex flex-col justify-center items-center gap-4 rounded-md border border-border-color bg-[#1C1F2E]">
            <p className="text-sm">وقایع و رویدادها</p>
            <div className="w-14 h-[3px] rounded-lg bg-border-color "></div>
            <h2 className="text-xl text-primary-color">{eventDetail.title}</h2>
          </div>

          <div className="w-full block relative imgEventDetail  rounded-md border border-border-color bg-[#1C1F2E] overflow-hidden ">
            <img
              src={eventDetail.picture}
              className=" w-full object-fill  "
              alt={eventDetail.title}
            />
          </div>

          <div className="w-full px-3 py-4 flex flex-col justify-center items-end gap-4 rounded-md border border-border-color bg-[#1C1F2E]">
            <h2 className="text-base text-primary-color">توضیحات این رویداد</h2>
            <p
              style={{ direction: "rtl" }}
              className="text-sm text-[#DCD3CF] font-extralight leading-7"
            >
              {eventDetail.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventDetail;
