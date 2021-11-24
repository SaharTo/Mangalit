import { NavLink } from "react-router-dom";
import logoSrc from "../../assets/blackLogo.png";
import styles from './navBar.module.css';


export function Navbar() {
  return (
    <div className={styles.header}>
      <NavLink activeClassName="activeNav" to="/home">
        <img className={styles.logo} src={logoSrc} alt="miao" />
      </NavLink>
      <div className={styles.links}>
        <NavLink activeClassName="activeNav" to="/home">
          Home
        </NavLink>
        <NavLink activeClassName="activeNav" to="/meals">
          All Meals
        </NavLink>
        <NavLink activeClassName="activeNav" to="/sideMeals">
          All Side Meals
        </NavLink>
        <NavLink activeClassName="activeNav" to="/about">
          About
        </NavLink>
        {/* {props.isLogged ? <NavLink activeClassName="activeNav" to="/login">Login</NavLink> : <a href='logout'>logout</a>} */}
        {!sessionStorage.getItem('logedInUser') ? <NavLink activeClassName="activeNav" to="/login" >Login</NavLink> : <a href='logout'>logout</a>}
      </div>
    </div>
  );
}
