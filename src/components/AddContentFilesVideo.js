import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { AiFillFile, AiOutlinePicture } from "react-icons/ai";
import { BsFillChatTextFill } from "react-icons/bs";
import { MdAddBox } from "react-icons/md";
import Swal from "sweetalert2";
import { useToken } from "../provider/EmailDataProvider";
import FileUploaded from "./common/FileUploaded";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";

const initialValues = {
  name: "",
};

function AddContentFilesVideo({ idExtra = 69 }) {
  const [videoFilesData, setVideoFilesData] = useState({
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
    formData.append("contentTitle", videoFilesData.contentTitle);
    formData.append("contentId", idExtra);
    formData.append("contentPicture", videoFilesData.contentPicture);
    formData.append("contentFile", videoFilesData.contentFile);

    setIsLoadingSendingData(true);

    axios({
      method: "POST",
      url: "/ContentFile/Create",
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
        setVideoFilesData("");
      })
      .catch(() => {
        setIsLoadingSendingData(false);
      });
  };

  const clickHandler = () => {};

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
        فایل های ویدیو را وارد کنید
      </h3>

      <div className="flex flex-col gap-2 relative">
        <input
          value={videoFilesData.titleEvent}
          name={"titleEvent"}
          id={"titleEvent"}
          onChange={(e) =>
            setVideoFilesData({
              ...videoFilesData,
              contentTitle: e.target.value,
            })
          }
          placeholder={"عنوان"}
          className={`bg-slate-200  px-4 py-3 rounded text-lg text-bg-home w-[320px] outline-none transition-all duration-200 hover:bg-bg-home hover:text-slate-200 hover:placeholder:text-slate-200  placeholder:text-bg-home`}
          onBlur={formik.handleBlur}
        />
        {/* {videoFilesData.contentTitle.length < 1 && (
                <p className="text-sm text-red-600">لطفا عنوان را وارد کنید</p>
              )} */}
        <div className="absolute -right-[28px] top-0 text-2xl text-bg-home bg-slate-200 h-[52px] border-l border-l-bg-home px-1 rounded-tr rounded-br flex justify-center items-center">
          <BsFillChatTextFill />
        </div>
      </div>

      <FileUploaded
        icon={<AiOutlinePicture />}
        label="پوستر"
        name={"contentPicture"}
        type="file"
        handleChange={(e) =>
          setVideoFilesData({
            ...videoFilesData,
            contentPicture: e.target.files[0],
          })
        }
      />

      <div className="flex flex-col gap-2 relative">
        <input
          value={videoFilesData.contentFile}
          name={"contentFile"}
          id={"contentFile"}
          onChange={(e) =>
            setVideoFilesData({
              ...videoFilesData,
              contentFile: e.target.value,
            })
          }
          placeholder={"فایل"}
          className={`bg-slate-200  px-4 py-3 rounded text-lg text-bg-home w-[320px] outline-none transition-all duration-200 hover:bg-bg-home hover:text-slate-200 hover:placeholder:text-slate-200  placeholder:text-bg-home`}
          onBlur={formik.handleBlur}
        />
        {/* {videoFilesData.contentTitle.length < 1 && (
                <p className="text-sm text-red-600">لطفا عنوان را وارد کنید</p>
              )} */}
        <div className="absolute -right-[28px] top-0 text-2xl text-bg-home bg-slate-200 h-[52px] border-l border-l-bg-home px-1 rounded-tr rounded-br flex justify-center items-center">
          <BsFillChatTextFill />
        </div>
      </div>

      {/* <FileUploaded
        icon={<AiFillFile />}
        label="فایل"
        name={"contentFile"}
        type="file"
        handleChange={(e) =>
          setVideoFilesData({
            ...videoFilesData,
            contentFile: e.target.files[0],
          })
        }
      /> */}

      <div className="w-full flex justify-center items-center">
        <button
          type="submit"
          className="w-[70px] h-[48px] disabled:cursor-not-allowed disabled:opacity-50 mr-2 bg-primary-color text-center text-3xl px-4 py-2 rounded flex justify-center items-center"
          disabled={
            videoFilesData.contentTitle.length < 1 &&
            videoFilesData.contentPicture.length < 1 &&
            videoFilesData.contentFile.length < 1
          }
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

export default AddContentFilesVideo;
