import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { AiOutlinePicture } from "react-icons/ai";
import { BsFillChatTextFill, BsQuestionLg } from "react-icons/bs";
import { MdAddBox, MdCategory } from "react-icons/md";
import { TbFileDescription } from "react-icons/tb";
import Input from "../components/common/Input";
import TextArea from "../components/common/TextArea";
import * as Yup from "yup";
import DocumentMeta from "react-document-meta";
import CheckBox from "../components/common/CheckBox";
import axios from "axios";
import { DateTimeInput } from "react-hichestan-datetimepicker";
import FileUploaded from "../components/common/FileUploaded";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useToken, useTokenActions } from "../provider/EmailDataProvider";
import AddContentFilesVideo from "../components/AddContentFilesVideo";
import { PulseLoader } from "react-spinners";

const initialValues = {
  title: "",
  description: "",
  picture: "",
  isLive: false,
  contentFiles: [],
  thumbnail: "",
  isConfirmed: false,
  playDateTime: "",
  categoryId: 0,
};

function AddPodcastPage() {
  const meta = {
    title: "اضافه کردن پادکست",
    description: "صفحه اضافه کردن پادکست سایت کاسیان مدیا ",
    canonical: "http://kasianmedia.com/addpodcast",
    meta: {
      charset: "utf-8",
      name: {
        keywords: " ",
      },
    },
  };

  const [categoryList, setCategoryList] = useState([]);
  const [videoFilesData, setVideoFilesData] = useState({
    contentTitle: "",
    contentPicture: "",
    contentFile: "",
    contentId: "",
  });
  const [playDataTimeData, setplayDataTimeData] = useState();
  const [thumnail, setThumnail] = useState("");
  const [picture, setPicture] = useState("");
  const [extraContentId, setExtraContentId] = useState("");
  const [isSucceed, setIsSucceed] = useState(false);
  const [isAddVideo, setIsAddVideo] = useState(true);
  const [contentVideoList, setContentVideoList] = useState([]);
  const [contentId, setContentId] = useState(0);
  const [isLoadingSendingData, setIsLoadingSendingData] = useState(false);
  const [progressLoadingText, setProgressLoadingText] = useState(null);

  const MySwal = withReactContent(Swal);
  const token = useToken();

  useEffect(() => {
    axios.get("/Category/GetAllContentVideoCategory").then((res) => {
      setCategoryList(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/Content/GetAllContentVideo").then((res) => {
      setContentVideoList(res.data);
      console.log(res);
    });
  }, []);

  useEffect(() => {
    const tokenData = JSON.parse(sessionStorage.getItem("formData"));
    if (tokenData) {
      setNewToken(tokenData);
    }
  }, [token]);

  const handleChange = (event) => {
    const newState = {};
    newState[event.target.name] = event.target.value;
    setplayDataTimeData(event.target.value);
  };

  const addTime = () => {
    formik.values.playDateTime = playDataTimeData;
  };
  const formData = new FormData();

  const { setNewToken } = useTokenActions();

  const submitHandler = (values) => {
    console.log(values);
    formData.append("title", formik.values.title);
    formData.append("description", formik.values.description);
    formData.append("thumbnail", thumnail);
    formData.append("picture", picture);
    formData.append("isLive", formik.values.isLive);
    formData.append("categoryId", formik.values.categoryId);
    formData.append("isConfirmed", formik.values.isConfirmed);
    formData.append("playDateTime", formik.values.playDateTime);

    const auth = `Bearer ${token}`;

    setIsLoadingSendingData(true);

    axios({
      method: "POST",
      url: "/Content/CreateAudio",
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
          title: <p>پادکست شما با موفقیت ثبت شد</p>,
          color: "#F0932B",
          icon: "success",
        });
        setExtraContentId(res.data.extra);
        setIsSucceed(true);
      })
      .catch((err) => {
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
      title: Yup.string().required("لطفا عنوان رویداد را وارد کنید"),
      description: Yup.string().required("لطفا توضیحات رویداد را وارد کنید"),
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
          اضافه کردن پادکست
        </h2>

        <div className="w-[22%] py-3 px-3 flex justify-center items-center gap-3 rounded-sm ">
          <button
            onClick={() => setIsAddVideo(true)}
            className={`flex  ${
              isAddVideo ? "bg-primary-color" : "bg-slate-300"
            } items-center z-[2] whitespace-nowrap gap-1 flex-row-reverse px-8 py-[9px] rounded-md cursor-pointer text-base transition-all duration-150 hover:bg-slate-400 focus:bg-primary-color focus:text-bg-home `}
          >
            میخواهم پادکست جدید اضافه کنم
          </button>

          <button
            onClick={() => {
              setIsAddVideo(false);
              setIsSucceed(false);
            }}
            className={`flex ${
              !isAddVideo ? "bg-primary-color" : "bg-slate-300"
            } items-center z-[2] whitespace-nowrap gap-1 flex-row-reverse px-8 py-[9px] rounded-md cursor-pointer text-base transition-all duration-150 hover:bg-slate-400 focus:bg-primary-color focus:text-bg-home`}
          >
            میخواهم قسمت جدید اضافه کنم
          </button>
        </div>

        {!isAddVideo && (
          <select
            id="countries"
            className="bg-slate-200 border w-[20%] border-gray-300 text-gray-900 text-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 py-[11px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 outline-none rounded dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all duration-200 hover:bg-bg-home hover:text-slate-200 border-none "
            value={contentId}
            onChange={(e) => setContentId(e.target.value)}
          >
            <option selected>انتخاب پادکست</option>
            {contentVideoList &&
              contentVideoList.length > 0 &&
              contentVideoList.map((item) => (
                <option
                  value={item.id}
                  key={item.id}
                  // onClick={(formik.values.categoryId = item.id)}
                >
                  {item.title}
                </option>
              ))}
          </select>
        )}

        <div
          className={`bg-[#1C202F]  ${
            isAddVideo ? "pr-8 px-3" : " px-14"
          }  py-6 rounded-md flex justify-center items-center  flex-col mt-6`}
        >
          {!isSucceed && isAddVideo && (
            <form
              onSubmit={formik.handleSubmit}
              className="bg-[#1C202F] px-12 py-6 rounded-md flex justify-center items-center text-center gap-6 flex-col mt-6"
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

              <FileUploaded
                type="file"
                name="thumnail"
                handleChange={(e) => setThumnail(e.target.files[0])}
                label="ریز عکس"
                icon={<AiOutlinePicture />}
              />

              <FileUploaded
                icon={<AiOutlinePicture />}
                label="پوستر"
                name={"picture"}
                type="file"
                handleChange={(e) => setPicture(e.target.files[0])}
              />

              <CheckBox
                formik={formik}
                icon={<BsQuestionLg />}
                name={"isConfirmed"}
                label="اکنون انتشار داده شود؟"
              />

              <CheckBox
                formik={formik}
                icon={<BsQuestionLg />}
                name={"isLive"}
                label="به صورت زنده پخش شود؟"
              />

              {formik.values.isLive && (
                <div className="flex flex-col">
                  <DateTimeInput
                    value={playDataTimeData}
                    name={"myDateTime"}
                    onChange={handleChange}
                  />
                  <div className="bg-slate-200 text-bg-home" onClick={addTime}>
                    تایید
                  </div>
                </div>
              )}

              <div className="relative w-full flex justify-center">
                <select
                  id="countries"
                  class="bg-slate-200 border w-[100%] border-gray-300 text-gray-900 text-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 py-[11px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 outline-none rounded dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all duration-200 hover:bg-bg-home hover:text-slate-200 border-none "
                  value={formik.values.categoryId}
                  onChange={(e) =>
                    (formik.values.categoryId = Number(e.target.value))
                  }
                >
                  <option selected defaultValue>
                    انتخاب دسته بندی
                  </option>
                  {categoryList &&
                    categoryList.length > 0 &&
                    categoryList.map((item) => (
                      <option
                        value={item.id}
                        key={item.id}
                        // onClick={(formik.values.categoryId = item.id)}
                      >
                        {item.title}
                      </option>
                    ))}
                </select>
                <div className="absolute -right-[28px] top-0 text-2xl text-bg-home bg-slate-200 h-[52px] border-l border-l-bg-home px-1 rounded-tr rounded-br flex justify-center items-center">
                  {<MdCategory />}
                </div>
              </div>

              <button
                type="submit"
                disabled={!formik.isValid}
                className={`bg-primary-color ${
                  isLoadingSendingData && "opacity-40"
                } text-bg-home w-[260px] px-2 py-1 rounded text-center text-lg transition-all duration-200 hover:bg-bg-home hover:text-primary-color ${
                  !formik.isValid &&
                  "opacity-50 cursor-not-allowed hover:bg-primary-color hover:text-bg-home"
                } `}
              >
                {isLoadingSendingData ? (
                  <div className="w-full flex justify-center items-center gap-4 flex-row-reverse">
                    <PulseLoader
                      color="#2B57F0"
                      size={16}
                      className="mt-[6px]"
                    />
                    <p>{progressLoadingText}</p>
                  </div>
                ) : (
                  "تایید"
                )}
              </button>
            </form>
          )}
          {isSucceed && <AddContentFilesVideo idExtra={extraContentId} />}

          {!isAddVideo && <AddContentFilesVideo idExtra={contentId} />}
        </div>
      </div>
    </DocumentMeta>
  );
}

export default AddPodcastPage;
