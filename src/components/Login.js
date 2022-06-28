import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  useToken,
  useTokenActions,
  useUserActions,
  useUserData,
} from "../provider/EmailDataProvider";
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import Input from "./common/Input";
import { httpPostUserLoginService } from "../services/httpPostUserLoginService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const initialValues = {
  userName: "",
  password: "",
};

function Login() {
  const [userData, setUserData] = useState();
  const { setNewToken } = useTokenActions();

  const MySwal = withReactContent(Swal);

  const { setNewData } = useUserActions();

  useEffect(() => {
    const tokenData = JSON.parse(localStorage.getItem("formData"));
    if (tokenData) {
      setNewToken(tokenData);
    }
  }, []);

  const submitHandler = (values) => {
    // postUserData(values);
    console.log(values);

    axios.post("/Login/Login", values).then((res) => {
      const tokenData = res.data.extra.token;
      console.log(tokenData);
      setUserData(tokenData);
      localStorage.setItem("formData", JSON.stringify(tokenData));
      setNewToken(tokenData);
    });

    MySwal.fire({
      title: <p>ورود با موفقیت انجام شد</p>,
      color: "#F0932B",
      icon: "success",
    }).then(() => {
      // navigate("/");
    });
    setNewData(values);
  };

  const validationSchema = () =>
    yup.object({
      userName: yup.string().required("فیلد نام کاربری خالی است!!"),
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
          name={"userName"}
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
