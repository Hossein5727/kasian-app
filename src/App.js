import Layout from "./layout/Layout";
import { Routes, Route } from "react-router-dom";
import "animate.css";
import {
  AddArchivePage,
  AddCategoryPage,
  AddEventPage,
  AddPodcastPage,
  ArchiveDetailPage,
  ArchivesPage,
  EditArchivePage,
  EditContentFile,
  EditEventFilePage,
  EditEventPage,
  EventDetailPage,
  EventsPage,
  HomePage,
  PodcastDetailPage,
  PodcastsPage,
  ProfilePage,
  SettingCategoryPage,
  VideoPage,
} from "./pages";
import EmailDataProvider from "./provider/EmailDataProvider";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function App() {
  return (
    <EmailDataProvider>
      <Layout>
        <Routes>
          <Route path={process.env.PUBLIC_URL + "/"} element={<HomePage />} />
          <Route
            path={process.env.PUBLIC_URL + "/events"}
            element={<EventsPage />}
          />
          <Route
            path={process.env.PUBLIC_URL + "/video"}
            element={<VideoPage />}
          />
          <Route
            path={process.env.PUBLIC_URL + "/profile"}
            element={<ProfilePage />}
          />
          <Route
            path={process.env.PUBLIC_URL + "/addevent"}
            element={<AddEventPage />}
          />
          <Route
            path={process.env.PUBLIC_URL + "/eventdetail/:id"}
            element={<EventDetailPage />}
          />
          <Route
            path={process.env.PUBLIC_URL + "/addarchive"}
            element={<AddArchivePage />}
          />
          <Route
            path={process.env.PUBLIC_URL + "/editarchive"}
            element={<EditArchivePage />}
          />
          <Route
            path={process.env.PUBLIC_URL + "/editcontentfile"}
            element={<EditContentFile />}
          />
          <Route
            path={process.env.PUBLIC_URL + "/editevent"}
            element={<EditEventPage />}
          />
          <Route
            path={process.env.PUBLIC_URL + "/editeventfile"}
            element={<EditEventFilePage />}
          />
          <Route
            path={process.env.PUBLIC_URL + "/addcategory"}
            element={<AddCategoryPage />}
          />
          <Route
            path={process.env.PUBLIC_URL + "/addpodcast"}
            element={<AddPodcastPage />}
          />
          <Route
            path={process.env.PUBLIC_URL + "/settingcategory"}
            element={<SettingCategoryPage />}
          />
          <Route
            path={process.env.PUBLIC_URL + "/podcasts/*"}
            element={<PodcastsPage />}
          >
            <Route
              path={process.env.PUBLIC_URL + "podcastdetail/:id"}
              element={<PodcastDetailPage />}
            />
          </Route>
          <Route
            path={process.env.PUBLIC_URL + "/archives/*"}
            element={<ArchivesPage />}
          >
            <Route
              path={process.env.PUBLIC_URL + "archivedetail/:id"}
              element={<ArchiveDetailPage />}
            />
          </Route>
        </Routes>
      </Layout>
    </EmailDataProvider>
  );
}

export default App;
