import React, { Component } from "react";
import { Link } from "react-router-dom";
import Reviews from "../reviews/reviews";
import styles from "./sideMeal.module.css";

export class SideMeal extends Component {
  state = {
    sideMeal: null,
    //isAuthor: false,
  };
  async componentDidMount() {
    await this.getSideMeal();
    /*if (
      this.state.sideMeal &&
      JSON.parse(sessionStorage.getItem("loggedInUser")) ===
        this.state.sideMeal.sideMealsAuthor._id
    ) {
      this.setState(true);
    }*/
  }
  goBack = () => {
    this.props.history.push("/sideMeals");
  };

  getSideMeal = async () => {
    const id = this.props.match.params.id;
    fetch(`http://localhost:3030/sideMeals/${id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((sideMeal) => this.setState({ sideMeal }))
      .catch((err) => {
        console.log(err);
      });
  };

  deleteSideMeal = async (sideMealId) => {
    fetch(`http://localhost:3030/sideMeals/${sideMealId}`, {
      credentials: "include",
      method: "DELETE",
    })
      //.then((res) => res.json())
      .then(() => this.goBack())
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { sideMeal } = this.state;
    if (!sideMeal) return <h1 dir="rtl">טוען...</h1>;
    return (
      <div dir="rtl" className={styles.sideMeal}>
        <h1>שם המנה: {sideMeal.sideMealName}</h1>
        <p>פירוט: {sideMeal.sideMealSummary}</p>
        <p>רמת קושי: {sideMeal.sideMealDifficult}</p>
        <p>מרכיבים: {sideMeal.sideMealIngriedents}</p>
        <p>אופן ההכנה: {sideMeal.sideMealPreperationDescription}</p>
        <p>זמן ההכנה: {sideMeal.sideMealPreperationEstimatedTime}</p>
        <p>לכמה אנשים זה מתאים: {sideMeal.sideMealnumberOfPeopleItSuits}</p>
        <p>מחיר: {sideMeal.sideMealEstimatedPrice}₪</p>
        {sideMeal.sideMealsAuthor ? (
          <p>יוצר: {sideMeal.sideMealsAuthor.fullName}</p>
        ) : (
          <p>יוצר: Unknown</p>
        )}
        {sideMeal.sideMealsAuthor &&
          JSON.parse(sessionStorage.getItem("loggedInUser")) ===
            sideMeal.sideMealsAuthor._id && (
            <button
              className={styles.btn}
              onClick={(ev) => this.deleteSideMeal(sideMeal._id)}
            >
              מחיקה{" "}
            </button>
          )}
        {sideMeal.sideMealsAuthor &&
          JSON.parse(sessionStorage.getItem("loggedInUser")) ===
            sideMeal.sideMealsAuthor._id && (
            <Link to={"/sideMeals/edit/" + sideMeal._id}>
              <button className={styles.btn}>עריכה</button>
            </Link>
          )}
        <button className={styles.btn} onClick={this.goBack}>
          חזרה למנות צד
        </button>
        {/* <Link to={'/sideMeals/' + sideMeal._id}><img src='sideMeal.sideMealImageUrl' alt="img" /></Link> */}
        {
          <Reviews
            sideMealId={sideMeal._id}
            reviewList={sideMeal.sideMealsReviews}
          ></Reviews>
        }
      </div>
    );
  }
}
