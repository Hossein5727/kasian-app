import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { AiFillFile, AiOutlinePicture } from "react-icons/ai";
import { BsFillChatTextFill, BsQuestionLg } from "react-icons/bs";
import { MdAddBox, MdCategory } from "react-icons/md";
import Swal from "sweetalert2";
import { useToken, useTokenActions } from "../provider/EmailDataProvider";
import FileUploaded from "../components/common/FileUploaded";
import withReactContent from "sweetalert2-react-content";
import { useLocation, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import TextArea from "../components/common/TextArea";
import { TbFileDescription } from "react-icons/tb";
import * as Yup from "yup";
import Input from "../components/common/Input";
import { http } from "../services/httpServices";
import CheckBox from "../components/common/CheckBox";
import { DateTimeInput } from "react-hichestan-datetimepicker";

const initialValuesContentFiles = {
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

function EditPodcastFilePage() {
  const [videoFilesData, setVideoFilesData] = useState({
    contentTitle: "",
    contentPicture: "",
    contentFile: "",
    contentId: "",
  });

  const [isLoadingSendingData, setIsLoadingSendingData] = useState(false);
  const [progressLoadingText, setProgressLoadingText] = useState(null);
  const [formDataPodcast, setFormDataPodcast] = useState(
    initialValuesContentFiles
  );
  const [thumnail, setThumnail] = useState("");
  const [picture, setPicture] = useState("");
  const [categoryList, setCategoryList] = useState([]);

  const [playDataTimeData, setplayDataTimeData] = useState();
  const navigate = useNavigate();
  const token = useToken();
  const MySwal = withReactContent(Swal);
  const location = useLocation();
  const idExtra = location.state.audioId;
  const formData = new FormData();
  const { setNewToken } = useTokenActions();

  useEffect(() => {
    getInformationForm();
  }, []);

  useEffect(() => {
    const tokenData = JSON.parse(sessionStorage.getItem("formData"));
    if (tokenData) {
      setNewToken(tokenData);
    }
  }, [token]);

  useEffect(() => {
    axios.get("/Category/GetAllContentVideoCategory").then((res) => {
      setCategoryList(res.data);
    });
  }, []);

  const getInformationForm = async () => {
    try {
      const { data } = await http.get(`/Content/FindById?id=${idExtra}`);
      console.log(data);
      const { description, isConfirmed, isLive, categoryId, title, path } =
        data;
      setFormDataPodcast({
        title: title,
        description: description,
        contentFile: path,
        categoryId: categoryId,
        isConfirmed: isConfirmed,
        isLive: isLive,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const newState = {};
    newState[event.target.name] = event.target.value;
    setplayDataTimeData(event.target.value);
  };

  const addTime = () => {
    formik.values.playDateTime = playDataTimeData;
  };

  const auth = `Bearer ${token}`;
  const submitHandler = (values) => {
    console.log(formik.values);
    formData.append("id", idExtra);
    formData.append("title", formik.values.title);
    formData.append("description", formik.values.description);
    formData.append("thumbnail", thumnail);
    formData.append("picture", picture);
    formData.append("isLive", formik.values.isLive);
    formData.append("categoryId", formik.values.categoryId);
    formData.append("isConfirmed", formik.values.isConfirmed);
    formData.append("playDateTime", formik.values.playDateTime);

    setIsLoadingSendingData(true);

    axios({
      method: "PUT",
      url: "/Content/Edit",
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
          title: <p>ویرایش فایل شما با موفقیت ثبت شد </p>,
          color: "#F0932B",
          icon: "success",
        }).then(() => {
          navigate("/podcasts");
        });
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
      title: Yup.string().required("لطفا عنوان رویداد را وارد کنید"),
      description: Yup.string().required("لطفا توضیحات رویداد را وارد کنید"),
    });

  const formik = useFormik({
    initialValues: formDataPodcast,
    onSubmit: submitHandler,
    validateOnMount: true,
    validationSchema,
    enableReinitialize: true,
  });

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-primary-color mb-6 text-4xl w-full left-0 right-0 bg-[#1B1E2C] py-2 text-center">
        ویرایش پادکست
      </h2>
      <form
        style={{ direction: "rtl" }}
        onSubmit={formik.handleSubmit}
        className="bg-[#1C202F] px-12 py-6 rounded-md flex justify-center items-center text-center gap-6 flex-col"
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

        <div className="w-full flex justify-center items-center">
          <button
            type="submit"
            className="w-[120px] h-[48px] disabled:cursor-not-allowed disabled:opacity-50 mr-2 bg-primary-color text-center text-3xl px-4 py-2 rounded flex justify-center items-center"
            disabled={!formik.isValid}
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
    </div>
  );
}

export default EditPodcastFilePage;
