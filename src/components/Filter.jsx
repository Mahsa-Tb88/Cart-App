import React from "react";

export default function Filter() {
  return (
    <div className="d-flex justify-content-around align-items-center pt-5 filter">
      <div>
        <input className="search" placeholder="search..." />
      </div>
      <select className="selector">
        <option>All</option>
        <option>Mobile</option>
        <option>Tablet</option>
        <option>Laptop</option>
        <option>Monitor</option>
      </select>
    </div>
  );
}
