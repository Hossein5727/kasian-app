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
import TextArea from "./common/TextArea";
import { TbFileDescription } from "react-icons/tb";
import * as Yup from "yup";
import Input from "./common/Input";

const initialValues = {
  contentTitle: "",
  shortDescription: "",
  description: "",
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
  const token = useToken();
  const MySwal = withReactContent(Swal);
  const auth = `Bearer ${token}`;
  const formData = new FormData();

  const submitHandler = (values) => {
    formData.append("contentTitle", formik.values.contentTitle);
    formData.append("description", formik.values.description);
    formData.append("shortDescription", formik.values.shortDescription);
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
          navigate("/archives");
        });
        formik.values.contentTitle = "";
        formik.values.descruption = "";
        formik.values.shortDescruption = "";
      })
      .catch(() => {
        setIsLoadingSendingData(false);
        MySwal.fire({
          title: <p>خطا در ارسال اطلاعات</p>,
          color: "#F0932B",
          icon: "error",
        });
      });
  };

  const validationSchema = () =>
    Yup.object({
      shortDescription: Yup.string().required(
        "لطفا فیلد توضیحات کوتاه را وارد کنید"
      ),
      description: Yup.string().required("لطفا فیلد توضیحات را وارد کنید"),
      contentTitle: Yup.string().required("لطفا فیلد عنوان را وارد کنید"),
    });

  const formik = useFormik({
    initialValues,
    onSubmit: submitHandler,
    validateOnMount: true,
    validationSchema,
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full flex flex-col gap-5 justify-center items-center"
    >
      <h3 className="text-slate-200 text-lg text-right">
        فایل های ویدیو را وارد کنید
      </h3>

      {/* <div className="flex flex-col gap-2 relative">
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
        />
        {videoFilesData.contentTitle.length < 1 && (
                <p className="text-sm text-red-600">لطفا عنوان را وارد کنید</p>
              )}
        <div className="absolute -right-[28px] top-0 text-2xl text-bg-home bg-slate-200 h-[52px] border-l border-l-bg-home px-1 rounded-tr rounded-br flex justify-center items-center">
          <BsFillChatTextFill />
        </div>
      </div> */}

      <Input
        formik={formik}
        icon={<BsFillChatTextFill />}
        label="عنوان"
        name={"contentTitle"}
      />

      <TextArea
        formik={formik}
        icon={<TbFileDescription />}
        label="توضیحات کوتاه"
        name={"shortDescription"}
      />

      <TextArea
        formik={formik}
        icon={<TbFileDescription />}
        label="توضیحات"
        name={"description"}
      />

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
        />
        {/* {videoFilesData.contentTitle.length < 1 && (
                <p className="text-sm text-red-600">لطفا عنوان را وارد کنید</p>
              )} */}
        <div className="absolute -right-[28px] top-0 text-2xl text-bg-home bg-slate-200 h-[52px] border-l border-l-bg-home px-1 rounded-tr rounded-br flex justify-center items-center">
          <AiFillFile />
        </div>
      </div>

      <div className="w-full flex justify-center items-center">
        <button
          type="submit"
          className="w-[120px] h-[48px] disabled:cursor-not-allowed disabled:opacity-50 mr-2 bg-primary-color text-center text-3xl px-4 py-2 rounded flex justify-center items-center"
          disabled={
            videoFilesData.contentTitle.length < 1 &&
            videoFilesData.contentPicture.length < 1 &&
            videoFilesData.contentFile.length < 1
          }
        >
          {isLoadingSendingData ? (
            <div className="w-full flex justify-center items-center gap-4 flex-row-reverse">
              <PulseLoader color="#2B57F0" size={8} className="mt-[6px]" />
              <p className="text-xs">{progressLoadingText}</p>
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
