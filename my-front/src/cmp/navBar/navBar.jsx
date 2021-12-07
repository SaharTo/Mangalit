import { NavLink } from "react-router-dom";
import logoSrc from "../../assets/logo.png";
import { useHistory } from "react-router-dom";
import styles from "./navBar.module.css";

export function Navbar() {
  let history = useHistory();
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
        res.text().then(() => {
          sessionStorage.removeItem("loggedInUser");
          sessionStorage.removeItem("loggedInUserIsadmin");
          history.push("/home");
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
      <div className={styles.links} dir="ltr">
        <NavLink activeClassName="activeNav" to="/parts">
          מידע על חלקים
        </NavLink>
        <NavLink activeClassName="activeNav" to="/home">
          עמוד הבית
        </NavLink>
        <NavLink activeClassName="activeNav" to="/meals">
          מנות
        </NavLink>
        <NavLink activeClassName="activeNav" to="/sideMeals">
          מנות צד
        </NavLink>
        <NavLink activeClassName="activeNav" to="/about">
          אודות
        </NavLink>
        {sessionStorage.getItem("loggedInUserIsadmin") && (
          <NavLink activeClassName="activeNav" to="/admin">
            אדמין
          </NavLink>
        )}
        {/* {props.isLogged ? <NavLink activeClassName="activeNav" to="/login">Login</NavLink> : <a href='logout'>logout</a>} */}
        {!sessionStorage.getItem("loggedInUser") && (
          <NavLink activeClassName="activeNav" to="/login">
            התחברות
          </NavLink>
        )}
        {!sessionStorage.getItem("loggedInUser") && (
          <NavLink activeClassName="activeNav" to="/signup">
            הרשמה
          </NavLink>
        )}
        {sessionStorage.getItem("loggedInUser") && (
          <a className={styles.logOut} onClick={logout}>
            התנתקות
          </a>
        )}
      </div>
    </div>
  );
}
