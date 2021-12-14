import React, { useState } from "react";
import styles from "./changePassword.module.css";
import logoSrc from "../../assets/logo.png";

export default function ChangePassword() {
  const [user, setUser] = useState({});

  const handleChange = ({ target }) => {
    const field = target.id;
    const value = target.value;
    user[field] = value;
    setUser(user);
    console.log("inside handlechange func ", user);
  };
  const changePasswordHandler = (ev) => {
    ev.preventDefault();
    if (user.oldPassword && user.firstPassword === user.secondPassword) {
      fetch(`http://localhost:3030/users/changePassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ user }),
      }).then((res) => {
        if (res.ok) {
          //popup message that password changed successfully
        } else
          res
            .text()
            .then((data) =>
              console.log("we have a problem yaani bea'aia beli la'aliv", data)
            );
      });
    }
  };
  return (
    <div>
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
        />
        <input
          type="password"
          className={styles.changePasswordInput}
          id="oldPassword"
          value={user.password}
          onChange={handleChange}
          placeholder="סיסמה קודמת"
        />
        <input
          type="password"
          className={styles.changePasswordInput}
          id="firstNewPassword"
          value={user.firstPassword}
          onChange={handleChange}
          placeholder="סיסמה חדשה"
        />
        <input
          type="password"
          className={styles.changePasswordInput}
          id="secondNewPassword"
          value={user.secondPassword}
          onChange={handleChange}
          placeholder="סיסמה חדשה"
        />
        <button onClick={changePasswordHandler} className={styles.btn}>
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
