import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { httpGetOneContentService } from "../services/httpGetOneContentService";

function ArchiveDetailPage() {
  const [contentDetail, setContentDetail] = useState();

  const params = useParams();
  const navigate = useNavigate();
  const paramsId = params.id;

  useEffect(() => {
    getOneContent();
    console.log(paramsId);
  }, [params]);

  const getOneContent = async () => {
    try {
      const { data } = await httpGetOneContentService(paramsId);
      setContentDetail(data);
      console.log(contentDetail.id);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="px-8 py-8 w-full" style={{ direction: "rtl" }}>
      {contentDetail && (
        <div className=" w-full rounded-lg h-[310px] relative overflow-hidden animate__animated  animate__fadeIn bgArchiveDetail">
          <img
            src={contentDetail.thumbnail}
            alt={contentDetail.title}
            className="w-full h-full object-cover"
          />
          <h2 className="font-medium text-5xl absolute top-4 right-8 z-[4] text-white">
            {contentDetail.title}
          </h2>
          <div className="text-gray-300 text-xs absolute top-20 right-8 z-[4]  leading-5  textOverFlow flex items-center gap-2">
            <h4 className="text-lg text-primary-color">خلاصه</h4>
            <p>{contentDetail.description}</p>
          </div>

          <div className="absolute left-4 top-4 w-[49%]  py-1 px-1 h-[170px] flex items-center gap-3 z-[3]">
            {contentDetail &&
              contentDetail.contentFiles.map((item) => (
                <div
                  onClick={() =>
                    navigate("/video", {
                      state: { currentVideo: item.id, videoList: item },
                    })
                  }
                  className="w-[120px] h-[160px] cursor-pointer rounded-md overflow-hidden  bgDetailContent bg-white flex-col "
                >
                  <img
                    src={contentDetail.thumbnail}
                    alt={item.id}
                    className="object-cover w-full h-full bg-center"
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ArchiveDetailPage;
