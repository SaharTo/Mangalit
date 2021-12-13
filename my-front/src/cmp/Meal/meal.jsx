import React, { Component } from "react";
import { Link } from "react-router-dom";
import Reviews from "../reviews/reviews";
import styles from "./meal.module.css";

export class Meal extends Component {
  state = {
    meal: null,
  };
  componentDidMount() {
    this.getMeal();
  }

  goBack = () => {
    this.props.history.push("/meals");
  };

  getMeal = async () => {
    const id = this.props.match.params.id;
    fetch(`http://localhost:3030/meals/${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then((meal) => this.setState({ meal }))
      .catch((err) => {
        console.log(err);
      });
  };

  deleteMeal = async (ev, mealId) => {
    fetch(`http://localhost:3030/meals/${mealId}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then(() => this.goBack())
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { meal } = this.state;
    if (!meal) return <h1 dir="rtl">טוען...</h1>;
    return (
      <div dir="rtl" className={styles.meal}>
        <h1>שם המנה: {meal.mealName}</h1>
        <p>פירוט: {meal.mealSummary}</p>
        <p>רמת קושי: {meal.mealPreparationDifficult}</p>
        <div>
          סוג בשר:
          {meal.mealMeatInfo.map((meat) => {
            return <p key={meat._id}> - {meat.meatName}</p>;
          })}
        </div>
        <p>משקל הבשר (בגרם): {meal.mealMeatQuantityGram}</p>
        {meal.mealRecommendedSideMeals.map((sideMeal) => {
          return (
            <div key={sideMeal._id}>
              <p>מנות צד מומלצות: {sideMeal.sideMealName}</p>
            </div>
          );
        })}
        <p>טכניקת הכנה: {meal.mealPreparationTechniques}</p>
        <p>זמן הכנה: {meal.mealPreparationTime}</p>
        <p>מרכיבים נוספים: {meal.mealAdditionalIngredients}</p>
        <p>אופן ההכנה: {meal.mealDescription}</p>
        <p>לכמה אנשים זה מתאים: {meal.mealNumberOfPeopleItSuits}</p>
        <p>מחיר: {meal.mealTotalPrice}₪</p>
        {meal.mealAuthor ? (
          <p>יוצר: {meal.mealAuthor.fullName}</p>
        ) : (
          <p>יוצר: Unknown</p>
        )}
        {meal.mealAuthor &&
          JSON.parse(sessionStorage.getItem("loggedInUser")) ===
          meal.mealAuthor._id && (
            <button
              className={styles.btn}
              onClick={(ev) => this.deleteMeal(ev, meal._id)}
            >
              מחיקת מנה
            </button>
          )}
        {meal.mealAuthor &&
          JSON.parse(sessionStorage.getItem("loggedInUser")) ===
          meal.mealAuthor._id && (
            <Link to={"/meals/save/" + meal._id}>
              <button className={styles.btn}>עריכת מנה</button>
            </Link>
          )}
        <button className={styles.btn} onClick={this.goBack}>
          חזרה לכל המנות
        </button>
        {/* <Link to={'/meals/' + meal._id}><img src='meal.sideMealImageUrl' alt="img" /></Link> */}
        {meal.mealImage.length > 0 && meal.mealImage.map((img) => <img src={img} key={img} />)}
        {<Reviews mealId={meal._id} reviewList={meal.mealReviews}></Reviews>}
      </div>
    );
  }
}
