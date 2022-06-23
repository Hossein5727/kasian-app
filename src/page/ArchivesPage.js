import DocumentMeta from "react-document-meta";
import ArchiveFilm from "../components/ArchiveFilm";

function ArchivesPage() {
  const meta = {
    title: "آرشیو ویدیو",
    description: "صفحه آرشیو ویدیو سایت کاسیان مدیا ",
    canonical: "http://kasianmedia.com/archives/",
    meta: {
      charset: "utf-8",
      name: {
        keywords:
          "آرشیو ویدیو,آرشیو ویدیوها,آرشیو ویدیوهای کاسیان, آرشیو ویدیوهای کاسیان مدیا",
      },
    },
  };

  return (
    <DocumentMeta {...meta}>
      <div className="w-full">
        <ArchiveFilm />
      </div>
    </DocumentMeta>
  );
}

export default ArchivesPage;
