import { Routes, Route } from "react-router-dom";
import AboutPage from "./pages/aboutPage/index";

const AboutRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AboutPage />} />
    </Routes>
  );
};

export default AboutRoutes;