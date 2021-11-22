import React, { useState } from "react";
import styles from './login.module.css';

const Login = () => {
    const [user, setUser] = useState({});

    const handleChange = ({ target }) => {
        const field = target.id;
        const value = target.value;
        user[field] = value;
        setUser(user);
    };
    const login = (ev) => {
        ev.preventDefault();
        fetch(`http://localhost:3030/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user: user }),
        })
            .then((res) => {
                if (res.ok) console.log('login', res)
                else console.log('no user please signup', res)
            })
    }

    return (
        <div>
            <form className={styles.login} name="login" onSubmit={login}>
                <input type="text" id="userName" value={user.userName} onChange={handleChange} placeholder="user name" />
                <input type="password" id="password" value={user.password} onChange={handleChange} placeholder="password" />
                <button>login</button>
            </form>
        </div>
    );
};

export default Login;
