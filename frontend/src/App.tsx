import { BrowserRouter, Routes, Route } from "react-router-dom";
import VendorDashboard from "./pages/VendorDashboard";
import LandingPage from "./pages/Home";
function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/home" element={<LandingPage />} />

        <Route path="/vendor" element={<VendorDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
