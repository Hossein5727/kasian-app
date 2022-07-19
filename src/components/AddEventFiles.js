import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { AiFillFile, AiOutlinePicture } from "react-icons/ai";
import { BsFillChatTextFill } from "react-icons/bs";
import { MdAddBox } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useToken } from "../provider/EmailDataProvider";
import FileUploaded from "./common/FileUploaded";
import Input from "./common/Input";

const initialValues = { contentPath: "" };

function AddEventFiles({ idExtra }) {
  const [eventFilesData, setEventFilesData] = useState({
    contentTitle: "",
    contentPicture: "",
    contentFile: "",
    contentId: idExtra,
  });

  const [isLoadingSendingData, setIsLoadingSendingData] = useState(false);
  const [progressLoadingText, setProgressLoadingText] = useState(null);

  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);

  const token = useToken();

  const formData = new FormData();

  const auth = `Bearer ${token}`;

  const submitHandler = (values) => {
    formData.append("contentTitle", eventFilesData.contentTitle);
    formData.append("contentId", idExtra);
    // formData.append("contentPicture", eventFilesData.contentPicture);
    formData.append("contentFile", eventFilesData.contentFile);
    formData.append("contentPath", eventFilesData.contentPath);

    setIsLoadingSendingData(true);

    axios({
      method: "POST",
      url: "/EventFile/Create",
      headers: {
        Authorization: auth,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
      onUploadProgress: (progressEvent) => {
        setProgressLoadingText(
          Math.round((progressEvent.loaded / progressEvent.total) * 100) + "%"
        );
      },
    })
      .then((res) => {
        setIsLoadingSendingData(false);
        console.log(res.data);
        MySwal.fire({
          title: <p>فایل شما با موفقیت ثبت شد</p>,
          color: "#F0932B",
          icon: "success",
        }).then(() => {
          navigate("/");
        });
        setEventFilesData("");
      })
      .catch(() => {
        setIsLoadingSendingData(false);
      });
  };

  const formik = useFormik({
    initialValues,
    onSubmit: submitHandler,
    validateOnMount: true,
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full flex flex-col gap-5 justify-center items-center"
    >
      <h3 className="text-slate-200 text-lg text-right">
        فایل های رویداد را وارد کنید
      </h3>

      <div className="flex flex-col gap-2 relative">
        <input
          value={eventFilesData.titleEvent}
          name={"titleEvent"}
          id={"titleEvent"}
          onChange={(e) =>
            setEventFilesData({
              ...eventFilesData,
              contentTitle: e.target.value,
            })
          }
          placeholder={"عنوان"}
          className={`bg-slate-200  px-4 py-3 rounded text-lg text-bg-home w-[320px] outline-none transition-all duration-200 hover:bg-bg-home hover:text-slate-200 hover:placeholder:text-slate-200  placeholder:text-bg-home`}
          onBlur={formik.handleBlur}
        />
        <div className="absolute -right-[28px] top-0 text-2xl text-bg-home bg-slate-200 h-[52px] border-l border-l-bg-home px-1 rounded-tr rounded-br flex justify-center items-center">
          <BsFillChatTextFill />
        </div>
      </div>

      <Input />

      <FileUploaded
        icon={<AiFillFile />}
        label="عکس"
        name={"contentFile"}
        type="file"
        handleChange={(e) =>
          setEventFilesData({
            ...eventFilesData,
            contentFile: e.target.files[0],
          })
        }
      />

      <div className="w-full flex justify-center items-center">
        <button
          type="submit"
          className="w-[70px] h-[48px] disabled:cursor-not-allowed disabled:opacity-50 mr-2 bg-primary-color text-center text-3xl px-4 py-2 rounded flex justify-center items-center"
        >
          {isLoadingSendingData ? (
            <div className="w-full flex justify-center items-center gap-4 flex-row-reverse">
              <PulseLoader color="#2B57F0" size={16} className="mt-[6px]" />
              <p>{progressLoadingText}</p>
            </div>
          ) : (
            <MdAddBox />
          )}
        </button>
      </div>
    </form>
  );
}

export default AddEventFiles;
