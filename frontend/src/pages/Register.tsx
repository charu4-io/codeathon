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
      <div className="w-[400px] bg-white rounded-2xl shadow-xl px-7 py-8">

        {/* Title */}
        <h2 className="text-center text-xl font-semibold text-gray-800 mb-1">
          Vendor Registration
        </h2>
        <p className="text-center text-xs text-gray-500 mb-6">
          Create your vendor account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-sm">

          {[
            { label: "Name", name: "name", type: "text", placeholder: "Enter your name" },
            { label: "Gender", name: "gender", type: "text", placeholder: "Male / Female" },
            { label: "E-mail", name: "email", type: "email", placeholder: "example@email.com" },
            { label: "Vendor Type", name: "vendor_type", type: "text", placeholder: "Retail / Wholesale" },
            { label: "Cart Type", name: "cart_type", type: "text", placeholder: "Food / Clothing" },
            { label: "Password", name: "password", type: "password", placeholder: "••••••••" },
            { label: "Confirm Password", name: "confirm_password", type: "password", placeholder: "••••••••" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block mb-1 font-medium text-gray-700">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name as keyof typeof formData]}
                onChange={handleChange}
                className="w-full bg-gray-100 rounded-lg px-3 py-2.5 outline-none
                focus:ring-2 focus:ring-orange-400 transition"
                required
              />
            </div>
          ))}

          {/* Button */}
          <button
            type="submit"
            className="w-full mt-5 bg-orange-500 hover:bg-orange-600 
            active:scale-[0.98]
            text-white font-semibold py-3 rounded-lg transition-all"
          >
            Register
          </button>

        </form>
      </div>
    </div>
  );
};

export default Register;
