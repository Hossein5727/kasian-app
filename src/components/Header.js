import { FaUser } from "react-icons/fa";
import { IoNotificationsSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { BiSearch } from "react-icons/bi";
import { Badge } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../assests/img/logo-lg--dark (1).svg";

function Header() {
  return (
    <div className="text-regal-blue w-[92vw] flex justify-between items-center px-4 py-3 border-b border-b-border-color text-[#5F616C]">
      <div className="flex items-center gap-3">
        <div className="flex justify-center items-center rounded-full px-3 py-3 bg-[#212432]">
          <FaUser className="text-2xl" />
        </div>
        <div className="flex justify-center items-center rounded-full px-3 py-3 bg-transparent">
          <Badge
            badgeContent={2}
            color="warning"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <IoNotificationsSharp className="text-2xl" />
          </Badge>
        </div>
      </div>

      <div className="w-[490px] rounded-3xl border border-border-color px-3 py-[11px] flex items-center justify-between text-primary-text-light">
        <IoMdClose className="text-2xl" />
        <div className="flex items-center ">
          <input
            className=" bg-transparent text-sm text-[#697575] w-full outline-none"
            placeholder="... جستجوی مطالب و ویدئو ها "
          />
          <BiSearch className="bg-transparent text-2xl " />
        </div>
      </div>

      <Link className="w-[201px] h-[43px]" to="/">
        <img src={logo} alt="logo" />
      </Link>
    </div>
  );
}

export default Header;
