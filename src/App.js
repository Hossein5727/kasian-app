import Layout from "./layout/Layout";
import { Routes, Route } from "react-router-dom";
import "animate.css";
import {
  ArchiveDetailPage,
  ArchivesPage,
  EventDetailPage,
  EventsPage,
  HomePage,
  PodcastDetailPage,
  PodcastsPage,
  ProfilePage,
  VideoPage,
} from "./page";
import EmailDataProvider from "./provider/EmailDataProvider";

function App() {
  return (
    <Layout>
      <EmailDataProvider>
        <Routes>
          <Route path="/eventdetail/:id" element={<EventDetailPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/video" element={<VideoPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/podcasts/*" element={<PodcastsPage />}>
            <Route path="podcastdetail/:id" element={<PodcastDetailPage />} />
          </Route>
          <Route path="/archives/*" element={<ArchivesPage />}>
            <Route path="archivedetail/:id" element={<ArchiveDetailPage />} />
          </Route>
        </Routes>
      </EmailDataProvider>
    </Layout>
  );
}

export default App;
