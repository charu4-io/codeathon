import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-[#EADBC8] shadow-md">
      <div className="flex items-center gap-2 text-xl font-bold">
        🛒 Trust Cart
      </div>

      <div className="flex gap-4">
        <button className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-full shadow-md transition">
          Home
        </button>
        <button className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-full shadow-md transition">
          Discover
        </button>
        <button className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-full shadow-md transition">
          Login/Register
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
