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

  const sideNavClickHandler = () => {
    document.getElementById("links").classList.toggle(styles.open);
    document.body.classList.toggle("open");
  };

  return (
    <div dir="rtl" id="header" className={styles.header}>
      <NavLink activeClassName="activeNav" to="/home">
        <img className={styles.logo} src={logoSrc} alt="miao" />
      </NavLink>
      <div id="links" className={styles.links} dir="ltr">
        <NavLink activeClassName="activeNav" to="/parts">
          מידע על חלקים
        </NavLink>
        <NavLink activeClassName="activeNav" to="/changePassword">
          שנה סיסמא{" "}
        </NavLink>
        {/* <NavLink activeClassName="activeNav" to="/home">
          עמוד הבית
        </NavLink> */}
        <NavLink activeClassName="activeNav" to="/meals">
          מנות
        </NavLink>
        <NavLink activeClassName="activeNav" to="/sideMeals">
          מנות צד
        </NavLink>
        <NavLink activeClassName="activeNav" to="/about">
          אודות
        </NavLink>
        {!sessionStorage.getItem("loggedInUser") && (
          <NavLink activeClassName="activeNav" to="/signup">
            הרשמה
          </NavLink>
        )}
        {!sessionStorage.getItem("loggedInUser") && (
          <NavLink activeClassName="activeNav" to="/login">
            התחברות
          </NavLink>
        )}
        {sessionStorage.getItem("loggedInUserIsadmin") && (
          <NavLink activeClassName="activeNav" to="/admin">
            אדמין
          </NavLink>
        )}
        {sessionStorage.getItem("loggedInUser") && (
          <a className={styles.logOut} onClick={logout} href="">
            התנתקות
          </a>
        )}
      </div>
      <button onClick={sideNavClickHandler} className={styles.openSideNav}>
        ☰
      </button>
    </div>
  );
}
