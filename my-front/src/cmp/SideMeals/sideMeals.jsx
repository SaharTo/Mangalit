import styles from "./sideMeals.module.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export class SideMeals extends Component {
  state = {
    sideMeals: null,
    filter: '',
    smToshow: null,
  };
  componentDidMount() {
    this.getSideMeals();
  }

  getSideMeals = async () => {
    fetch("http://localhost:3030/sideMeals", { credentials: "include" })
      .then((res) => res.json())
      .then((sideMeals) => {
        this.setState({ sideMeals })
        this.setState({ smToshow: sideMeals })
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleChange = async (ev) => {
    this.setState({ filter: ev.target.value });
    const filterSM = this.state.sideMeals.filter((sm) => sm.sideMealName.toLowerCase().includes(ev.target.value.toLowerCase()))
    this.setState({ smToshow: filterSM })
  };

  render() {
    const { sideMeals, smToshow } = this.state;
    if (!sideMeals || !smToshow) return <h1>Loading...</h1>;
    return (
      <div dir="rtl" className={styles.sideMeals}>
        {sessionStorage.getItem("loggedInUser") && (<Link className={styles.add} to="/sideMeals/edit/">
          הוספת מנת צד
        </Link>)}
        <label htmlFor="filter">
          חיפוש
          <input type="text" id="filter" value={this.state.filter} onChange={this.handleChange} />
        </label>
        <div dir="rtl" className={styles.container}>
          {smToshow.map((sideMeal) => (
            <div dir="rtl" className={styles.preview} key={sideMeal._id}>
              <Link to={"/sideMeals/" + sideMeal._id}>
                <h1>שם המנה: {sideMeal.sideMealName}</h1>
              </Link>
              <p>פירוט על המנה: {sideMeal.sideMealSummary}</p>
              <p>מחיר: {sideMeal.sideMealEstimatedPrice}₪</p>
              {/* <Link to={'/sideMeals/' + sideMeal._id}><img src='sideMeal.sideMealImageUrl' alt="img" /></Link> */}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
