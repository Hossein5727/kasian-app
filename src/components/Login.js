import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useUserActions, useUserData } from "../provider/EmailDataProvider";
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import Input from "./common/Input";

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
    <div className="w-full flex justify-center items-center flex-col gap-5">
      <h2 className="text-primary-color text-4xl w-full left-0 right-0 bg-[#1B1E2C] py-2 text-center">
        ورود
      </h2>
      <form
        onSubmit={formik.handleSubmit}
        className="bg-[#1C202F] px-12 py-6 rounded-md flex justify-center items-center gap-6 flex-col mt-6"
      >
        <Input
          formik={formik}
          icon={<AiOutlineUser />}
          label="نام کاربری"
          name={"username"}
        />

        <Input
          formik={formik}
          icon={<RiLockPasswordLine />}
          label="رمز عبور"
          name={"password"}
          type="password"
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

export default Login;
