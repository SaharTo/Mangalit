import { NavLink } from "react-router-dom";
import logoSrc from "../../assets/blackLogo.png";
import styles from "./navBar.module.css";

export function Navbar() {
  const logout = () => {
    fetch(`http://localhost:3030/users/logout`, {
      method: "POST",
      /*headers: {
        "Content-Type": "application/json",
      },*/
      credentials: "include",
      //body: JSON.stringify({ user }),
    }).then((res) => {
      if (res.ok) {
        res.text().then((data) => {
          sessionStorage.removeItem("loggedInUser");
          // history.push("/home");
          window.location.reload();
        });
      } else res.text().then((data) => console.log(data));
    });
  };
  return (
    <div dir="rtl" className={styles.header}>
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
        {!sessionStorage.getItem("loggedInUser") && (
          <NavLink activeClassName="activeNav" to="/login">
            Login
          </NavLink>
        )}
        {!sessionStorage.getItem("loggedInUser") && (
          <NavLink activeClassName="activeNav" to="/signup">
            Signup
          </NavLink>
        )}
        {sessionStorage.getItem("loggedInUser") && (
          <a className={styles.logOut} onClick={logout}>LogOut</a>
        )}
      </div>
    </div>
  );
}
