import { useFormik } from "formik";
import DocumentMeta from "react-document-meta";
import { BsFillChatTextFill, BsQuestionLg } from "react-icons/bs";
import { TbFileDescription } from "react-icons/tb";
import CheckBox from "../components/common/CheckBox";
import Input from "../components/common/Input";
import TextArea from "../components/common/TextArea";
import * as Yup from "yup";
import FileUploaded from "../components/common/FileUploaded";
import { useEffect, useState } from "react";
import { AiOutlinePicture } from "react-icons/ai";
import { MdCategory } from "react-icons/md";
import { useToken, useTokenActions } from "../provider/EmailDataProvider";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

const initialValues = {
  title: "",
  description: "",
  isActive: false,
};

function AddCategoryPage() {
  const [picture, setPicture] = useState("");
  const [categoryTypeList, setCategoryTypeList] = useState([]);
  const [categoryTypeValue, setCategoryTypeValue] = useState(1);
  const token = useToken();
  const auth = `Bearer ${token}`;
  const { setNewToken } = useTokenActions();
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const meta = {
    title: "اضافه کردن دسته بندی",
    description: "صفحه اضافه کردن دسته بندی سایت کاسیان مدیا ",
    canonical: "http://kasianmedia.com/addcategory",
    meta: {
      charset: "utf-8",
      name: {
        keywords: " ",
      },
    },
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: "/Category/GetAllEnCategoryType",
      headers: {
        Authorization: auth,
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => {
      console.log(res);
      setCategoryTypeList(res.data);
    });
  }, []);

  useEffect(() => {
    const tokenData = JSON.parse(localStorage.getItem("formData"));
    if (tokenData) {
      setNewToken(tokenData);
    }
  }, []);

  const validationSchema = () =>
    Yup.object({
      title: Yup.string().required("عنوان را وارد کنید"),
      description: Yup.string().required("توضیخات را وارد کنید"),
    });

  const formData = new FormData();
  const handleSubmit = (values) => {
    formData.append("title", formik.values.title);
    formData.append("isActive", formik.values.isActive);
    formData.append("description", formik.values.description);
    formData.append("pictute", picture);
    formData.append("categoryType", categoryTypeValue);

    axios({
      method: "POST",
      url: "/Category/Create",
      headers: {
        Authorization: auth,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then((res) => {
        MySwal.fire({
          title: <p>دسته بندی شما شما با موفقیت ثبت شد</p>,
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

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema,
  });

  return (
    <DocumentMeta {...meta}>
      <div
        style={{ direction: "rtl" }}
        className="w-full flex justify-center items-center flex-col gap-4"
      >
        <h2 className="text-primary-color text-4xl w-full left-0 right-0 bg-[#1B1E2C] py-2 text-center">
          اضافه کردن دسته بندی
        </h2>

        <div className="bg-[#1C202F] px-3 py-6 rounded-md flex justify-center items-center  flex-col mt-6">
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

            <CheckBox
              formik={formik}
              icon={<BsQuestionLg />}
              name={"isActive"}
              label="اکنون انتشار داده شود؟"
            />

            <FileUploaded
              handleChange={(e) => setPicture(e.target.files[0])}
              icon={<AiOutlinePicture />}
              label="آیکون"
              name={"picture"}
            />

            <div className="relative w-full flex justify-center">
              <select
                id="countries"
                class="bg-slate-200 border w-[100%] border-gray-300 text-gray-900 text-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 py-[11px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 outline-none rounded dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all duration-200 hover:bg-bg-home hover:text-slate-200 border-none "
                value={categoryTypeValue}
                onChange={(e) => setCategoryTypeValue(e.target.value)}
              >
                <option selected defaultValue>
                  انتخاب دسته بندی
                </option>
                {categoryTypeList &&
                  categoryTypeList.length > 0 &&
                  categoryTypeList.map((item) => (
                    <option value={item.key} key={item.key}>
                      {item.value}
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
              className={`bg-primary-color text-bg-home w-[260px] px-2 py-1 rounded text-center text-lg transition-all duration-200 hover:bg-bg-home hover:text-primary-color ${
                !formik.isValid &&
                "opacity-50 cursor-not-allowed hover:bg-primary-color hover:text-bg-home"
              } `}
            >
              تایید
            </button>
          </form>
        </div>
      </div>
    </DocumentMeta>
  );
}

export default AddCategoryPage;
