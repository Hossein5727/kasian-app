import Layout from "./layout/Layout";
import { Routes, Route } from "react-router-dom";
import HomePage from "./page/HomePage";
import EventsPage from "./page/EventsPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
