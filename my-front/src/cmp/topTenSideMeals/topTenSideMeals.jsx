import styles from "./topTenSideMeals.module.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export class topTenSideMeals extends Component {
  state = {
    sideMeals: null,
    filter: "",
    smToshow: null,
  };
  componentDidMount() {
    this.getSideMeals();
  }

  getSideMeals = async () => {
    fetch("http://localhost:3030/sideMeals/topTenSideMeals", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((sideMeals) => {
        this.setState({ sideMeals });
        this.setState({ smToshow: sideMeals });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleChange = async (ev) => {
    this.setState({ filter: ev.target.value });
    const filterSM = this.state.sideMeals.filter((sm) =>
      sm.sideMealName.toLowerCase().includes(ev.target.value.toLowerCase())
    );
    this.setState({ smToshow: filterSM });
  };

  render() {
    const { sideMeals, smToshow } = this.state;
    if (!sideMeals || !smToshow) return <h1 dir="rtl">טוען...</h1>;
    return (
      <div dir="rtl" className={styles.sideMeals}>
        {sessionStorage.getItem("loggedInUser") && (
          <Link className={styles.add} to="/sideMeals/save/">
            הוספת מנת צד
          </Link>
        )}
        <div className={styles.searchDiv}>
          <label className={styles.searchLabel} htmlFor="filter">
            חיפוש{" "}
          </label>
        </div>
        <div className={styles.searchDiv}>
          <input
            className={styles.searchInput}
            type="text"
            id="filter"
            value={this.state.filter}
            onChange={this.handleChange}
            placeholder="חפש/י כאן..."
          />
        </div>
        <div dir="rtl" className={styles.container}>
          {smToshow.map((sideMeal) => (
            <div dir="rtl" className={styles.preview} key={sideMeal._id}>
              <img src={sideMeal.sideMealImageUrl[0]} />
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
