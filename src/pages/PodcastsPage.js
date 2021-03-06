import DocumentMeta from "react-document-meta";
import FilterProducts from "../components/FilterProducts";
import PodcastList from "../components/PodcastList";

function PodcastsPage({isShowNav}) {
  const meta = {
    title: "پادکست ها",
    description: "صفحه پادکست سایت کاسیان مدیا ",
    canonical: "http://kasianmedia.com/podcasts/",
    meta: {
      charset: "utf-8",
      name: {
        keywords: "پادکست,پادسکت ها,پادکست های کاسیان مدیا,پادکست های کاشان",
      },
    },
  };

  return (
    <DocumentMeta {...meta}>
      <FilterProducts
        addressCategory={"/Category/GetAllContentSoundCategory"}
      />
      <div className="w-full">
        <PodcastList isShowNav={isShowNav} />
      </div>
    </DocumentMeta>
  );
}

export default PodcastsPage;
