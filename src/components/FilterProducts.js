import axios from "axios";
import { useEffect, useState } from "react";
import { AiTwotoneSetting } from "react-icons/ai";
import { BsLink45Deg } from "react-icons/bs";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { useToken, useTokenActions } from "../provider/EmailDataProvider";
import AddButtonProduct from "./common/AddButtonProduct";

function FilterProducts({ addressCategory, setCategoryId, categoryId }) {
  const [categoryList, setCategoryList] = useState([]);
  const token = useToken();
  const { setNewToken } = useTokenActions();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(addressCategory).then((res) => {
      setCategoryList(res.data);
    });
  }, []);

  useEffect(() => {
    const tokenData = JSON.parse(sessionStorage.getItem("formData"));
    if (tokenData) {
      setNewToken(tokenData);
    }
  }, []);

  return (
    <div className="w-full bg-[#1C202F] relative">
      <Swiper
        spaceBetween={10}
        slidesPerView={8}
        style={{ direction: "rtl", padding: "14px" }}
        className="w-[92%] text-[#B3B4BA] flex justify-start items-center gap-2 relative swiperContinerCategory"
      >
        {token && (
          <SwiperSlide>
            <AddButtonProduct
              productAddress="addcategory"
              toolTipTitle={"اضافه کردن دسته بندی"}
            />
          </SwiperSlide>
        )}

        <SwiperSlide
          onClick={() => {
            setCategoryId(null);
            navigate("archives");
          }}
          style={{ marginRight: "18px", marginLeft: "8px" }}
        >
          <button className="flex items-center z-[2] whitespace-nowrap gap-1 flex-row-reverse px-8 py-2 rounded-md cursor-pointer text-sm transition-all duration-150 hover:bg-[#212432] focus:bg-primary-color focus:text-bg-home focus:font-semibold">
            همه مطالب
          </button>
        </SwiperSlide>

        {categoryList &&
          categoryList.length > 0 &&
          categoryList.map((item) => (
            <SwiperSlide
              key={item.id}
              onClick={() => {
                setCategoryId(item.id);
                navigate("/archives");
              }}
            >
              <button className="flex items-center gap-1 flex-row-reverse whitespace-nowrap px-8 py-2 rounded-md cursor-pointer text-sm transition-all duration-150 hover:bg-[#212432] focus:bg-primary-color focus:text-bg-home focus:font-semibold ">
                {item.title}
              </button>
            </SwiperSlide>
          ))}
      </Swiper>
      {token && (
        <Link
          to="/settingcategory"
          className="absolute top-4 -left-1 text-white bg-primary-color rounded-tr rounded-br text-2xl px-4 py-2"
        >
          <AiTwotoneSetting className="transition-all duration-200 hover:rotate-90" />
        </Link>
      )}
    </div>
  );
}

export default FilterProducts;
