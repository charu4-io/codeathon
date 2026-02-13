import { useEffect, useState } from "react";
import axios from "axios";

import fruitsImage from "../fruits.png";
import juiceImage from "../juice.png";
import vegetableImage from "../vegetable.png";
import flowerImage from "../flower.png";
import defaultImage from "../default.png";

interface Vendor {
  id: number;
  name: string;
  category: string;
  location: string;
  hygiene_rating: number;
  is_high_hygiene: boolean;
  is_female_boosted: boolean;
  is_deal_active: boolean;
  discount?: number;
  deal_description?: string;
}

function Discover() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // FILTER STATES
  const [search, setSearch] = useState<string>("");
  const [filterDeal, setFilterDeal] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [womenOnly, setWomenOnly] = useState<boolean>(false);
  const [trustedOnly, setTrustedOnly] = useState<boolean>(false);
  const [sortType, setSortType] = useState<string>("default");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/vendors/")
      .then((res) => {
        setVendors(res.data.data as Vendor[]);
        setLoading(false);
      })
      .catch((err: unknown) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // CATEGORY IMAGE FUNCTION (Moved outside JSX)
  const getCategoryImage = (category: string) => {
    const lower = category.toLowerCase();

    if (lower.includes("food")) return fruitsImage;
    if (lower.includes("fruit")) return fruitsImage;
    if (lower.includes("juice")) return juiceImage;
    if (lower.includes("vegetable")) return vegetableImage;
    if (lower.includes("flower")) return flowerImage;

    return defaultImage;
  };

  if (loading) return <h2>Loading vendors...</h2>;

  // FILTER + SEARCH LOGIC
  let filteredVendors = vendors
    .filter((v) =>
      (v.name + v.category + v.location)
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((v) => (!filterDeal ? true : v.is_deal_active))
    .filter((v) => v.hygiene_rating >= minRating)
    .filter((v) =>
      locationFilter
        ? v.location.toLowerCase() === locationFilter.toLowerCase()
        : true
    )
    .filter((v) => (!womenOnly ? true : v.is_female_boosted))
    .filter((v) => (!trustedOnly ? true : v.is_high_hygiene));

  // SORTING
  if (sortType === "rating") {
    filteredVendors.sort(
      (a, b) => b.hygiene_rating - a.hygiene_rating
    );
  }

  if (sortType === "deals") {
    filteredVendors.sort(
      (a, b) =>
        Number(b.is_deal_active) - Number(a.is_deal_active)
    );
  }

  const uniqueLocations = [
    ...new Set(vendors.map((v) => v.location)),
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>🔥 Discover Vendors Near You</h1>

      <p style={{ color: "#555" }}>
        Sorted by Trust Score (Deals + Hygiene + Women Boost)
      </p>

      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <input
          type="text"
          placeholder="Search by name, category or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />

        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          style={{ marginRight: "10px" }}
        >
          <option value="">All Locations</option>
          {uniqueLocations.map((loc, index) => (
            <option key={index} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <select
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
          style={{ marginRight: "10px" }}
        >
          <option value={0}>All Ratings</option>
          <option value={4}>4+ Rating</option>
          <option value={4.5}>4.5+ Rating</option>
        </select>

        <label style={{ marginRight: "10px" }}>
          <input
            type="checkbox"
            checked={filterDeal}
            onChange={() => setFilterDeal(!filterDeal)}
          />
          Deals Only
        </label>

        <label style={{ marginRight: "10px" }}>
          <input
            type="checkbox"
            checked={womenOnly}
            onChange={() => setWomenOnly(!womenOnly)}
          />
          Women Owned
        </label>

        <label style={{ marginRight: "10px" }}>
          <input
            type="checkbox"
            checked={trustedOnly}
            onChange={() => setTrustedOnly(!trustedOnly)}
          />
          Trusted Only
        </label>

        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          style={{ marginLeft: "10px" }}
        >
          <option value="default">Trust Ranking (Default)</option>
          <option value="rating">Top Rated</option>
          <option value="deals">Deals First</option>
        </select>

        <button
          onClick={() => {
            setSearch("");
            setFilterDeal(false);
            setMinRating(0);
            setLocationFilter("");
            setWomenOnly(false);
            setTrustedOnly(false);
            setSortType("default");
          }}
          style={{ marginLeft: "10px" }}
        >
          Clear Filters
        </button>
      </div>

      <p>
        <strong>{filteredVendors.length}</strong> vendors found
      </p>

      {filteredVendors.map((vendor) => (
        <div
          key={vendor.id}
          style={{
            border: vendor.is_deal_active
              ? "2px solid red"
              : "1px solid #ddd",
            borderRadius: "10px",
            padding: "15px",
            marginBottom: "15px",
            background: vendor.is_deal_active ? "#fff5f5" : "#fff",
          }}
        >
          <img
            src={getCategoryImage(vendor.category)}
            alt={vendor.category}
            style={{
              width: "100%",
              height: "150px",
              objectFit: "cover",
              borderRadius: "8px",
              marginBottom: "10px",
            }}
          />

          <h2>{vendor.name}</h2>
          <p><strong>Category:</strong> {vendor.category}</p>
          <p><strong>Location:</strong> {vendor.location}</p>
          <p><strong>Hygiene:</strong> ⭐ {vendor.hygiene_rating}</p>

          <div style={{ marginBottom: "10px" }}>
            {vendor.is_high_hygiene && (
              <span style={{ color: "green", marginRight: "10px" }}>
                🟢 High Hygiene
              </span>
            )}

            {vendor.is_female_boosted && (
              <span
                style={{
                  background: "#f3e5f5",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  marginRight: "10px",
                  color: "#6a1b9a",
                }}
              >
                🟣 Women Owned
              </span>
            )}

            {vendor.is_deal_active && (
              <span style={{ color: "red" }}>
                🔴 {vendor.discount}% OFF
              </span>
            )}
          </div>

          {vendor.is_deal_active && (
            <p><strong>Deal:</strong> {vendor.deal_description}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default Discover;
