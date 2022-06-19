import Layout from "./layout/Layout";
import { Routes, Route } from "react-router-dom";
import HomePage from "./page/HomePage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
