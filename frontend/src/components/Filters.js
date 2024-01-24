import { useState } from "react";

function Filters({ applyFilters }) {
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [availability, setAvailability] = useState("");

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const handleAvailabilityChange = (e) => {
    setAvailability(e.target.value);
  };

  const handleApplyFilters = () => {
    applyFilters({ category, minPrice, maxPrice, availability });
  };

  return (
    <div>
        <label>
        Category:
        <select value={category} onChange={handleCategoryChange}>
          <option value="">All</option>
          <option value="Periodic Maintenance">Periodic Maintenance</option>
          <option value="Repairing">Repairing</option>
          <option value="Detailing">Detailing</option>
          <option value="Extra">Extra</option>
          <option value="Standard Package">Standard Package</option>
          <option value="Premium Package">Premium Package</option>
          <option value="Luxury Package">Luxury Package</option>
        </select>
      </label>
      <label>
        Min Price:
        <input type="number" value={minPrice} onChange={handleMinPriceChange} />
      </label>
      <label>
        Max Price:
        <input type="number" value={maxPrice} onChange={handleMaxPriceChange} />
      </label>
      <label>
        Availability:
        <select value={availability} onChange={handleAvailabilityChange}>
          <option value="">Select Availability</option>
          <option value="available">Available</option>
          <option value="not_available">Not Available</option>
        </select>
      </label>
      <button onClick={handleApplyFilters}>Apply Filters</button>
    </div>
  );
}

export default Filters;
