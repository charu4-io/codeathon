import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface VendorForm {
  name: string;
  category: string;
  location: string;
  is_female_owned: boolean;
  image_url: string;
}

function RegisterVendor() {
  const navigate = useNavigate();

  const [form, setForm] = useState<VendorForm>({
    name: "",
    category: "",
    location: "",
    is_female_owned: false,
    image_url: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]:
        type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:8000/api/register-vendor/", form)
      .then(() => {
        alert("Vendor Registered Successfully!");
        navigate("/discover");
      })
      .catch((err: unknown) => console.error(err));
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Register as Vendor</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Vendor Name"
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <input
          name="category"
          placeholder="Category (food, flower, etc)"
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <input
          name="location"
          placeholder="Location"
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label>
          <input
            type="checkbox"
            name="is_female_owned"
            onChange={handleChange}
          />
          Women Owned
        </label>
        <br />
        <br />

        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterVendor;
