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
  VideoPage,
} from "./page";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/eventdetail/:id" element={<EventDetailPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/video" element={<VideoPage />} />
        <Route path="/podcasts/*" element={<PodcastsPage />}>
          <Route path="podcastdetail/:id" element={<PodcastDetailPage />} />
        </Route>
        <Route path="/archives/*" element={<ArchivesPage />}>
          <Route path="archivedetail/:id" element={<ArchiveDetailPage />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
