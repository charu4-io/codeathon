import { BrowserRouter, Routes, Route } from "react-router-dom";
import VendorDashboard from "./pages/VendorDashboard";
import LandingPage from "./pages/Home";
import Register from "./pages/Register";
function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/home" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/vendor" element={<VendorDashboard />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App;
