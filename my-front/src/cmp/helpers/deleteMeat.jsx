import React, { Component } from "react";
import styles from "./addMeat.module.css";

export class DeleteMeat extends Component {
    state = {
        meatToDelete: null,
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
                    <select id="meatToDelete" onChange={this.handleChangeMeat}>
                        <option value="" disabled="disabled">
                            בשר למחיקה
                        </option>
                        {meats.map((meat) => <option key={meat._id} value={JSON.stringify(meat)}>
                            {meat.meatName}
                        </option>)}
                    </select>
                </label>

                <h2> מחיקת סוג בשר</h2>
                {meatToDelete && <form
                    method="POST"
                    action={`http://localhost:3030/meats/${meatToDelete._id}/?_method=DELETE`}
                    className={styles.meat}
                >
                    <label htmlFor="meatName">
                        {meatToDelete.meatName}
                    </label>
                    <button>מחק</button>
                </form>}
            </div >
        );
    }
}
