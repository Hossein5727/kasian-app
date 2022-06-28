import DocumentMeta from "react-document-meta";
import Login from "../components/Login";

function ProfilePage() {
  const meta = {
    title: "پروفایل",
    description: "صفحه پروفایل سایت کاسیان مدیا ",
    canonical: "http://kasianmedia.com/profile/",
    meta: {
      charset: "utf-8",
      name: {
        keywords: "پروفایل کاسیان تی وی,صفحه پروفایل کاسیان تی وی",
      },
    },
  };

  return (
    <DocumentMeta {...meta}>
      <div className="w-full" style={{direction:'rtl'}}>
        <Login />
      </div>
    </DocumentMeta>
  );
}

export default ProfilePage;
