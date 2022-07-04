import DocumentMeta from "react-document-meta";
import Events from "../components/Events";
import FilterEvents from "../components/FilterEvents";
import FilterProducts from "../components/FilterProducts";
import { httpGetAllCategoryEventsService } from "../services/httpGetAllCategoryEventsService";

function EventsPage() {
  const meta = {
    title: "رویداد ها ",
    description: "صفحه رویداد ها و اخبار های سایت کاسیان مدیا ",
    canonical: "http://kasianmedia.com/events/",
    meta: {
      charset: "utf-8",
      name: {
        keywords:
          "کاسیان news,کاسیان events, رویداد, اخبار , خبرها , اخبار , رویدادها",
      },
    },
  };

  return (
    <DocumentMeta {...meta}>
      <div className="w-full">
        <FilterProducts addressCategory={"/Category/GetAllEventCategory"} />
        <Events />
      </div>
    </DocumentMeta>
  );
}

export default EventsPage;
