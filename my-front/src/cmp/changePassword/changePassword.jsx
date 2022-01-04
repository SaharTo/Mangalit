import React, { useState } from "react";
import styles from "./changePassword.module.css";
import { useHistory } from "react-router-dom";
import logoSrc from "../../assets/logo.png";

export default function ChangePassword() {
  let history = useHistory();
  const [user, setUser] = useState({});

  const handleChange = ({ target }) => {
    const field = target.id;
    const value = target.value;
    user[field] = value;
    setUser(user);
    // console.log("inside handlechange func ", user);
  };
  const changePasswordHandler = (ev) => {
    ev.preventDefault();
    if (user.oldPassword && user.firstPassword === user.secondPassword) {
      fetch(`/mangal/users/changePassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ user }),
      }).then((res) => {
        if (res.ok) {
          //popup message that password changed successfully
          res.text().then((data) => alert(data));
          history.push("/");
        } else
          res
            .text()
            .then((data) =>
              alert("we have a problem yaani bea'aia beli la'aliv", data)
            );
      });
    }
  };
  return (
    <div className={styles.changPage}>
      <div className={styles.logo}>
        <img src={logoSrc} alt="" />
      </div>

      <form
        dir="rtl"
        className={styles.change}
        name="changePassword"
        onSubmit={changePasswordHandler}
      >
        <div className={styles.title}>
          <h1>שינוי סיסמא</h1>
        </div>
        <input
          type="text"
          id="userName"
          className={styles.changePasswordInput}
          value={user.userName}
          onChange={handleChange}
          placeholder="שם משתמש"
          required
        />
        <input
          type="password"
          className={styles.changePasswordInput}
          id="oldPassword"
          value={user.password}
          onChange={handleChange}
          placeholder="סיסמה קודמת"
          required
        />
        <input
          type="password"
          className={styles.changePasswordInput}
          id="firstNewPassword"
          value={user.firstPassword}
          onChange={handleChange}
          required
          placeholder="סיסמה חדשה"
        />
        <input
          type="password"
          className={styles.changePasswordInput}
          id="secondNewPassword"
          value={user.secondPassword}
          onChange={handleChange}
          placeholder="סיסמה חדשה"
          required
        />
        <button className={styles.btn}>
          שנה סיסמא
        </button>
      </form>
      {/*<form
        dir="rtl"
        /lassName={styles.forget} name="forget"
        onSubmit={forgetPassword}
      >
        <button className={styles.btn}>שכחתי סיסמא</button>
      </form>*/}
    </div>
  );
}
