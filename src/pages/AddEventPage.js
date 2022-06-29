import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { AiOutlinePicture } from "react-icons/ai";
import { BsFillChatTextFill, BsQuestionLg } from "react-icons/bs";
import { MdAddBox, MdCategory } from "react-icons/md";
import { TbFileDescription } from "react-icons/tb";
import Input from "../components/common/Input";
import TextArea from "../components/common/TextArea";
import { httpGetAllCategoryEventsService } from "../services/httpGetAllCategoryEventsService";
import * as Yup from "yup";
import RadioButton from "../components/common/RadioButton";
import DocumentMeta from "react-document-meta";
import axios from "axios";
import { useToken, useTokenActions } from "../provider/EmailDataProvider";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import FileUploaded from "../components/common/FileUploaded";

const initialValues = {
  title: "",
  description: "",
  picture: "",
  isConfirmed: false,
  eventFiles: [],
  listBox: "",
  //   eventFiles: { titleEvent: "", fileEvent: "" },
};

const radioOptions = [
  { label: "فیلم", value: "0" },
  { label: "عکس", value: "1" },
];

function AddEventPage() {
  const meta = {
    title: "اضافه کردن رویداد",
    description: "صفحه اضافه کردن رویداد سایت کاسیان مدیا ",
    canonical: "http://kasianmedia.com/addevent",
    meta: {
      charset: "utf-8",
      name: {
        keywords: " ",
      },
    },
  };

  const [categoryList, setCategoryList] = useState([]);
  const [eventFilesData, setEventFilesData] = useState({
    titleEvent: "",
    fileEvent: "",
  });
  const [pictureEvent, setPictureEvent] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [eventFileTypeList, setEventFileTypeList] = useState([]);
  const [eventFileType, setEventFileType] = useState(0);

  const token = useToken();
  const { setNewToken } = useTokenActions();

  const auth = `Bearer ${token}`;
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/Event/GetAllEnEventFileType").then((res) => {
      console.log(res.data);
      setEventFileTypeList(res.data);
    });
  }, []);

  useEffect(() => {
    // getAllCategoryEvents
    axios
      .get("/Category/GetAllCategoryEvents")
      .then((res) => setCategoryList(res.data));
  }, []);

  useEffect(() => {
    const tokenData = JSON.parse(localStorage.getItem("formData"));
    if (tokenData) {
      setNewToken(tokenData);
    }
  }, []);

  const formData = new FormData();
  const submitHandler = (values) => {
    formData.append("title", formik.values.title);
    formData.append("description", formik.values.description);
    formData.append("enEventFileType", eventFileType);
    formData.append("isConfirmed", formik.values.isConfirmed);
    formData.append("categoryId", categoryId);
    formData.append("picture", pictureEvent);
    console.log(values);

    axios({
      method: "POST",
      url: "/Event/Create",
      headers: {
        Authorization: auth,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then((res) => {
        MySwal.fire({
          title: <p>رویداد شما شما با موفقیت ثبت شد</p>,
          color: "#F0932B",
          icon: "success",
        }).then(() => {
          navigate("/");
        });
      })
      .catch((err) => {
        MySwal.fire({
          title: <p>{err.message}</p>,
          color: "#F0932B",
          icon: "error",
        });
      });
  };

  const clickHandler = () => {
    formik.values.eventFiles.push(eventFilesData);
    setEventFilesData({ fileEvent: "", titleEvent: "" });
  };

  const validationSchema = () =>
    Yup.object({
      title: Yup.string().required("لطفا عنوان رویداد را وارد کنید"),
      description: Yup.string().required("لطفا توضیحات رویداد را وارد کنید"),
      // picture: Yup.mixed().required("لطفا یک عکس را وارد کنید"),
    });

  const formik = useFormik({
    initialValues,
    onSubmit: submitHandler,
    validationSchema,
  });

  return (
    <DocumentMeta {...meta}>
      <div
        style={{ direction: "rtl" }}
        className="w-full flex justify-center items-center flex-col gap-4"
      >
        <h2 className="text-primary-color text-4xl w-full left-0 right-0 bg-[#1B1E2C] py-2 text-center">
          اضافه کردن رویداد
        </h2>

        <form
          onSubmit={formik.handleSubmit}
          className="bg-[#1C202F] px-12 py-6 rounded-md flex justify-center items-center gap-6 flex-col mt-6"
        >
          <Input
            formik={formik}
            icon={<BsFillChatTextFill />}
            label="عنوان "
            name={"title"}
          />

          <TextArea
            formik={formik}
            icon={<TbFileDescription />}
            label="توضیحات"
            name={"description"}
          />

          <div className="relative w-full flex justify-center">
            <select
              id="countries"
              class="bg-slate-200 border w-full border-gray-300 text-gray-900 text-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 py-[11px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 outline-none rounded dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all duration-200 hover:bg-bg-home hover:text-slate-200 border-none "
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option selected>انتخاب دسته بندی</option>
              {categoryList &&
                categoryList.length > 0 &&
                categoryList.map((item) => (
                  <option value={item.id}>{item.title}</option>
                ))}
            </select>
            {/* left-[89%] */}
            <div className="absolute right-0 top-0 text-2xl text-bg-home bg-slate-200 h-[52px] border-l border-l-bg-home px-1 rounded-tr rounded-br flex justify-center items-center">
              {<MdCategory />}
            </div>
          </div>

          <div className="relative w-full flex justify-center">
            <select
              id="countries"
              class="bg-slate-200 border w-full border-gray-300 text-gray-900 text-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 py-[11px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 outline-none rounded dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all duration-200 hover:bg-bg-home hover:text-slate-200 border-none "
              value={eventFileType}
              onChange={(e) => setEventFileType(e.target.value)}
            >
              <option selected>انتخاب نوع رویداد</option>
              {eventFileTypeList &&
                eventFileTypeList.length > 0 &&
                eventFileTypeList.map((item) => (
                  <option value={item.key}>{item.value}</option>
                ))}
            </select>
            {/* left-[89%] */}
            <div className="absolute right-0 top-0 text-2xl text-bg-home bg-slate-200 h-[52px] border-l border-l-bg-home px-1 rounded-tr rounded-br flex justify-center items-center">
              {<MdCategory />}
            </div>
          </div>

          <div className="flex items-center relative justify-between gap-2 bg-slate-200 px-4 py-3 rounded text-lg text-bg-home w-[320px] outline-none transition-all duration-200 hover:bg-bg-home hover:text-slate-200 ">
            <div className="absolute -right-[28px] top-0 text-2xl text-bg-home bg-slate-200 h-[52px] border-l border-l-bg-home px-1 rounded-tr rounded-br flex justify-center items-center">
              {<BsQuestionLg />}
            </div>
            <p> اکنون انتشار داده شود ?</p>
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              value={formik.values.isConfirmed}
              name="isConfirmed"
              id="isConfirmed"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <FileUploaded
            icon={<AiOutlinePicture />}
            label="پوستر"
            name={"picture"}
            handleChange={(e) => setPictureEvent(e.target.files[0])}
          />

          <hr className="border-t-2 border-t-slate-200 border-opacity-50 w-full" />

          <div className="w-full flex flex-col gap-5 justify-center items-center">
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
                    titleEvent: e.target.value,
                  })
                }
                placeholder={"عنوان"}
                className={`bg-slate-200  px-4 py-3 rounded text-lg text-bg-home w-[320px] outline-none transition-all duration-200 hover:bg-bg-home hover:text-slate-200 hover:placeholder:text-slate-200  placeholder:text-bg-home`}
                onBlur={formik.handleBlur}
              />
              {eventFilesData.titleEvent.length < 1 && (
                <p className="text-sm text-red-600">لطفا عنوان را وارد کنید</p>
              )}
              <div className="absolute -right-[28px] top-0 text-2xl text-bg-home bg-slate-200 h-[52px] border-l border-l-bg-home px-1 rounded-tr rounded-br flex justify-center items-center">
                <BsFillChatTextFill />
              </div>
            </div>

            <div className="flex flex-col gap-2 relative">
              <input
                value={eventFilesData.fileEvent}
                name={"fileEvent"}
                id={"fileEvent"}
                onChange={(e) =>
                  setEventFilesData({
                    ...eventFilesData,
                    fileEvent: e.target.value,
                  })
                }
                className={`bg-slate-200  px-4 py-[9px] rounded text-lg text-bg-home w-[320px] outline-none transition-all duration-200 hover:bg-bg-home hover:text-slate-200 hover:placeholder:text-slate-200  placeholder:text-bg-home`}
                type="file"
              />
              {eventFilesData.fileEvent.length < 1 && (
                <p className="text-sm text-red-600">لطفا یک عکس وارد کنید</p>
              )}
              <p className="absolute top-3 left-3 text-bg-home text-lg ">عکس</p>

              <div className="absolute -right-[28px] top-0 text-2xl text-bg-home bg-slate-200 h-[52px] border-l border-l-bg-home px-1 rounded-tr rounded-br flex justify-center items-center">
                <AiOutlinePicture />
              </div>
            </div>

            <div className="w-full flex justify-center items-center">
              <button
                onClick={clickHandler}
                className="w-[70px] h-[48px] disabled:cursor-not-allowed disabled:opacity-50 mr-2 bg-primary-color text-center text-3xl px-4 py-2 rounded flex justify-center items-center"
                disabled={
                  !eventFilesData.titleEvent && !eventFilesData.fileEvent
                }
              >
                <MdAddBox />
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={!formik.isValid}
            className={`bg-primary-color text-bg-home w-[260px] px-2 py-1 rounded text-center text-lg transition-all duration-200 hover:bg-bg-home hover:text-primary-color ${
              !formik.isValid &&
              "opacity-50 cursor-not-allowed hover:bg-primary-color hover:text-bg-home"
            } `}
          >
            تایید
          </button>
        </form>
      </div>
    </DocumentMeta>
  );
}

export default AddEventPage;
