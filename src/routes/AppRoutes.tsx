import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* layouts */
import Navigation from "@/layouts/Navigation";
import Footer from "@/layouts/Footer";

/* pages */
import Home from "@/pages/home";
import Properties from "@/pages/properties";
import Property from "@/pages/property";
import Agents from "@/pages/agents";
import Calculator from "@/pages/calculator";

const AppRoutes = () => {
  return (
    <Router basename={(development ? "/" : "/project/prime-estate")}>
      <div className="App">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/property/:id" element={<Property />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/calculator" element={<Calculator />} />
            </Routes>
          </main>
          <Footer />
      </div>
    </Router>
  );
};

export default AppRoutes;