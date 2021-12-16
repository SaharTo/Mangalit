import React, { Component } from "react";
import { Link } from "react-router-dom";
import Reviews from "../reviews/reviews";
import styles from "./meal.module.css";

export class Meal extends Component {
  state = {
    meal: null,
    slideIndex: 1,
    islike: false,
  };
  componentDidMount() {
    this.getMeal();
  }
  componentDidUpdate() {
    this.showSlides(this.state.slideIndex);
  }

  goBack = () => {
    this.props.history.push("/meals");
  };

  getMeal = async () => {
    const id = this.props.match.params.id;
    fetch(`http://localhost:3030/meals/${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then((meal) => {
        this.setState({ meal });
        this.checkLike();
      })
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
  prevSlides = () => {
    const index = this.state.slideIndex - 1;
    this.setState({ slideIndex: index });
    this.showSlides(index);
  };
  nextSlides = () => {
    const index = this.state.slideIndex + 1;
    this.setState({ slideIndex: index });
    this.showSlides(index);
  };
  showSlides = (num) => {
    const slides = document.getElementsByName("mealSlide");
    if (slides.length > 0) {
      if (num > slides.length) this.setState({ slideIndex: 1 });
      if (num < 1) this.setState({ slideIndex: slides.length });
      for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove(styles.show);
      }
      slides[this.state.slideIndex - 1].classList.add(styles.show);
    }
  };
  checkLike = () => {
    const { meal } = this.state;
    if (meal.mealLikes && meal.mealLikes.length > 0) {
      for (let i = 0; i < meal.mealLikes.length; i++) {
        const id = meal.mealLikes[i];
        if (JSON.parse(sessionStorage.getItem("loggedInUser")) === id) {
          this.setState({ islike: true });
        }
      }
    }
  };

  like = () => {
    const id = this.props.match.params.id;
    fetch(`http://localhost:3030/meals/${id}/like`, {
      method: "PUT",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((meal) => {
        this.setState({ meal });
        this.checkLike();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  unLike = () => {
    const id = this.props.match.params.id;
    fetch(`http://localhost:3030/meals/${id}/like`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((meal) => {
        this.setState({ meal });
        this.setState({ islike: false });
        this.checkLike();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { meal, islike } = this.state;
    if (!meal) return <h1 dir="rtl">טוען...</h1>;
    return (
      <div dir="rtl" className={styles.meal}>
        <div className={styles.continer}>
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
          {JSON.parse(sessionStorage.getItem("loggedInUser")) &&
            (!islike ? (
              <button className={styles.btnLike} onClick={this.like}>
                🤍
              </button>
            ) : (
              <button className={styles.btnLike} onClick={this.unLike}>
                ❤️
              </button>
            ))}
        </div>
        <div className={styles.btns}>
          <button className={styles.btn} onClick={this.goBack}>
            חזרה לכל המנות
          </button>
          {(meal.mealAuthor &&
            JSON.parse(sessionStorage.getItem("loggedInUser")) ===
              meal.mealAuthor._id && (
              <button
                className={styles.btn}
                onClick={(ev) => this.deleteMeal(meal._id)}
              >
                מחיקה
              </button>
            )) ||
            (JSON.parse(sessionStorage.getItem("loggedInUserIsadmin")) ===
              true && (
              <button
                className={styles.btn}
                onClick={(ev) => this.deleteMeal(meal._id)}
              >
                מחיקה
              </button>
            ))}
          {(meal.mealAuthor &&
            JSON.parse(sessionStorage.getItem("loggedInUser")) ===
              meal.mealAuthor._id && (
              <Link to={"/meals/save/" + meal._id}>
                <button className={styles.btn}>עריכה</button>
              </Link>
            )) ||
            (JSON.parse(sessionStorage.getItem("loggedInUserIsadmin")) ===
              true && (
              <Link to={"/meals/save/" + meal._id}>
                <button className={styles.btn}>עריכה</button>
              </Link>
            ))}
          {/*--------
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
              )}*/}
        </div>
        <div className={styles.images}>
          {meal.mealImage.length > 0 &&
            meal.mealImage.map((url) => (
              <div name="mealSlide" key={url}>
                <img src={url} alt="" />
              </div>
            ))}
          {meal.mealImage.length > 1 && (
            <div className={styles.prevNext}>
              <button className={styles.prev} onClick={this.prevSlides}>
                &#10094;
              </button>
              <button className={styles.next} onClick={this.nextSlides}>
                &#10095;
              </button>
            </div>
          )}
          {/* {this.showSlides(this.state.slideIndex)} */}
        </div>
        {<Reviews mealId={meal._id} reviewList={meal.mealReviews}></Reviews>}
      </div>
    );
  }
}
