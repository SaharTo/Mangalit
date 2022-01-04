import React, { Component } from "react";
import { Link } from "react-router-dom";
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
    fetch("/mangal/meals", { credentials: "include" })
      .then((res) => res.json())
      .then((meals) => {
        this.setState({ meals });
        this.setState({ mToshow: meals });
      })
      .catch((err) => {
        alert(err);
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
          <Link className={styles.add} name='add' to="/meals/save/">
            הוספת מנה
          </Link>
        )}
        <div className={styles.searchDiv}>
          <label className={styles.searchLabel} htmlFor="filter">
            מנות
          </label>
          <input
            className={styles.searchInput}
            type="text"
            id="filter"
            value={this.state.filter}
            onChange={this.handleChange}
            placeholder="חפש/י כאן..."
            autoComplete="off"
          />
        </div>
        {/* <NavLink className={styles.rndMealsLink} to={`/roulette/`}>
          לחץ כדי לעבור גלגל של מנות רנדומליות
        </NavLink> */}

        <div dir="rtl" className={styles.container}>
          {mToshow.map((meal) => (
            <div dir="rtl" className={styles.preview} key={meal._id}>
              <Link to={"/meals/" + meal._id}>
                {meal.mealImage.length === 0 && <img className={styles.noImg} src="https://res.cloudinary.com/manglit/image/upload/v1640108564/assets/noImage_p7jtki.jpg" alt="" />}
                {meal.mealImage.length > 0 && <img src={meal.mealImage[0]} alt='' />}
              </Link>
              <Link to={"/meals/" + meal._id}>
                <h1>שם המנה: {meal.mealName}</h1>
              </Link>
              <p>פירוט על המנה: {meal.mealSummary}</p>
              <p>טכניקת ההכנה: {meal.mealPreparationDifficult}</p>
              <p>זמן הכנה: {meal.mealPreparationTime}</p>
              <p>מחיר: {meal.mealTotalPrice}₪</p>
              <p dir="ltr">❤️ {meal.mealLikes.length}</p>
              {/* <img src='meal.mealImageUrl' alt="img" /> */}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
