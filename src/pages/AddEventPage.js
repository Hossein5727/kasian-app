import { useFormik } from "formik";
import { useState } from "react";
import { AiOutlinePicture, AiOutlineUser } from "react-icons/ai";
import { BsQuestionLg } from "react-icons/bs";
import { MdCategory } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { TbFileDescription } from "react-icons/tb";
import Input from "../components/common/Input";
import TextArea from "../components/common/TextArea";

const initialValues = {
  title: "",
  description: "",
  file: "",
  picture: "",
  eventFiles: [],
  isConfirmed: false,
};

function AddEventPage() {
  const [categoryList, setCategoryList] = useState([]);

  const submitHandler = (values) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues,
    onSubmit: submitHandler,
  });

  return (
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
          icon={<AiOutlineUser />}
          label="عنوان "
          name={"title"}
        />

        <TextArea
          formik={formik}
          icon={<TbFileDescription />}
          label="توضیحات"
          name={"description"}
        />

        <div className="relative w-full">
          <select
            id="countries"
            class="bg-slate-200 border border-gray-300 text-gray-900 text-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 outline-none rounded dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>انتخاب دسته بندی</option>
          </select>
          <div className="absolute -right-[28px] top-0 text-2xl text-bg-home bg-slate-200 h-[52px] border-l border-l-bg-home px-1 rounded-tr rounded-br flex justify-center items-center">
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
            name="isconfirmed"
            id="isconfirmed"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        <Input
          formik={formik}
          icon={<AiOutlinePicture />}
          label="پوستر"
          name={"picture"}
          type="file"
        />

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
  );
}

export default AddEventPage;
