import React, { useState } from "react";
import logoSrc from "../../assets/logo.png";
import { useHistory } from "react-router-dom";
import styles from "./login.module.css";

export default function Login() {
  let history = useHistory();
  const [user, setUser] = useState({});

  const handleChange = ({ target }) => {
    const field = target.id;
    const value = target.value;
    user[field] = value;
    setUser(user);
  };
  const forgetPassword = (ev) => {
    ev.preventDefault();
    // console.log( window.confirm('dddd'));
    if (window.confirm("האם הנך בטוח/ה שברצונך לאפס את הסיסמא שלך?") === false) return;
    if (user.userName) {
      fetch(`http://localhost:3030/users/sendMyPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ user }),
      }).then((res) => {
        if (res.ok) {
          //sent to email
          res.text().then((data) => alert('סיסמא חדשה נשלחה למייל'));
        } else
          res.text().then((data) => alert(data));
      });
    } else {
      alert("נא להזין שם משתמש");
    }
  };
  const login = (ev) => {
    ev.preventDefault();
    if (user.password && user.userName) {
      fetch(`http://localhost:3030/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ user }),
      }).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            sessionStorage.setItem("loggedInUser", JSON.stringify(data.id));
            if (data.isAdmin)
              sessionStorage.setItem(
                "loggedInUserIsadmin",
                JSON.stringify(data.isAdmin)
              );
            history.push("/");
            window.location.reload();
          });
        } else res.text().then((data) => alert(data));
      });
    } else alert("נא להזין ערכים");
  };

  return (
    <div>
      <div className={styles.logo}>
        <img src={logoSrc} alt="" />
      </div>
      <form dir="rtl" className={styles.login} name="login" onSubmit={login}>
        <div className={styles.title}>
          <h1>התחברות</h1>
        </div>
        <input
          type="text"
          id="userName"
          className={styles.loginInput}
          value={user.userName}
          onChange={handleChange}
          placeholder="שם משתמש"
          required
        />
        <input
          type="password"
          className={styles.loginInput}
          id="password"
          value={user.password}
          onChange={handleChange}
          placeholder="סיסמה"
        />
        <button className={styles.btn}>התחברות</button>
      </form>
      <label className={styles.btn} onClick={forgetPassword}>שכחתי סיסמא</label>
    </div>
  );
}
