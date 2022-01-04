import React, { Component } from "react";
import styles from "./meat.module.css";

export class DeleteMeat extends Component {
    state = {
        meatToDelete: null,
        meats: null,
    }
    componentDidMount() {
        this.getMeats();
    }

    getMeats = async () => {
        fetch(`/mangal/meats`, { credentials: "include" })
            .then((res) => res.json())
            .then((meats) => this.setState({ meats }))
            .catch((error) => {
                console.log(error);
            });
    };

    deleteMeat = async (ev) => {
        ev.preventDefault();
        const { meatToDelete } = this.state;
        fetch(`/mangal/meats/${meatToDelete._id}/`, {
            method: "DELETE",
            credentials: "include",
        }).then((res) => {
            if (res.ok) {
                res.text().then((data) => {
                    // console.log("after res ok ", data);
                    this.setState({ meatToDelete: null })
                    this.getMeats();
                });
            } else res.text().then((data) => alert(data));
        })
    }

    handleChangeMeat = ({ target }) => {
        const value = JSON.parse(target.value);
        this.setState({ meatToDelete: value });
    };

    render() {
        const { meats, meatToDelete } = this.state;
        if (!meats) return <div>Loading...</div>;
        return (
            <div className={styles.meatAddContiner}>
                <h2> בחירת סוג בשר למחיקה</h2>
                <label htmlFor="meatToDelete">
                    <select id="meatToDelete" className={styles.meatSelect} value={JSON.stringify(meatToDelete)} onChange={this.handleChangeMeat}>
                        <option value="null" disabled="disabled">
                            בשר למחיקה
                        </option>
                        <optgroup label="בקר">
                            {meats.filter(meat => meat.meatType === 'בקר').map((meat) => <option key={meat._id} value={JSON.stringify(meat)}>
                                {meat.meatName}
                            </option>)}
                        </optgroup>
                        <optgroup label="טלה">
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

                <h2> מחיקת סוג בשר</h2>
                {meatToDelete && <form className={styles.meat} onSubmit={this.deleteMeat} >
                    <label htmlFor="meatName">
                        {meatToDelete.meatName}
                    </label>
                    <button className={styles.btn}>מחק בשר</button>
                </form>}
            </div >
        );
    }
}
