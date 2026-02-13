import React from "react";
import Navbar from "../components/Navbar";

const VendorDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#E6D4C7] flex flex-col">
      {/* NAVBAR */}
      <> <Navbar/>
</>
     
      {/* PROFILE CARD */}
      <div className="flex justify-center mt-10 px-4">
        <div className="relative bg-[#E2D0C2] border border-gray-500 w-full max-w-3xl p-8">
          {/* Go Online Toggle */}
          <div className="absolute top-4 right-6 flex items-center gap-2 text-sm">
            <span className="w-3 h-3 bg-black rounded-full"></span>
            Go Online
          </div>

          <div className="grid grid-cols-2 gap-y-3 text-lg font-medium">
            <p>User Name :</p>
            <p>Aman</p>

            <p>Gender :</p>
            <p>Male</p>

            <p>Vendor Category :</p>
            <p>Fruit/Vegetable vendor</p>

            <p>Current Location :</p>
            <p>2nd lane, Vineet Nagar</p>

            <p>Hygiene Ratings :</p>
            <p>0.5/1</p>
          </div>
        </div>
      </div>

      {/* PLACE CART ONLINE BAR */}
      <div className="flex justify-center mt-10 px-4">
        <div className="bg-[#E6E6E6] w-full max-w-4xl px-8 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-medium">
            Place you Cart Online:
          </h2>

          <button className="flex items-center gap-2 text-lg font-medium">
            Add cart 🛒
          </button>
        </div>
      </div>

      {/* INFO BOX */}
      <div className="flex justify-center mt-6 px-4">
        <div className="bg-[#E6E6E6] w-full max-w-3xl p-8 text-center text-lg leading-relaxed">
          <p>
            Live offers and cart added here <br />
            that cart will start showing on the discover page <br />
            details of the cart going to be entered <br />
            by the simple form fields from the vendor <br />
            (by click on add cart button) <br />
            vendors can type the offers and the <br />
            timings and the other details
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="mt-auto bg-[#1E6BB8] text-white">
        {/* Quote strip */}
        <div className="bg-[#F5E6DA] text-black text-center py-2 text-sm font-semibold border-y-4 border-black">
          “TrustCart helps local vendors build trust, reduce waste, and grow their daily income through smart visibility.”
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          <p className="text-lg font-semibold">
            “Empowering street vendors with Trust,
            <br />
            Visibility & Growth.”
          </p>

          <div>
            <h4 className="font-bold mb-3">“Quick Links”</h4>
            <ul className="space-y-2 text-sm">
              <li>Home</li>
              <li>Discover Vendors</li>
              <li>How It Works</li>
              <li>Launch Dashboard</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
              <li>Terms</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-300 px-6 py-4 flex justify-between text-xs">
          <span>© 2026 TrustCart. All rights reserved.</span>
          <span>Built for Street Vendors 🇮🇳</span>
        </div>
      </footer>
    </div>
  );
};

export default VendorDashboard;
