import { useState } from "react";
import DocumentMeta from "react-document-meta";
import FilterProducts from "../components/FilterProducts";
import PodcastList from "../components/PodcastList";

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

function PodcastsPage({ isShowNav }) {
  const [categoryId, setCategoryId] = useState(null);

  return (
    <DocumentMeta {...meta}>
      <FilterProducts
        addressCategory={"/Category/GetAllContentSoundCategory"}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
      />
      <div className="w-full">
        <PodcastList isShowNav={isShowNav} categoryId={categoryId} />
      </div>
    </DocumentMeta>
  );
}

export default PodcastsPage;
