import axios from "axios";
import { useEffect, useState } from "react";
import { BsLink45Deg } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { useToken, useTokenActions } from "../provider/EmailDataProvider";
import AddButtonProduct from "./common/AddButtonProduct";

function FilterProducts({ addressCategory, setCategoryId, categoryId }) {
  const [categoryList, setCategoryList] = useState([]);
  // const [categoryId, setCategoryId] = useState(null);
  const token = useToken();
  const { setNewToken } = useTokenActions();

  useEffect(() => {
    axios.get(addressCategory).then((res) => {
      console.log(res);
      setCategoryList(res.data);
    });
  }, []);

  useEffect(() => {
    const tokenData = JSON.parse(localStorage.getItem("formData"));
    if (tokenData) {
      setNewToken(tokenData);
    }
  }, []);

  return (
    <Swiper
      // spaceBetween={1}
      slidesPerView={9}
      style={{ direction: "rtl", padding: "14px" }}
      className="w-full bg-[#1C202F]  text-[#B3B4BA] px-3 py-4 flex justify-start items-center  gap-2 "
    >
      {token && (
        <SwiperSlide>
          <AddButtonProduct
            productAddress="addcategory"
            toolTipTitle={"اضافه کردن دسته بندی"}
          />
        </SwiperSlide>
      )}

      {/* <div className="w-full flex justify-start items-center "> */}
      <SwiperSlide onClick={() => setCategoryId(null)}>
        <button className="flex items-center z-[2] whitespace-nowrap gap-1 flex-row-reverse px-8 py-2 rounded-md cursor-pointer text-sm transition-all duration-150 hover:bg-[#212432] focus:bg-primary-color focus:text-bg-home focus:font-semibold">
          همه مطالب
        </button>
      </SwiperSlide>

      {categoryList &&
        categoryList.length > 0 &&
        categoryList.map((item) => (
          <SwiperSlide key={item.id} onClick={() => setCategoryId(item.id)}>
            <button className="flex items-center gap-1 flex-row-reverse whitespace-nowrap px-8 py-2 rounded-md cursor-pointer text-sm transition-all duration-150 hover:bg-[#212432] focus:bg-primary-color focus:text-bg-home focus:font-semibold ">
              {item.title}
            </button>
          </SwiperSlide>
        ))}
      {/* </div> */}
    </Swiper>
  );
}

export default FilterProducts;
