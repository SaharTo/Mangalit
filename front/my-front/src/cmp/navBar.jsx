import { NavLink } from "react-router-dom";
import logoSrc from "../assets/blackLogo.png";

export function Navbar() {
  return (
    <div className="app-header">
      <NavLink activeClassName="active-nav" to="/home">
        <img className="logo" src={logoSrc} alt="miao" />
      </NavLink>
      <div className="nav-links">
        <NavLink activeClassName="active-nav" to="/home">
          Home
        </NavLink>
        <NavLink activeClassName="active-nav" to="/meals">
          All Meals
        </NavLink>
        <NavLink activeClassName="active-nav" to="/sideMeals">
          All Side Meals
        </NavLink>
        <NavLink activeClassName="active-nav" to="/about">
          About
        </NavLink>
      </div>
    </div>
  );
}
