import { useRef } from "react";

function Input({
  formik,
  icon,
  name,
  label,
  type = "text",
  ref,
}) {
  ref = useRef();

  return (
    <div className="flex flex-col gap-4 relative">
      {/* <label htmlFor={name} className="text-lg text-slate-200">
        {label}
      </label> */}
      <input
        ref={ref}
        value={formik.values[name]}
        name={name}
        id={name}
        onChange={formik.handleChange}
        // onChange={type != "file" ? formik.handleChange : handleChange}
        placeholder={label}
        className={`bg-slate-200  px-4 py-3 ${
          type == "file" && "py-[9px]"
        } rounded text-lg text-bg-home w-[320px] outline-none transition-all duration-200 hover:bg-bg-home hover:text-slate-200 hover:placeholder:text-slate-200  placeholder:text-bg-home`}
        onBlur={formik.handleBlur}
        type={type}
      />
      {type == "file" && (
        <p className="absolute top-3 left-[9px] text-bg-home text-base ">
          {label}
        </p>
      )}
      {/* top-[44px] */}
      {icon && (
        <div className="absolute -right-[28px] top-0 text-2xl text-bg-home bg-slate-200 h-[52px] border-l border-l-bg-home px-1 rounded-tr rounded-br flex justify-center items-center">
          {icon}
        </div>
      )}
      {formik.errors[name] && formik.touched[name] && (
        <p className="text-sm text-red-600">{formik.errors[name]}</p>
      )}
    </div>
  );
}

export default Input;
