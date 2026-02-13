import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    email: "",
    vendor_type: "",
    cart_type: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/vendor/register/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Vendor registered successfully!");
        navigate("/vendor");
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
      <div className="w-[380px] bg-white rounded-2xl shadow-lg px-7 py-8">

        {/* Heading */}
        <h2 className="text-center text-xl font-semibold mb-6 border-b pb-2">
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
          ].map((label) => (
            <div key={label}>
              <label className="block mb-1 text-gray-700">
                {label}
              </label>
              <input
                type={label.toLowerCase().includes("password") ? "password" : "text"}
                placeholder={`Enter ${label}`}
                className="w-full bg-gray-100 rounded-lg px-3 py-2
                outline-none focus:ring-2 focus:ring-orange-400 transition"
              />
            </div>
          ))}

          {/* Button */}
          <button
            type="button"
            className="w-full mt-5 bg-orange-500 hover:bg-orange-600 
            text-white font-medium py-3 rounded-lg transition"
          >
            Register
          </button>

        </form>
      </div>
    </div>
  );
};

export default Register;
