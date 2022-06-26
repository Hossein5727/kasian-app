import React from "react";

function TextArea({ formik, icon, name, label }) {
  return (
    <div className="flex flex-col gap-2 relative">
      <textarea
        value={formik.values[name]}
        name={name}
        id={name}
        onChange={formik.handleChange}
        placeholder={label}
        className="bg-slate-200  px-4 py-3 rounded text-lg text-bg-home w-[320px] outline-none transition-all duration-200 hover:bg-bg-home hover:text-slate-200 hover:placeholder:text-slate-200  placeholder:text-bg-home"
        onBlur={formik.handleBlur}
        rows="1"
        cols="5"
      />
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

export default TextArea;
