import Layout from "./layout/Layout";
import { Routes, Route } from "react-router-dom";
import "animate.css";
import {
  AddArchivePage,
  AddCategoryPage,
  AddEventPage,
  ArchiveDetailPage,
  ArchivesPage,
  EditArchivePage,
  EditContentFile,
  EditEventPage,
  EventDetailPage,
  EventsPage,
  HomePage,
  PodcastDetailPage,
  PodcastsPage,
  ProfilePage,
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
          <Route path="/eventdetail/:id" element={<EventDetailPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/video" element={<VideoPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/addevent" element={<AddEventPage />} />
          <Route path="/addarchive" element={<AddArchivePage />} />
          <Route path="/editarchive" element={<EditArchivePage />} />
          <Route path="/editcontentfile" element={<EditContentFile />} />
          <Route path="/editevent" element={<EditEventPage />} />
          <Route path="/addcategory" element={<AddCategoryPage />} />
          <Route path="/podcasts/*" element={<PodcastsPage />}>
            <Route path="podcastdetail/:id" element={<PodcastDetailPage />} />
          </Route>
          <Route path="/archives/*" element={<ArchivesPage />}>
            <Route path="archivedetail/:id" element={<ArchiveDetailPage />} />
          </Route>
        </Routes>
      </Layout>
    </EmailDataProvider>
  );
}

export default App;
