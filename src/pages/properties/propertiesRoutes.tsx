import { Routes, Route } from "react-router-dom";
import PropertiesPage from "./pages/propertiesPage/index";

const PropertiesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PropertiesPage />} />
    </Routes>
  );
};

export default PropertiesRoutes;