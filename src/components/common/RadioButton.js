import React from "react";

function RadioButton({ formik, name, radioOptions }) {
  return (
    <div
      className="flex flex-col gap-2 relative m-2"
      style={{ direction: "rtl" }}
    >
      {radioOptions.map((item) => (
        <div key={item.value} className="m-1 flex flex-row-reverse">
          <input
            type="radio"
            id={item.value}
            name={name}
            value={item.value}
            onChange={formik.handleChange}
            className={`bg-slate-200  px-4 py-3  rounded text-lg text-bg-home w-[320px] outline-none transition-all duration-200 hover:bg-bg-home hover:text-slate-200 hover:placeholder:text-slate-200  placeholder:text-bg-home`}
            checked={formik.values.enEventFileType === item.value}
          />
          <label
            htmlFor={item.value}
            className=" text-slate-50 text-lg "
            style={{ direction: "rtl" }}
          >
            {item.label}
          </label>
        </div>
      ))}
      {formik.errors[name] && formik.touched[name] && (
        <p className="text-sm text-red-600">{formik.errors[name]}</p>
      )}
    </div>
  );
}

export default RadioButton;
