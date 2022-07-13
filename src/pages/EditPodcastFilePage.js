import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { AiFillFile, AiOutlinePicture } from "react-icons/ai";
import { BsFillChatTextFill } from "react-icons/bs";
import { MdAddBox } from "react-icons/md";
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

const initialValues = {
  contentTitle: "",
  shortDescription: "",
  description: "",
  contentId: "",
  contentFile: "",
};

function EditPodcastFilePage() {
  const [picture, setPicture] = useState(null);
  const [isLoadingSendingData, setIsLoadingSendingData] = useState(false);
  const [progressLoadingText, setProgressLoadingText] = useState(null);
  const [formDataAudioFile, setFormDataAudioFile] = useState(initialValues);

  const navigate = useNavigate();
  const token = useToken();
  const MySwal = withReactContent(Swal);
  const location = useLocation();
  const idExtra = location.state.audioId;
  const formData = new FormData();
  const { setNewToken } = useTokenActions();

  console.log(idExtra);

  useEffect(() => {
    getInformationForm();
  }, []);

  useEffect(() => {
    const tokenData = JSON.parse(sessionStorage.getItem("formData"));
    if (tokenData) {
      setNewToken(tokenData);
    }
  }, [token]);

  const getInformationForm = async () => {
    try {
      const { data } = await http.get(`ContentFile/FindById?id=${idExtra}`);
      console.log(data);
      const { description, shortDescription, title, path } = data;
      setFormDataAudioFile({
        contentFile: path,
        contentTitle: title,
        description: description,
        shortDescription: shortDescription,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const auth = `Bearer ${token}`;
  const submitHandler = (values) => {
    formData.append("contentTitle", formik.values.contentTitle);
    formData.append("description", formik.values.description);
    formData.append("shortDescription", formik.values.shortDescription);
    formData.append("id", idExtra);
    formData.append("contentId", 0);
    formData.append("contentFile", formik.values.contentFile);
    formData.append("contentPicture", picture);
    setIsLoadingSendingData(true);

    axios({
      method: "PUT",
      url: "/ContentFile/Edit",
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
    initialValues: formDataAudioFile,
    onSubmit: submitHandler,
    validateOnMount: true,
    validationSchema,
    enableReinitialize: true,
  });

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-primary-color mb-6 text-4xl w-full left-0 right-0 bg-[#1B1E2C] py-2 text-center">
        ویرایش اپیزود
      </h2>
      <form
        style={{ direction: "rtl" }}
        onSubmit={formik.handleSubmit}
        className="bg-[#1C202F] px-12 py-6 rounded-md flex justify-center items-center text-center gap-6 flex-col"
      >
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
          handleChange={(e) => setPicture(e.target.files[0])}
        />

        <Input
          formik={formik}
          icon={<AiFillFile />}
          label="فایل"
          name={"contentFile"}
        />

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
