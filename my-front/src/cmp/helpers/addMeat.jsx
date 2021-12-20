import React, { Component } from "react";
import styles from "./meat.module.css";

export class AddMeat extends Component {
    state = {
        meat: null,
    }
    componentDidMount() {
        this.getEmptyMeat();
    }

    getEmptyMeat = async () => {
        const meat = {
            meatType: "",
            meatName: "",
            meatDescription: "",
            meatNumber: "",
        };
        this.setState({ meat });
    };
    creatMeat = async (ev) => {
        ev.preventDefault();
        const { meat } = this.state;
        fetch(`http://localhost:3030/meats/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ meat: meat }),
        }).then((res) => {
            if (res.ok) {
                res.text().then((data) => {
                    // console.log(data)
                    this.getEmptyMeat();
                });
            } else res.text().then((data) => console.log(data));
        });
    }

    handleChange = ({ target }) => {
        const field = target.id;
        const value = target.value;
        this.setState((prevState) => ({
            meat: { ...prevState.meat, [field]: value },
        }));
    };

    render() {
        const { meat } = this.state;
        if (!meat) return <div>Loading...</div>;
        return (
            <div className={styles.meatAddContiner}>
                <h2> הוספת סוג בשר</h2>
                <form className={styles.meat} onSubmit={this.creatMeat}>
                    <label htmlFor="meatName">
                        <input type="text" id="meatName" value={meat.meatName} placeholder="שם הבשר" onChange={this.handleChange} />
                    </label>
                    <label htmlFor="meatType">
                        <select id="meatType" value={meat.meatType} onChange={this.handleChange}>
                            <option value="" disabled="disabled">
                                סוג בשר
                            </option>
                            <option value="בקר">
                                בקר
                            </option>
                            <option value="כבש">
                                כבש
                            </option>
                            <option value="עוף">
                                עוף
                            </option>
                        </select>
                    </label>
                    <label htmlFor="meatDescription">
                        <textarea
                            value={meat.meatDescription}
                            rows="10"
                            cols="50"
                            id="meatDescription"
                            placeholder="פירוט על הבשר"
                            onChange={this.handleChange} />
                    </label>
                    <label htmlFor="meatNumber">
                        <input type="number" value={meat.meatNumber} id="meatNumber" min='1' max='20' placeholder="מספר הבשר" onChange={this.handleChange} />
                    </label>
                    <button className={styles.btn}>שמור</button>
                </form>
            </div>
        );
    }
}
