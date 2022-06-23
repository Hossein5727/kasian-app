import Layout from "./layout/Layout";
import { Routes, Route } from "react-router-dom";
import HomePage from "./page/HomePage";
import EventsPage from "./page/EventsPage";
import EventDetailPage from "./page/EventDetailPage";
import ArchivesPage from "./page/ArchivesPage";
import ArchiveDetailPage from "./page/ArchiveDetailPage";
import "animate.css";
import VideoPage from "./page/VideoPage";
import { useEffect } from "react";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/eventdetail/:id" element={<EventDetailPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/video" element={<VideoPage />} />
        <Route path="/archives/*" element={<ArchivesPage />}>
          <Route path="archivedetail/:id" element={<ArchiveDetailPage />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
