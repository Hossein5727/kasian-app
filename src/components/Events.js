import { useEffect, useState } from "react";
import { httpGetAllEventsService } from "../services/httpGetAllEventsService";
import { Link, useNavigate } from "react-router-dom";
import AddButtonProduct from "./common/AddButtonProduct";
import { useToken, useTokenActions } from "../provider/EmailDataProvider";
import { Skeleton } from "@mui/material";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import axios from "axios";

function Events({ categoryId }) {
  const [eventList, setEventList] = useState([]);
  const [isLoadedEvent, setIsLoadedEvent] = useState(true);
  const navigate = useNavigate();
  const token = useToken();
  const auth = `Bearer ${token}`;
  const MySwal = withReactContent(Swal);
  const { setNewToken } = useTokenActions();

  useEffect(() => {
    getAllEvents();
  }, [categoryId]);

  useEffect(() => {
    const tokenData = JSON.parse(sessionStorage.getItem("formData"));
    if (tokenData) {
      setNewToken(tokenData);
    }
  }, []);

  const getAllEvents = async () => {
    setIsLoadedEvent(false);
    try {
      const { data } = await httpGetAllEventsService(categoryId);
      setEventList(data.items);
      setIsLoadedEvent(true);
    } catch (error) {
      console.log(error.message);
      setIsLoadedEvent(true);
    }
  };

  const showModal = (id) => {
    MySwal.fire({
      title: <p>آیا از حذف اطمینان دارید؟ </p>,
      color: "#F0932B",
      icon: "question",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSelectedContentFile(id);
      }
    });
  };

  const deleteSelectedContentFile = (id) => {
    axios({
      headers: {
        Authorization: auth,
      },
      method: "DELETE",
      url: `/Event/Delete?id=${id}`,
    })
      .then((res) => {
        console.log(res);
        MySwal.fire({
          title: <p>فایل با موفقیت حذف شد </p>,
          color: "#F0932B",
          icon: "success",
        }).then(() => {
          window.location.reload();
          navigate("/events");
        });
      })
      .catch((err) => {
        console.log(err);
        MySwal.fire({
          title: <p>خطا در فرایند حذف </p>,
          color: "#F0932B",
          icon: "error",
        });
      });
  };

  return (
    <div
      style={{ direction: "rtl" }}
      className="px-2 py-4 flex justify-start items-center flex-wrap gap-5 "
    >
      {eventList &&
        isLoadedEvent &&
        eventList.length > 0 &&
        eventList.map((item) => (
          <div
            key={item.id}
            className="rounded-md relative flex flex-col items-center justify-center w-[232px] h-[203px] overflow-hidden transition-all duration-200 hover:translate-y-1 "
          >
            <Link to={`/eventdetail/${item.id}`} className="w-full h-full">
              <img
                src={item.picture}
                alt={item.title}
                className="w-full h-full object-fill "
              />
            </Link>
            <div className="w-full z-[4] bg-white absolute left-0 bottom-0 text-center py-3  bg-opacity-60 text-sm textShadow flex flex-col justify-center items-center">
              <p className="z-[2] line-clamp-1 px-2">{item.title}</p>
              {token && (
                <div
                  className={`w-full h-[20px] mt-2  bottom-1 left-4 z-[4] rounded flex justify-center items-center  gap-4 transition-all duration-200`}
                >
                  <button
                    onClick={() => showModal(item.id)}
                    className="flex items-center gap-3 rounded px-2 py-1 bg-gradient-to-r from-primary-color to-slate-500 text-white text-base transition-all duration-300 hover:from-primary-color hover:to-primary-color "
                  >
                    <AiFillDelete />
                  </button>

                  <button
                    onClick={() =>
                      navigate("/editevent", {
                        state: {
                          id: item.id,
                        },
                      })
                    }
                    className="flex items-center gap-3 rounded px-2 py-1 bg-gradient-to-r from-primary-color to-slate-500 text-white text-base transition-all duration-300 hover:from-primary-color hover:to-primary-color"
                  >
                    <AiFillEdit />
                  </button>
                </div>
              )}
            </div>
          </div>
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
