import { Routes, Route } from "react-router-dom";
import AgentsPage from "./pages/agentsPage/index";

const AgentsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AgentsPage />} />
    </Routes>
  );
};

export default AgentsRoutes;