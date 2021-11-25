import React, { useState } from "react";
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
      <form className={styles.register} name="register" onSubmit={register}>
        <input
          type="text"
          id="userName"
          value={user.userName}
          onChange={handleChange}
          placeholder="username"
        />
        <input
          type="email"
          id="userEmail"
          value={user.userEmail}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="text"
          id="fullName"
          value={user.fullName}
          onChange={handleChange}
          placeholder="fullName"
        />
        <input
          type="password"
          id="password"
          value={user.password}
          onChange={handleChange}
          placeholder="password"
        />
        <button>signup</button>
      </form>
    </div>
  );
}
