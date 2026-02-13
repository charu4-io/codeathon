import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-[#EADBC8] shadow-md">
      <div className="flex items-center gap-2 text-xl font-bold">
        🛒 Trust Cart
      </div>

      <div className="flex gap-4">
        <button className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-full shadow-md transition">
          Home
        </button>
        <button className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-full shadow-md transition"
        onClick={() => navigate("/vendor")}
        >
          Dashboard
        </button>
        <button className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-full shadow-md transition"
        onClick={() => navigate("/register")}>
          Login/Register
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
