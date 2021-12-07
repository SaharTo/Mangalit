import React, { Component } from "react";
import styles from "./addMeat.module.css";

export class EditMeat extends Component {
    state = {
        meatToEdit: null,
        meats: null,
    }
    componentDidMount() {
        this.getMeats();
    }

    getMeats = async () => {
        fetch(`http://localhost:3030/meats`, { credentials: "include" })
            .then((res) => res.json())
            .then((meats) => this.setState({ meats }))
            .catch((error) => {
                console.log(error);
            });
    };

    handleChange = ({ target }) => {
        const field = target.id;
        const value = target.value;
        this.setState((prevState) => ({
            meatToEdit: { ...prevState.meatToEdit, [field]: value },
        }));
    };
    handleChangeMeat = ({ target }) => {
        const value = JSON.parse(target.value);
        this.setState({ meatToEdit: value });
    };
    render() {
        const { meats, meatToEdit } = this.state;
        if (!meats) return <div>Loading...</div>;
        return (
            <div className={styles.meatAddContiner}>
                <h2> בחירת סוג בשר לעדכון</h2>
                <label htmlFor="meatToEdit">
                    <select id="meatToEdit" className={styles.meatSelect} value={JSON.stringify(meatToEdit)} onChange={this.handleChangeMeat}>
                        <option value="null" disabled="disabled">
                            בשר לעדכון
                        </option>
                        {meats.map((meat) => <option key={meat._id} value={JSON.stringify(meat)}>
                            {meat.meatName}
                        </option>)}
                    </select>
                </label>

                <h2> עדכון סוג בשר</h2>
                {meatToEdit && <form
                    method="POST"
                    action={`http://localhost:3030/meats/${meatToEdit._id}/?_method=PUT`}
                    className={styles.meat}
                >
                    <label htmlFor="meatName">
                        <input type="text" name="meat[meatName]" id="meatName" value={meatToEdit.meatName} placeholder="שם הבשר" onChange={this.handleChange} />
                    </label>
                    <label htmlFor="meatType">
                        <select id="meatType" name="meat[meatType]" value={meatToEdit.meatType} onChange={this.handleChange}>
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
                            value={meatToEdit.meatDescription}
                            rows="10"
                            cols="50"
                            name="meat[meatDescription]"
                            id="meatDescription"
                            placeholder="פירוט על הבשר"
                            onChange={this.handleChange} />
                    </label>
                    <label htmlFor="meatNumber">
                        <input type="number" value={meatToEdit.meatNumber} name="meat[meatNumber]" id="meatNumber" min='1' max='20' placeholder="מספר הבשר" onChange={this.handleChange} />
                    </label>
                    <button>שמור</button>
                </form>}
            </div >
        );
    }
}
