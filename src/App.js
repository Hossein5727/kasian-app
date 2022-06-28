import Layout from "./layout/Layout";
import { Routes, Route } from "react-router-dom";
import "animate.css";
import {
  AddArchivePage,
  AddEventPage,
  ArchiveDetailPage,
  ArchivesPage,
  EventDetailPage,
  EventsPage,
  HomePage,
  PodcastDetailPage,
  PodcastsPage,
  ProfilePage,
  VideoPage,
} from "./pages";
import EmailDataProvider, {
  useToken,
  useTokenActions,
  useUserData,
} from "./provider/EmailDataProvider";
import { useEffect } from "react";

function App() {
  // const { setNewToken } = useTokenActions();
  // // const userData = useUserData();

  // const token = useToken();

  // useEffect(() => {
  //   const tokenData = localStorage.getItem("formData");
  //   if (tokenData) {
  //     setNewToken(tokenData);
  //   }
  // }, [token]);

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
