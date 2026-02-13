import React from "react";
import heroImage from "../assets/background.png";

const Hero: React.FC = () => {
  return (
    <section className="w-full bg-[#f3e6d8]">

      {/* Heading */}
      <div className="text-center pt-6">
        <h1 className="text-3xl font-bold">
          Apni Dukaan Digital Banao
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Track sales, manage stock, grow profit
        </p>
      </div>

      {/* Image Section */}
      <div className="relative w-full flex justify-center">

        {/* Image */}
        <img
          src={heroImage}
          alt="TrustCart Illustration"
          className="w-full max-w-6xl"
        />

        {/* Button */}
        <button
          className="absolute left-1/2 -translate-x-1/2 
          translate-y-1/2 
          w-[85%] max-w-4xl
          bg-red-600 hover:bg-red-700 
          text-white font-semibold py-3 rounded-full 
          shadow-[0_5px_0_rgb(120,0,0)]
          transition-all duration-200
          active:translate-y-[55%] active:shadow-none"
        >
          START NOW
        </button>

      </div>

    </section>
  );
};

export default Hero;
