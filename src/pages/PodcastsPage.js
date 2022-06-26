import DocumentMeta from "react-document-meta";
import PodcastList from "../components/PodcastList";

function PodcastsPage() {
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
      <div className="w-full">
        <PodcastList />
      </div>
    </DocumentMeta>
  );
}

export default PodcastsPage;
