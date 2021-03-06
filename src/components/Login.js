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
import { PulseLoader } from "react-spinners";

const initialValues = {
  userName: "",
  password: "",
};

function Login() {
  const [userData, setUserData] = useState();
  const [isSendingData, setIsSendingData] = useState(false);

  const { setNewToken } = useTokenActions();
  const { setNewData } = useUserActions();
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  useEffect(() => {
    const tokenData = JSON.parse(sessionStorage.getItem("formData"));
    if (tokenData) {
      setNewToken(tokenData);
    }
  }, []);

  const submitHandler = (values) => {
    console.log(values);
    setIsSendingData(true);
    axios
      .post("/Login/Login", values)
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          setIsSendingData(false);
          MySwal.fire({
            title: <p>ورود با موفقیت انجام شد</p>,
            color: "#F0932B",
            icon: "success",
          }).then(() => {
            navigate("/");
          });
          setNewData(values);
          const tokenData = res.data.extra.token;
          setUserData(tokenData);
          sessionStorage.setItem("formData", JSON.stringify(tokenData));
          sessionStorage.setItem("userData", JSON.stringify(values));
          setNewToken(tokenData);
        } else if (!res.data.success) {
          MySwal.fire({
            title: <p>اطلاعات را دوباره وارد کنید</p>,
            color: "#F0932B",
            icon: "error",
          }).then(() => {
            formik.initialValues.userName = "";
            formik.initialValues.password = "";
            setNewData("");
          });
        }
      })
      .catch((err) => {
        setIsSendingData(false);
        console.log(err);
      });
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
          {isSendingData ? (
            <PulseLoader color="#2B57F0" size={16} className="mt-[6px]" />
          ) : (
            <p>تایید</p>
          )}
        </button>
      </form>
    </div>
  );
}

export default Login;
