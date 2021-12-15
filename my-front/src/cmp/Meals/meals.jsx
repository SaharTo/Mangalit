import React, { Component } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import styles from "./meals.module.css";

export class Meals extends Component {
  state = {
    meals: null,
    filter: "",
    mToshow: null,
  };
  componentDidMount() {
    this.getMeals();
  }

  getMeals = async () => {
    fetch("http://localhost:3030/meals", { credentials: "include" })
      .then((res) => res.json())
      .then((meals) => {
        this.setState({ meals });
        this.setState({ mToshow: meals });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleChange = async (ev) => {
    this.setState({ filter: ev.target.value });
    const filterM = this.state.meals.filter((m) =>
      m.mealName.toLowerCase().includes(ev.target.value.toLowerCase())
    );
    this.setState({ mToshow: filterM });
  };

  render() {
    const { meals, mToshow } = this.state;
    if (!meals || !mToshow) return <h1 dir="rtl">טוען...</h1>;
    return (
      <div dir="rtl" className={styles.meals}>
        {sessionStorage.getItem("loggedInUser") && (
          <Link className={styles.add} to="/meals/save/">
            הוספת מנה
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
        <NavLink className={styles.rndMealsLink} to={`/roulette/`}>
          לחץ כדי לעבור גלגל של מנות רנדומליות
        </NavLink>

        <div dir="rtl" className={styles.container}>
          {mToshow.map((meal) => (
            <div dir="rtl" className={styles.preview} key={meal._id}>
              <img src={meal.mealImage[0]}  />
              <Link to={"/meals/" + meal._id}>
                <h1>שם המנה: {meal.mealName}</h1>
              </Link>
              <p>פירוט על המנה: {meal.mealSummary}</p>
              <p>טכניקת ההכנה: {meal.mealPreparationDifficult}</p>
              <p>זמן הכנה: {meal.mealPreparationTime}</p>
              <p>מחיר: {meal.mealTotalPrice}₪</p>
              {/* <img src='meal.mealImageUrl' alt="img" /> */}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
