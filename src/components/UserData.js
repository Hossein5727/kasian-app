import { Logout } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useUserData } from "../provider/EmailDataProvider";

function UserData({ setIsOpenUserMenu }) {
  const [userData, setUserData] = useState(null);

  const userRef = useRef();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

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

  console.log(userData);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("userData"));
    if (user) {
      setUserData(user);
    }
  }, []);

  const logOutUser = () => {
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("formData");
    MySwal.fire({
      title: <p>با موفقیت خارج شدید</p>,
      color: "#F0932B",
      icon: "success",
    }).then(() => {
      navigate("/");
      window.location.reload();
    });
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-[#00000036] fixed bgUserMenu flex justify-start items-start px-6 py-28 z-[5] inset-0">
      {userData && (
        <div
          ref={userRef}
          className="bg-primary-color px-5 py-4 rounded-md animate__animated animate__zoomIn flex flex-col gap-6 w-[350px]"
        >
          <div className="flex justify-start items-start border-b border-opacity-50 border-rich-black-fogra-29 rounded-sm pb-2 gap-2 text-2xl  text-black">
            <FaUserCircle className="text-2xl" />
            <div className="flex flex-col gap-2">
              <p>{userData.userName}</p>
            </div>
          </div>
          <Button
            variant="outlined"
            color="error"
            style={{ fontFamily: "iranSans" }}
            endIcon={<Logout />}
            onClick={logOutUser}
          >
            خروج
          </Button>
        </div>
      )}
    </div>
  );
}

export default UserData;
