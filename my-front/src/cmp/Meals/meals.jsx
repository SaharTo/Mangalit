import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./meals.module.css";

export class Meals extends Component {
  state = {
    meals: null,
  };
  componentDidMount() {
    this.getMeals();
  }

  getMeals = async () => {
    fetch("http://localhost:3030/meals")
      .then((res) => res.json())
      .then((meals) => this.setState({ meals }))
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { meals } = this.state;
    if (!meals) return <h1>Loading...</h1>;
    return (
      <div className="meals">
        <Link className={styles.add} to="/meals/edit/">
          Add Meal
        </Link>

        <div className={styles.container}>
          {meals.map((meal) => (
            <div className={styles.preview} key={meal._id}>
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
