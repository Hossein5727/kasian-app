import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { AiFillFile, AiOutlinePicture } from "react-icons/ai";
import { BsFillChatTextFill } from "react-icons/bs";
import { MdAddBox } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useToken, useTokenActions } from "../provider/EmailDataProvider";
import FileUploaded from "../components/common/FileUploaded";
import Input from "../components/common/Input";
import * as Yup from "yup";
import TextArea from "../components/common/TextArea";
import { TbFileDescription } from "react-icons/tb";

const initialValuesFromAPI = {
  title: "",
  description: "",
};

function EditEventFilePage() {
  const [picture, setPicture] = useState(null);
  const [isLoadingSendingData, setIsLoadingSendingData] = useState(false);
  const [progressLoadingText, setProgressLoadingText] = useState(null);
  const [formValues, setFormValues] = useState(initialValuesFromAPI);

  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const token = useToken();
  const formData = new FormData();
  const auth = `Bearer ${token}`;
  const location = useLocation();
  const eventFileId = location.state.id;
  const { setNewToken } = useTokenActions();

  useEffect(() => {
    console.log(eventFileId);

    axios.get(`/EventFile/FindById?id=${eventFileId}`).then((res) => {
      console.log(res);
      const { title, description } = res.data;
      setFormValues({ title: title, description: description });
      //   setFormValues({ description: description });
    });
  }, []);

  useEffect(() => {
    const tokenData = JSON.parse(sessionStorage.getItem("formData"));
    if (tokenData) {
      setNewToken(tokenData);
    }
  }, []);

  const submitHandler = (values) => {
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("id", eventFileId);
    formData.append("file", picture);

    setIsLoadingSendingData(true);

    axios({
      method: "PUT",
      url: "/EventFile/Edit",
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
      })
      .catch(() => {
        setIsLoadingSendingData(false);
      });
  };

  const validationSchema = () =>
    Yup.object({
      title: Yup.string().required("فیلد عنوان را وارد کنید"),
    });

  const formik = useFormik({
    initialValues: formValues,
    onSubmit: submitHandler,
    validateOnMount: true,
    validationSchema,
    enableReinitialize: true,
  });

  return (
    <div className="w-full flex justify-center items-center flex-col gap-9">
      <h3 className="text-primary-color text-2xl w-full left-0 right-0 bg-[#1B1E2C] py-2 text-center">
        ویرایش فایل رویداد
      </h3>
      <form
        style={{ direction: "rtl" }}
        onSubmit={formik.handleSubmit}
        className="bg-[#1C202F] px-12 py-6 rounded-md flex justify-center items-center gap-6 flex-col mt-6"
      >
        <Input
          formik={formik}
          icon={<BsFillChatTextFill />}
          label="عنوان"
          name="title"
        />

        <TextArea
          formik={formik}
          icon={<TbFileDescription />}
          label="توضیحات"
          name="description"
        />

        <FileUploaded
          icon={<AiFillFile />}
          label="فایل"
          name={"picture"}
          type="file"
          handleChange={(e) => setPicture(e.target.files[0])}
        />

        <div className="w-full flex justify-center items-center">
          <button
            type="submit"
            className={`w-[160px] h-[48px] disabled:cursor-not-allowed disabled:opacity-50 mr-2 ${
              !formik.isValid
                ? "bg-primary-color opacity-50 cursor-not-allowed"
                : "bg-primary-color opacity-100 cursor-pointer"
            } text-center text-xl px-4 py-2 rounded flex justify-center items-center text-bg-home`}
            disabled={!formik.isValid}
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
        </div>
      </form>
    </div>
  );
}

export default EditEventFilePage;
