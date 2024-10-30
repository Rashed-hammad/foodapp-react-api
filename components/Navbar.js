import React from "react";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import { Search } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <LunchDiningIcon sx={{ fontSize: "80px", color: "#fff" }} />
      <ul className="links">
        <NavLink
          to="/"
          style={({ isActive }) => ({
            color: isActive ? "#272727" : "white",
            textDecoration: "none",
          })}
        >
          <Search sx={{ fontSize: "30px" }} />
        </NavLink>
        <NavLink
          to="/random"
          style={({ isActive }) => ({
            color: isActive ? "#272727" : "white",
            textDecoration: "none",
          })}
        >
          Random
        </NavLink>
      </ul>
    </div>
  );
}

export default Navbar;
