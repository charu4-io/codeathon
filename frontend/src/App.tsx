import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Discover from "./pages/Discover";
import RegisterVendor from "./pages/RegisterVendor";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Discover />} />
        <Route path="/register" element={<RegisterVendor />} />
      </Routes>
    </Router>
  );
}

export default App;
