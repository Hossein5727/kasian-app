import { useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useUserData } from "../provider/EmailDataProvider";

function UserData({ setIsOpenUserMenu }) {
  const userRef = useRef();
  const userData = useUserData();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userRef.current && !userRef.current.contains(event.target)) {
        setIsOpenUserMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className="w-[100vw] h-[100vh] bg-[#00000036] fixed bgUserMenu flex justify-start items-start px-6 py-28 z-[5] inset-0">
      <div
        ref={userRef}
        className="bg-primary-color px-5 py-4 rounded-md animate__animated animate__zoomIn flex flex-col gap-6 w-[350px]"
      >
        <div className="flex justify-start items-start border-b border-opacity-50 border-rich-black-fogra-29 rounded-sm pb-2 gap-2 text-2xl  text-black">
          <FaUserCircle className="text-2xl" />
          <div className="flex flex-col gap-2">
            <p>{userData.username}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserData;
