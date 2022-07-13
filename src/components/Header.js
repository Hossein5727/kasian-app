import { FaUser } from "react-icons/fa";
import { IoMenu, IoNotificationsSharp } from "react-icons/io5";
import { IoMdClose, IoMdLogIn } from "react-icons/io";
import { BiSearch } from "react-icons/bi";
import { Badge } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../assests/img/logo-kasian-media-3.png";
import { useEffect, useState } from "react";
import { useUserData } from "../provider/EmailDataProvider";
import UserData from "./UserData";

function Header({ isShowNav, setIsShowNav }) {
  const [searchValue, setSearchValue] = useState("");
  const [isOpenUserMenu, setIsOpenUserMenu] = useState(false);

  const userData = useUserData();

  useEffect(() => {}, [userData]);

  return (
    <div
      className={`text-regal-blue bg-[#1C1F2E]  ${
        isShowNav ? "w-[92vw]" : "w-[100vw]"
      }  flex justify-between items-center px-4 py-3 border-b border-b-border-color text-[#5F616C]`}
    >
      {isOpenUserMenu && <UserData setIsOpenUserMenu={setIsOpenUserMenu} />}
      <div className="flex items-center gap-3">
        <div className="flex justify-center items-center rounded-full px-3 py-3 bg-[#212432]">
          {userData.username ? (
            <button onClick={() => setIsOpenUserMenu(true)}>
              <FaUser className="text-2xl" />
            </button>
          ) : (
            <Link to="/profile">
              <IoMdLogIn className="text-2xl" />
            </Link>
          )}
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

      <button
        className={`w-[490px] rounded-3xl border border-border-color px-3 py-[11px] flex items-center transition-all duration-200  hover:border-slate-400 focus:border-slate-400 ${
          searchValue.length > 1 ? "justify-between" : "justify-end"
        } text-primary-text-light`}
      >
        {searchValue.length > 1 && (
          <IoMdClose className="text-2xl" onClick={() => setSearchValue("")} />
        )}
        <div className="flex items-center ">
          <input
            style={{ direction: "rtl" }}
            className=" bg-transparent text-sm font-extralight placeholder:text-gray-500 placeholder:text-xs text-gray-300 w-full outline-none pr-1 mr-1"
            placeholder="جستجوی مطالب و ویدئوها ..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <BiSearch className="bg-transparent text-2xl " />
        </div>
      </button>

      <div className="flex items-center gap-3">
        <Link className="w-[201px] h-[33px] " to="/">
          <img src={logo} alt="logo" className="" />
        </Link>
        {!isShowNav && (
          <IoMenu
            onClick={() => {
              setIsShowNav(true);
              document.getElementById("buffer").style.width = "92vw";
            }}
            className="cursor-pointer text-4xl mr-2"
          />
        )}
      </div>
    </div>
  );
}

export default Header;
