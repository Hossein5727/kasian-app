import { useEffect, useState } from "react";
import { BsLink45Deg } from "react-icons/bs";
import { httpGetAllCategoryService } from "../services/httpGetAllCategoryService";

function FilterProducts() {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getAllCategory();
  }, []);

  const getAllCategory = async () => {
    try {
      const { data } = await httpGetAllCategoryService();
      setCategoryList(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      style={{ direction: "rtl" }}
      className="w-full bg-[#1C202F]  text-[#B3B4BA] px-2 py-4 flex justify-center items-center gap-1 overflow-x-auto"
    >
      <div className="flex text-[#6E7276]  z-[2] items-center gap-1 flex-row-reverse px-3 py-2 border border-border-color rounded-md cursor-not-allowed text-sm">
        <BsLink45Deg className="text-xl" />
        <p>فیلتر کردن</p>
      </div>

      <button className="flex  items-center z-[2] gap-1 flex-row-reverse px-8 py-2 rounded-md cursor-pointer text-sm transition-all duration-150 hover:bg-[#212432] focus:bg-primary-color focus:text-bg-home focus:font-semibold">
        همه مطالب
      </button>

      {categoryList &&
        categoryList.length > 0 &&
        categoryList.map((item) => (
          <button
            key={item.id}
            className="flex  items-center gap-1 flex-row-reverse px-8 py-2 rounded-md cursor-pointer text-sm transition-all duration-150 hover:bg-[#212432] focus:bg-primary-color focus:text-bg-home focus:font-semibold "
          >
            {item.title}
          </button>
        ))}
    </div>
  );
}

export default FilterProducts;
