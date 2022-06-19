import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { navLinks } from "../data/navLinks";

function Nav() {
  const [isActiveLogo, setIsActiveLogo] = useState(false);

  return (
    <div className="h-[100vh] w-[8vw] -mt-[73px] border-l border-l-border-color flex flex-col justify-start items-center gap-10 text-primary-text-light text-4xl py-7">
      <IoMenu />

      {navLinks.map((item) => (
        <NavLink
          to={item.link}
          key={item.id}
          className={({ isActive }) =>
            `flex flex-col justify-center items-center gap-3 w-full py-1 transition-all duration-200  ${
              isActive
                ? "bg-gray-400 bg-opacity-10 text-gray-300"
                : "text-[#5F616C]"
            }`
          }
        >
          <NavLink
            to={item.link}
            className={({ isActive }) =>
              `text-3xl font-thin ${isActive ? "text-primary-orange" : ""}`
            }
          >
            {item.img}
          </NavLink>
          <p className="text-sm">{item.text}</p>
        </NavLink>
      ))}
    </div>
  );
}

export default Nav;
