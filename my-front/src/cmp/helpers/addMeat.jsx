import React, { Component } from "react";
import styles from "./addMeat.module.css";

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
            meatImage: [],
        };
        this.setState({ meat });
    };

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
                <form
                    method="POST"
                    action='http://localhost:3030/meats/'
                    className={styles.meat}
                >
                    <label htmlFor="meatName">
                        <input type="text" name="meat[meatName]" id="meatName" value={meat.meatName} placeholder="שם הבשר" onChange={this.handleChange} />
                    </label>
                    <label htmlFor="meatType">
                        <select id="meatType" name="meat[meatType]" value={meat.meatType} onChange={this.handleChange}>
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
                    <label htmlFor="">
                        <textarea
                            rows="10"
                            cols="50"
                            name="meat[meatDescription]"
                            id="meatDescription"
                            placeholder="פירוט על הבשר"
                            onChange={this.handleChange} />
                    </label>
                    <label htmlFor="">
                        <input type="number" name="meat[meatNumber]" id="meatNumber" min='1' max='20' placeholder="מספר הבשר" onChange={this.handleChange} />
                    </label>
                    <button className={styles.btn}>שמור</button>
                </form>
            </div>
        );
    }
}
