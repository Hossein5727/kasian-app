import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useUserActions, useUserData } from "../provider/EmailDataProvider";

const initialValues = {
  username: "",
  password: "",
};

function Login() {
  const MySwal = withReactContent(Swal);

  const userData = useUserData();
  const { setNewData } = useUserActions();

  const submitHandler = (values) => {
    MySwal.fire({
      title: <p>ثبت نام با موفقیت انجام شد</p>,
      color: "#F0932B",
      icon: "success",
    });
    setNewData(values);
  };

  const validationSchema = () =>
    yup.object({
      username: yup.string().required("فیلد نام کاربری خالی است!!"),
      password: yup
        .string()
        .required("فیلد رمز عبور خالی است!!")
        .min(8, "مقدار نباید کم تر از 8 باشه !"),
    });

  const formik = useFormik({
    initialValues,
    onSubmit: submitHandler,
    validateOnMount: true,
    validationSchema,
  });

  return (
    <div className="w-full flex justify-center items-center flex-col gap-4">
      <h2 className="text-primary-color text-4xl w-full left-0 right-0 bg-[#1B1E2C] py-2 text-center">
        ثبت نام
      </h2>
      <form
        onSubmit={formik.handleSubmit}
        className="bg-[#1C202F] px-6 py-4 rounded-md flex justify-center items-center gap-4 flex-col mt-6"
      >
        <div className="flex flex-col gap-2">
          <input
            value={formik.values.username}
            name="username"
            id="username"
            onChange={formik.handleChange}
            placeholder="نام کاربری"
            className="bg-secondary-color px-2 py-1 rounded-sm text-lg text-bg-home w-[320px] outline-none transition-all duration-200 hover:bg-[#0c2ea7] hover:text-gray-200  placeholder:text-bg-home"
            onBlur={formik.handleBlur}
          />
          {formik.errors.username && formik.touched.username && (
            <p className="text-sm text-red-600">{formik.errors.username}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <input
            value={formik.values.password}
            name="password"
            id="password"
            onChange={formik.handleChange}
            placeholder="رمز عبور"
            className="bg-secondary-color px-2 py-1 rounded-sm text-lg text-bg-home w-[320px] outline-none transition-all duration-200 hover:bg-[#0c2ea7] hover:text-gray-200  placeholder:text-bg-home"
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password && (
            <p className="text-sm text-red-600">{formik.errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!formik.isValid}
          className={`bg-primary-color text-bg-home w-[260px] px-2 py-1 rounded text-center text-lg transition-all duration-200 hover:bg-bg-home hover:text-primary-color ${
            !formik.isValid && "opacity-50 cursor-not-allowed"
          } `}
        >
          تایید
        </button>
      </form>
    </div>
  );
}

export default Login;
