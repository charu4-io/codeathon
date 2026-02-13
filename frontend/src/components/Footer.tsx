import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1E6BB8] text-white">
      {/* Top Quote Strip */}
      <div className="border-t-4 border-b-4 border-black bg-[#F5E6DA] text-black text-center py-2 text-sm font-semibold">
        “TrustCart helps local vendors build trust, reduce waste, and grow their daily income through smart visibility.”
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl text-center mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left Section */}
        <div>
          <p className="text-lg font-semibold leading-relaxed">
            “Empowering street vendors with Trust, Visibility & Growth.”
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold mb-4">“Quick Links”</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:underline cursor-pointer">Home</li>
            <li className="hover:underline cursor-pointer">Discover Vendors</li>
            <li className="hover:underline cursor-pointer">How It Works</li>
            <li className="hover:underline cursor-pointer">Launch Dashboard</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-bold mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:underline cursor-pointer">Help Center</li>
            <li className="hover:underline cursor-pointer">Contact Us</li>
            <li className="hover:underline cursor-pointer">Privacy Policy</li>
            <li className="hover:underline cursor-pointer">Terms</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-blue-300 py-4 px-6 flex flex-col md:flex-row justify-between items-center text-xs">
        <span>© 2026 TrustCart. All rights reserved.</span>
        <span className="mt-2 md:mt-0">
          Built for Street Vendors 🇮🇳
        </span>
      </div>
    </footer>
  );
};

export default Footer;
