import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { AiOutlinePicture } from "react-icons/ai";
import { BsFillChatTextFill, BsQuestionLg } from "react-icons/bs";
import { MdCategory } from "react-icons/md";
import { TbFileDescription } from "react-icons/tb";
import Input from "../components/common/Input";
import TextArea from "../components/common/TextArea";
import * as Yup from "yup";
import DocumentMeta from "react-document-meta";
import axios from "axios";
import { useToken, useTokenActions } from "../provider/EmailDataProvider";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import FileUploaded from "../components/common/FileUploaded";
import { PulseLoader } from "react-spinners";
import AddEventFiles from "../components/AddEventFiles";
import { http } from "../services/httpServices";
import CheckBox from "../components/common/CheckBox";

const initialValues = {
  title: "",
  description: "",
  isConfirmed: false,
  eventFiles: [],
  listBox: "",
};

const initialValuesFromEditPage = {
  title: "aa",
  description: "",
  isConfirmed: false,
  eventFiles: [],
  listBox: "",
};

function EditEventPage() {
  const meta = {
    title: "ویرایش رویداد",
    description: "صفحه ویرایش رویداد سایت کاسیان مدیا ",
    canonical: "http://kasianmedia.com/editevent",
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
  const [isLoadingSendingData, setIsLoadingSendingData] = useState(false);
  const [progressLoadingText, setProgressLoadingText] = useState(null);
  const [isSucceed, setIsSucceed] = useState(false);
  const [extraEventId, setExtraEventId] = useState(null);

  const token = useToken();
  const { setNewToken } = useTokenActions();
  const auth = `Bearer ${token}`;
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const location = useLocation();
  const idEvent = location.state.id;
  const formData = new FormData();

  useEffect(() => {
    getInformationEvent();
  }, []);

  useEffect(() => {
    axios.get("/Event/GetAllEnEventFileType").then((res) => {
      setEventFileTypeList(res.data);
    });
  }, []);

  useEffect(() => {
    // getAllCategoryEvents
    axios
      .get("/Category/GetAllEventCategory")
      .then((res) => setCategoryList(res.data));
  }, []);

  useEffect(() => {
    const tokenData = JSON.parse(localStorage.getItem("formData"));
    if (tokenData) {
      setNewToken(tokenData);
    }
  }, []);

  const getInformationEvent = async () => {
    try {
      const { data } = await http.get(`Event/FindById?id=${idEvent}`);
      console.log(data);
      const {
        title,
        description,
        enEventFileType,
        isConfirmed,
        categoryId,
        enEventFileTypeTitle,
      } = data;
      initialValuesFromEditPage.title = title;
      initialValuesFromEditPage.description = description;
      initialValuesFromEditPage.isConfirmed = true;
      setEventFileType(enEventFileType);
      setCategoryId(categoryId);
      //   initialValuesFromEditPage.isConfirmed = isConfirmed;
    } catch (error) {}
  };

  const submitHandler = (values) => {
    formData.append("title", formik.values.title);
    formData.append("description", formik.values.description);
    formData.append("enEventFileType", eventFileType);
    formData.append("isConfirmed", formik.values.isConfirmed);
    formData.append("categoryId", categoryId);
    formData.append("picture", pictureEvent);
    formData.append("id", idEvent);
    console.log(values);

    setIsLoadingSendingData(true);

    axios({
      method: "PUT",
      url: "/Event/Edit",
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
        setIsSucceed(true);
        setExtraEventId(res.data.extra);
        MySwal.fire({
          title: <p>رویداد شما شما با موفقیت ثبت شد</p>,
          color: "#F0932B",
          icon: "success",
        }).then(() => {
          // navigate("/");
        });
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
    initialValues: initialValuesFromEditPage,
    onSubmit: submitHandler,
    validationSchema,
  });

  return (
    <DocumentMeta {...meta}>
      <div
        style={{ direction: "rtl" }}
        className={`only:w-full flex justify-center items-center flex-col gap-4 rounded-md `}
      >
        <h2 className="text-primary-color text-4xl w-full left-0 right-0 bg-[#1B1E2C] py-2 text-center">
          ویرایش رویداد
        </h2>

        {!isSucceed && (
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
                className="bg-slate-200 border w-full border-gray-300 text-gray-900 text-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 py-[11px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 outline-none rounded dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all duration-200 hover:bg-bg-home hover:text-slate-200 border-none "
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option selected>انتخاب دسته بندی</option>
                {categoryList &&
                  categoryList.length > 0 &&
                  categoryList.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.title}
                    </option>
                  ))}
              </select>
              {/* left-[89%] */}
              <div className="absolute -right-[29px] top-0 text-2xl text-bg-home bg-slate-200 h-[52px] border-l border-l-bg-home px-1 rounded-tr rounded-br flex justify-center items-center">
                {<MdCategory />}
              </div>
            </div>

            <div className="relative w-full flex justify-center">
              <select
                id="countries"
                className="bg-slate-200 border w-full border-gray-300 text-gray-900 text-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 py-[11px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 outline-none rounded dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all duration-200 hover:bg-bg-home hover:text-slate-200 border-none "
                value={eventFileType}
                onChange={(e) => setEventFileType(e.target.value)}
              >
                <option selected>انتخاب نوع رویداد</option>
                {eventFileTypeList &&
                  eventFileTypeList.length > 0 &&
                  eventFileTypeList.map((item) => (
                    <option value={item.key} key={item.key}>
                      {item.value}
                    </option>
                  ))}
              </select>
              {/* left-[89%] */}
              <div className="absolute -right-[29px] top-0 text-2xl text-bg-home bg-slate-200 h-[52px] border-l border-l-bg-home px-1 rounded-tr rounded-br flex justify-center items-center">
                {<MdCategory />}
              </div>
            </div>

            <CheckBox
              formik={formik}
              icon={<BsQuestionLg />}
              name={"isConfirmed"}
              label="اکنون انتشار داده شود؟"
            />

            <FileUploaded
              icon={<AiOutlinePicture />}
              label="پوستر"
              name={"picture"}
              handleChange={(e) => setPictureEvent(e.target.files[0])}
            />

            <button
              type="submit"
              disabled={!formik.isValid}
              className={`bg-primary-color text-bg-home w-[260px] px-2 py-1 rounded text-center text-lg transition-all duration-200 hover:bg-bg-home hover:text-primary-color ${
                !formik.isValid &&
                "opacity-50 cursor-not-allowed hover:bg-primary-color hover:text-bg-home"
              } `}
            >
              {isLoadingSendingData ? (
                <div className="w-full flex justify-center items-center gap-4 flex-row-reverse">
                  <PulseLoader color="#2B57F0" size={16} className="mt-[6px]" />
                  <p>{progressLoadingText}</p>
                </div>
              ) : (
                "تایید"
              )}
            </button>
          </form>
        )}

        {isSucceed && (
          <div className="bg-[#1C202F] px-12 py-6 rounded-md flex justify-center items-center gap-6 flex-col mt-6">
            <AddEventFiles idExtra={extraEventId} />
          </div>
        )}
      </div>
    </DocumentMeta>
  );
}

export default EditEventPage;
