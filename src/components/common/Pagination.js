import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { httpGetAllContentService } from "../../services/httpGetAllContentService";

function Pagination({ pageNumber, setPageNumber }) {
  const [pageDetail, setPageDetail] = useState();

  useEffect(() => {
    getAllCntentList();
  }, []);

  const getAllCntentList = async () => {
    try {
      const { data } = await httpGetAllContentService();
      setPageDetail(data.metaData);
      console.log(data.metaData);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <nav
      aria-label="Page navigation example"
      style={{ direction: "rtl" }}
      className="w-full flex justify-center items-center py-2 "
    >
      <ul className="inline-flex items-center -space-x-px w-[25%]  ">
        <li className="w-full">
          <a
            href="#"
            className="block py-[13.3px] px-3 leading-tight transition-all duration-200 text-slate-300 bg-[#10121b] rounded-r-lg border border-slate-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </li>

        {pageDetail &&
          Array.apply(null, { length: pageDetail.pageCount }).map(
            (item, index) => (
              <button
                key={index + 1}
                onClick={() => setPageNumber(index + 1)}
                // style={(isActive) =>
                //   isActive ? { background: "red" } : null
                // }
                className="py-3 px-3 w-full leading-tight text-primary-color  text-lg bg-[#1C202F] border border-slate-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition-all duration-200 focus:bg-slate-300"
              >
                {index + 1}
              </button>
            )
          )}

        <li className="w-full">
          <a
            href="#"
            className="block py-[13.3px] px-3 ml-0 leading-tight text-slate-300 bg-[#10121b] transition-all duration-200 rounded-l-lg border border-slate-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
