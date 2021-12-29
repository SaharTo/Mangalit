import React, { Component } from "react";
import styles from "./meat.module.css";

export class EditMeat extends Component {
    state = {
        meatToEdit: null,
        meats: null,
    }
    componentDidMount() {
        this.getMeats();
    }

    getMeats = async () => {
        fetch(`https://immense-inlet-06578.herokuapp.com/meats`, { credentials: "include" })
            .then((res) => res.json())
            .then((meats) => this.setState({ meats }))
            .catch((error) => {
                alert(error);
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
    }

    updateMeat = async (ev) => {
        ev.preventDefault();
        // console.log("inside the update meat func")
        const { meatToEdit } = this.state;
        if (meatToEdit) {
            fetch(`https://immense-inlet-06578.herokuapp.com/meats/${meatToEdit._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ meat: meatToEdit }),
            }).then((res) => {
                if (res.ok) {
                    res.text().then((data) => {
                        // console.log("after res ok ", data);
                        this.setState({ meatToEdit: null })
                        this.getMeats();
                    });
                } else res.text().then((data) => alert(data));

            })
        }
        if (!meatToEdit) alert('plz select meat')

    }
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
                        <optgroup label="בקר">
                            {meats.filter(meat => meat.meatType === 'בקר').map((meat) => <option key={meat._id} value={JSON.stringify(meat)}>
                                {meat.meatName}
                            </option>)}
                        </optgroup>
                        <optgroup label="כבש">
                            {meats.filter(meat => meat.meatType === 'כבש').map((meat) => <option key={meat._id} value={JSON.stringify(meat)}>
                                {meat.meatName}
                            </option>)}
                        </optgroup>
                        <optgroup label="עוף">
                            {meats.filter(meat => meat.meatType === 'עוף').map((meat) => <option key={meat._id} value={JSON.stringify(meat)}>
                                {meat.meatName}
                            </option>)}
                        </optgroup>
                    </select>
                </label>

                <h2> עדכון סוג בשר</h2>
                {meatToEdit && <form onSubmit={this.updateMeat}
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
                    <button className={styles.btn}>שמור</button>
                </form>}
            </div >
        );
    }
}
