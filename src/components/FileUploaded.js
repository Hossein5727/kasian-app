function FileUploaded({ icon, name, label, handleChange, type = "file" }) {
  return (
    <div className="flex flex-col gap-4 relative">
      <input
        name={name}
        id={name}
        onChange={handleChange}
        className={`bg-slate-200  px-4 py-3  rounded text-lg text-bg-home w-[320px] outline-none transition-all duration-200 hover:bg-bg-home hover:text-slate-200 hover:placeholder:text-slate-200  placeholder:text-bg-home`}
        type={type}
      />
      {type == "file" && (
        <p className="absolute top-3 left-[9px] text-bg-home text-base ">
          {label}
        </p>
      )}
      {/* top-[44px] */}
      {icon && (
        <div className="absolute -right-[28px] top-0 text-2xl text-bg-home bg-slate-200 h-[58px] border-l border-l-bg-home px-1 rounded-tr rounded-br flex justify-center items-center">
          {icon}
        </div>
      )}
    </div>
  );
}

export default FileUploaded;
