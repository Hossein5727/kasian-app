import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import DocumentMeta from "react-document-meta";
import { AiOutlinePicture } from "react-icons/ai";
import { BsFillChatTextFill, BsQuestionLg } from "react-icons/bs";
import { MdCategory } from "react-icons/md";
import { TbFileDescription } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import * as Yup from "yup";
import CheckBox from "../components/common/CheckBox";
import FileUploaded from "../components/common/FileUploaded";
import Input from "../components/common/Input";
import TextArea from "../components/common/TextArea";
import { useToken, useTokenActions } from "../provider/EmailDataProvider";
import { httpGetAllCategoryService } from "../services/httpGetAllCategoryService";

const meta = {
  title: "ویرایش و حذف دسته بندی",
  description: "صفحه ویرایش و حذف دسته بندی سایت کاسیان مدیا ",
  canonical: "http://kasianmedia.com/settingcategory",
  meta: {
    charset: "utf-8",
    name: {
      keywords: " ",
    },
  },
};

//!initial values formik
const initialValues = {
  title: "",
  description: "",
  isActive: "",
};
const initialValuesFromAPI = {
  title: "",
  description: "",
  isActive: false,
};

function SettingCategoryPage() {
  const [categoryValue, setCategoryValue] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [formData, setFormData] = useState(initialValuesFromAPI);
  const [IsLoading, setIsLoading] = useState(false);
  const [categoryTypeValue, setCategoryTypeValue] = useState(null);
  const [categoryTypeList, setCategoryTypeList] = useState([]);
  const [isLoadingSendingData, setIsLoadingSendingData] = useState(false);
  const [progressLoadingText, setProgressLoadingText] = useState(null);
  const [picture, setPicture] = useState("");

  let idCategory;
  const formdataFile = new FormData();
  const { setNewToken } = useTokenActions();
  const token = useToken();
  const auth = `Bearer ${token}`;
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  //!useEffects
  useEffect(() => {
    getAllCategory();
  }, [formData]);

  useEffect(() => {
    getOneCategory();
  }, []);

  useEffect(() => {
    const tokenData = JSON.parse(sessionStorage.getItem("formData"));
    if (tokenData) {
      setNewToken(tokenData);
    }
  }, [auth]);

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
  }, [token, auth]);

  //!functionals

  //? show modal for delete category selected
  const showModal = (id) => {
    MySwal.fire({
      title: <p>آیا از حذف اطمینان دارید؟ </p>,
      color: "#F0932B",
      icon: "question",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteContent(id);
      }
    });
  };

  //? delete content by id
  const deleteContent = (id) => {
    axios({
      headers: {
        Authorization: auth,
      },
      method: "DELETE",
      url: `/Category/Delete?id=${id}`,
    })
      .then((res) => {
        Swal.fire("دسته بندی با موفقیت حذف شد", "", "success").then(() => {
          //   window.location.reload();
          navigate("/");
        });
      })
      .catch((err) => {
        Swal.fire("خطا در حذف دسته بندی", "", "error").then(() => {});
      });
  };

  //? submit handler formik
  const handleSubmit = (values) => {
    formdataFile.append("title", values.title);
    formdataFile.append("id", categoryValue);
    formdataFile.append("description", values.description);
    formdataFile.append("isActive", values.isActive);
    formdataFile.append("categoryType", categoryTypeValue);
    formdataFile.append("picture", picture);
    console.log(categoryTypeValue);
    // console.log(formdataFile);

    setIsLoadingSendingData(true);

    axios({
      method: "PUT",
      url: "/Category/Edit",
      headers: {
        Authorization: auth,
        "Content-Type": "multipart/form-data",
      },
      data: formdataFile,
      onUploadProgress: (progressEvent) => {
        setProgressLoadingText(
          Math.round((progressEvent.loaded / progressEvent.total) * 100) + "%"
        );
      },
    })
      .then((res) => {
        setIsLoadingSendingData(false);
        MySwal.fire({
          title: <p>ویرایش دسته بندی شما با موفقیت ثبت شد</p>,
          color: "#F0932B",
          icon: "success",
        }).then(() => {
          navigate("/");
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

  //? get Data all category
  const getAllCategory = async () => {
    try {
      const { data } = await httpGetAllCategoryService();
      console.log(data);
      setCategoryList(data);
    } catch (error) {}
  };

  //? get one category
  const getOneCategory = () => {
    setIsLoading(true);

    axios({
      method: "GET",
      url: `/Category/FindById?id=${idCategory}`,
      headers: {
        Authorization: auth,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        const { title, description, isActive } = res.data;
        setFormData({
          title: title,
          description: description == null ? "" : description,
          isActive: isActive,
        });
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  //? set value categroty value to from data
  const handleChangeCategoryValue = (e) => {
    setCategoryValue(e.target.value);
    idCategory = e.target.value;
    getOneCategory();
  };

  //!formink config
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formData || initialValues,
    onSubmit: handleSubmit,
    // validateOnMount: true,
  });

  return (
    <DocumentMeta {...meta}>
      <div
        style={{ direction: "rtl" }}
        className="w-full flex justify-center items-center flex-col z-[8] gap-4 relative"
      >
        <div className="px-4 py-2 text-primary-color text-2xl my-1 flex justify-center w-full bg-[#1c202f9a]">
          <h3> ویرایش و حذف دسته بندی</h3>
        </div>

        <div className="relative w-[25%] flex justify-center">
          <select
            id="countries"
            class="bg-slate-200 border w-[100%] border-gray-300 text-gray-900 text-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 py-[11px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 outline-none rounded dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all duration-200 hover:bg-bg-home hover:text-slate-200 border-none "
            value={categoryValue}
            onChange={handleChangeCategoryValue}
          >
            <option selected defaultValue>
              انتخاب دسته بندی
            </option>
            {categoryList &&
              categoryList.length > 0 &&
              categoryList.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.title}
                </option>
              ))}
          </select>
          <div className="absolute -right-[28px] top-0 text-2xl text-bg-home bg-slate-200 h-[52px] border-l border-l-bg-home px-1 rounded-tr rounded-br flex justify-center items-center">
            {<MdCategory />}
          </div>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className={`bg-[#1C202F] px-12 py-6 rounded-md flex justify-center items-center gap-6 flex-col mt-6 ${
            IsLoading && "blur-[4px]"
          } `}
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
            icon={<AiOutlinePicture />}
            label="آیکون"
            name={"picture"}
            handleChange={(e) => setPicture(e.target.files[0])}
          />

          <div className="relative w-full flex justify-center">
            <select
              id="countries"
              class="bg-slate-200 border w-[100%] border-gray-300 text-gray-900 text-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 py-[11px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 outline-none rounded dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all duration-200 hover:bg-bg-home hover:text-slate-200 border-none "
              value={categoryTypeValue}
              onChange={(e) => setCategoryTypeValue(e.target.value)}
            >
              <option selected>انتخاب دسته بندی</option>
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

          <CheckBox
            formik={formik}
            icon={<BsQuestionLg />}
            name={"isActive"}
            label="اکنون انتشار داده شود؟"
          />

          <div className="w-full flex justify-between items-center flex-row-reverse">
            <button
              type="submit"
              disabled={!formik.isValid}
              className={`bg-primary-color text-bg-home w-[140px] px-2 py-1 rounded text-center text-lg transition-all duration-200 hover:bg-bg-home hover:text-primary-color ${
                !formik.isValid &&
                "opacity-50 cursor-not-allowed hover:bg-primary-color hover:text-bg-home"
              } `}
            >
              {isLoadingSendingData ? (
                <div className="w-full flex justify-center items-center gap-4 flex-row-reverse">
                  <PulseLoader color="#2B57F0" size={10} />
                  <p>{progressLoadingText}</p>
                </div>
              ) : (
                "تایید"
              )}
            </button>

            <button
              onClick={() => showModal(categoryValue)}
              type="button"
              disabled={!formik.isValid}
              className={`bg-[#ee5253] -mr-7  text-white w-[140px] px-2 py-1 rounded text-center text-lg transition-all duration-200 hover:bg-[#dd4643]  `}
            >
              حذف
            </button>
          </div>
        </form>
        {IsLoading && (
          <PulseLoader
            className="absolute bottom-60 left-[49%]"
            color="#F0932B"
            size={22}
          />
        )}
      </div>
    </DocumentMeta>
  );
}

export default SettingCategoryPage;
