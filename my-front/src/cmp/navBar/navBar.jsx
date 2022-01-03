import { NavLink } from "react-router-dom";
// import logoSrc from "https://res.cloudinary.com/manglit/image/upload/v1640104950/assets/logo_nlsu44.png";
import { useHistory } from "react-router-dom";
import styles from "./navBar.module.css";

export function Navbar() {
  let history = useHistory();

  const logout = () => {
    fetch(`/mangal/users/logout`, {
      method: "POST",
      /*headers: {
        "Content-Type": "application/json",
      },*/
      credentials: "include",
      //body: JSON.stringify({ user }),
    }).then((res) => {
      if (res.ok) {
        res.text().then(() => {
          closeSideNav();
          sessionStorage.removeItem("loggedInUser");
          sessionStorage.removeItem("loggedInUserIsadmin");
          history.push("/");
          window.location.reload();
        });
      } else res.text().then((data) => alert(data));
    });
  };

  const sideNavClickHandler = () => {
    document.getElementById("links").classList.toggle(styles.open);
    document.body.classList.toggle("open");
  };
  const closeSideNav = () => {
    document.getElementById("links").classList.remove(styles.open);
    document.body.classList.remove("open");
  }

  return (
    <div id="header" className={styles.header}>
      <NavLink activeClassName="activeNav" to="/" onClick={closeSideNav}>
        <img className={styles.logo} src="https://res.cloudinary.com/manglit/image/upload/v1640106848/assets/logo_nlsu44.png" alt="mangalit" />
      </NavLink>
      <div id="links" className={styles.links}>
        <NavLink activeClassName="activeNav" to="/" onClick={closeSideNav}>
          דף הבית
        </NavLink>
        <NavLink activeClassName="activeNav" to="/parts" onClick={closeSideNav}>
          מידע על חלקים
        </NavLink>
        <NavLink activeClassName="activeNav" to="/meals" onClick={closeSideNav}>
          מנות
        </NavLink>
        <NavLink activeClassName="activeNav" to="/sideMeals" onClick={closeSideNav}>
          מנות צד
        </NavLink>
        {/* <NavLink activeClassName="activeNav" to="/about">
          אודות
        </NavLink> */}
        <NavLink activeClassName="activeNav" to="/changePassword" onClick={closeSideNav}>
          שנה סיסמא
        </NavLink>
        {!sessionStorage.getItem("loggedInUser") && (
          <NavLink activeClassName="activeNav" to="/signup" onClick={closeSideNav}>
            הרשמה
          </NavLink>
        )}
        {!sessionStorage.getItem("loggedInUser") && (
          <NavLink activeClassName="activeNav" to="/login" onClick={closeSideNav}>
            התחברות
          </NavLink>
        )}
        {sessionStorage.getItem("loggedInUserIsadmin") && (
          <NavLink activeClassName="activeNav" to="/admin" onClick={closeSideNav}>
            אדמין
          </NavLink>
        )}
        {sessionStorage.getItem("loggedInUser") && (
          <a className={styles.logOut} onClick={logout}>
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
