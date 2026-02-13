import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Register: React.FC = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    location: "",
    is_female_owned: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/vendor/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Vendor registered successfully!");
        navigate("/VendorDashboard")
      } else {
        alert(JSON.stringify(data));
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  
    return (
    
    <div className="min-h-screen flex items-center justify-center bg-[#f6d7bb]">
      
      <div className="w-[360px] bg-white rounded-xl shadow-md px-6 py-8">
        
        {/* Title */}
        <h2 className="text-center text-lg font-semibold text-blue-600 mb-6 border-b pb-2">
          Vendor Registration
        </h2>

        {/* Form */}
        <form className="space-y-4 text-sm">
          
          {[
            "Name",
            "Gender",
            "E-mail",
            "Vendor Type",
            "Cart Type",
            "Password",
            "Confirm Password",
          ].map((label, index) => (
            <div key={index}>
              <label className="block text-gray-700 mb-1">
                {label}
              </label>
              <input
                type={
                  label.toLowerCase().includes("password")
                    ? "password"
                    : "text"
                }
                className="w-full bg-gray-100 rounded-md px-3 py-2 outline-none
                focus:ring-2 focus:ring-orange-400 transition"
              />
            </div>
          ))}

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 m-10 text-white font-medium py-6 rounded-md transition"
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
