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
      fetch(`http://localhost:3030/users/register`, {
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
            history.push("/home");
            window.location.reload();
          });
        } else res.text().then((data) => console.log(data));
      });
    } else console.log("please enter values");
  };

  return (
    <div>
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
        />
        <input
          type="email"
          id="userEmail"
          className={styles.registerInput}
          value={user.userEmail}
          onChange={handleChange}
          placeholder="מייל"
        />
        <input
          type="text"
          id="fullName"
          className={styles.registerInput}
          value={user.fullName}
          onChange={handleChange}
          placeholder="שם מלא"
        />
        <input
          type="password"
          id="password"
          className={styles.registerInput}
          value={user.password}
          onChange={handleChange}
          placeholder="סיסמה"
        />
        <button className={styles.btn}>הרשמה</button>
      </form>
    </div>
  );
}
