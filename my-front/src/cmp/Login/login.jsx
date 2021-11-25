import React, { useState } from "react";
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
            sessionStorage.setItem("loggedInUser", JSON.stringify(data));
            history.push("/home");
            window.location.reload();
          });
        } else res.text().then((data) => console.log(data));
      });
    } else console.log("please enter values");
  };

  return (
    <div>
      {/*}  <form method='POST' action='http://localhost:3030/users/login'></form>*/}
      <form className={styles.login} name="login" onSubmit={login}>
        <input
          type="text"
          id="userName"
          value={user.userName}
          onChange={handleChange}
          placeholder="username"
        />
        <input
          type="password"
          id="password"
          value={user.password}
          onChange={handleChange}
          placeholder="password"
        />
        <button>login</button>
      </form>
    </div>
  );
}