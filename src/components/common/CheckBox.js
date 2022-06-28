function CheckBox({icon,formik,name,label}) {
  return (
    <div className="flex items-center relative justify-between gap-2 bg-slate-200 px-4 py-3 rounded text-lg text-bg-home w-[320px] outline-none transition-all duration-200 hover:bg-bg-home hover:text-slate-200 ">
      <div className="absolute -right-[28px] top-0 text-2xl text-bg-home bg-slate-200 h-[52px] border-l border-l-bg-home px-1 rounded-tr rounded-br flex justify-center items-center">
        {icon}
      </div>
      <p> {label}</p>
      <input
        type="checkbox"
        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        value={formik.values[name]}
        name={name}
        id={name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
    </div>
  );
}

export default CheckBox;
