import { useEnvContext } from "@hooks/useEnvContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* layouts */
import Navigation from "@layouts/Navigation";
import Footer from "@layouts/Footer";

/* pages */
import Home from "@pages/home";
import PropertiesRoutes from "@pages/properties/propertiesRoutes";
import PropertyRoutes from "@pages/property/propertyRoutes";
import AgentsRoutes from "@pages/agents/agentsRoutes";
import CalculatorRoutes from "@pages/calculator/calculatorRoutes";

const AppRoutes = () => {
  const development = useEnvContext();
  return (
    <Router basename="/project/prime-estate">
      <div className="App">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/properties" element={<PropertiesRoutes />} />
              <Route path="/property/:id" element={<PropertyRoutes />} />
              <Route path="/agents" element={<AgentsRoutes />} />
              <Route path="/calculator" element={<CalculatorRoutes />} />
            </Routes>
          </main>
          <Footer />
      </div>
    </Router>
  );
};

export default AppRoutes;