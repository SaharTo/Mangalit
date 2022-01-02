import React, { useState } from "react";
import logoSrc from "../../assets/logo.png";
import { useHistory } from "react-router-dom";
import styles from "./register.module.css";

export default function Register() {
  let history = useHistory();
  const [user, setUser] = useState({});

  const handleChange = ({ target }) => {
    const field = target.id;
    const value = target.value;
    user[field] = value;
    setUser(user);
  };
  const register = (ev) => {
    ev.preventDefault();
    if (user.password && user.userName && user.userEmail && user.fullName) {
      fetch(`/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ user }),
      }).then((res) => {
        console.log(res);
        if (res.ok) {
          res.json().then(() => {
            history.push("/");
            window.location.reload();
          });
        } else res.text().then((data) => alert(data));
      });
    } else console.log("please enter values");
  };

  return (
    <div className={styles.registerPage}>
      <div className={styles.logo}>
        <img src={logoSrc} alt="" />
      </div>
      <form
        dir="rtl"
        className={styles.register}
        name="register"
        onSubmit={register}
      >
        <div className={styles.title}>
          <h1>הרשמה</h1>
        </div>
        <input
          type="text"
          id="userName"
          className={styles.registerInput}
          value={user.userName}
          onChange={handleChange}
          placeholder="שם משתמש"
          required
        />
        <input
          type="email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          title="mangalit@example.com הכנס מייל תקין לפי "
          id="userEmail"
          className={styles.registerInput}
          value={user.userEmail}
          onChange={handleChange}
          placeholder="מייל"
          required
        />
        <input
          type="text"
          id="fullName"
          className={styles.registerInput}
          value={user.fullName}
          onChange={handleChange}
          placeholder="שם מלא"
          required
        />
        <input
          type="password"
          id="password"
          className={styles.registerInput}
          value={user.password}
          onChange={handleChange}
          placeholder="סיסמה"
          required
        />
        <button className={styles.btn}>הרשמה</button>
      </form>
    </div>
  );
}
