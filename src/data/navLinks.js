import { RiApps2Line } from "react-icons/ri";
import { BiMicrophone } from "react-icons/bi";
import { HiOutlineUser } from "react-icons/hi";
import { MdMonitor, MdEventAvailable } from "react-icons/md";

export const navLinks = [
  {
    id: 1,
    text: "آرشیو ویدئو",
    link: "/archives",
    img: <RiApps2Line />,
  },
  { id: 2, text: "پادکست ها", link: "/podcasts", img: <BiMicrophone /> },
  { id: 3, text: "tv کاسیان  ", link: "/", img: <MdMonitor /> },
  { id: 4, text: "رویداد ها ", link: "/events", img: <MdEventAvailable /> },
  { id: 5, text: "پروفایل", link: "/profile", img: <HiOutlineUser /> },
];
