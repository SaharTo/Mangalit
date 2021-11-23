import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from './login.module.css';


export default function Login() {
    let history = useHistory()
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
                if (res.ok) {
                    res.json()
                        .then(data => {
                            sessionStorage.setItem('logedInUser', JSON.stringify(data))
                            history.push('/home')
                            window.location.reload();
                        });
                }
                else res.text()
                    .then(data => console.log(data));
            })
    }

    return (
        <div>
            <form className={styles.login} name="login" onSubmit={login}>
                <input type="text" id="userName" value={user.userName} onChange={handleChange} placeholder="username" />
                <input type="password" id="password" value={user.password} onChange={handleChange} placeholder="password" />
                <button>login</button>
            </form>
        </div>
    );
};

