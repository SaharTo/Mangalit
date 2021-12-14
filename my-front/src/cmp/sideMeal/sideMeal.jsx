import React, { Component } from "react";
import { Link } from "react-router-dom";
import Reviews from "../reviews/reviews";
import styles from "./sideMeal.module.css";
export class SideMeal extends Component {
  state = {
    sideMeal: null,
    slideIndex: 1,
  };

  componentDidMount() {
    this.getSideMeal();
  };

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

  prevSlides = () => {
    const index = this.state.slideIndex - 1
    this.setState({ slideIndex: index })
    this.showSlides(index);
  }
  nextSlides = () => {
    const index = this.state.slideIndex + 1
    this.setState({ slideIndex: index })
    this.showSlides(index);
  }
  showSlides = (num) => {
    const slides = document.getElementsByName("sideMealSlide");
    if (slides.length > 0) {
      if (num > slides.length) this.setState({ slideIndex: 1 })
      if (num < 1) this.setState({ slideIndex: slides.length })
      for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove(styles.show);
      }
      slides[this.state.slideIndex - 1].classList.add(styles.show);
    }
  }

  render() {
    const { sideMeal } = this.state;
    if (!sideMeal) return <h1 dir="rtl">טוען...</h1>;
    return (
      <div dir="rtl" className={styles.sideMeal}>
        <div className={styles.continer}>
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
        </div>
        <div>
          <button className={styles.btn} onClick={this.goBack}>
            חזרה למנות צד
          </button>
          {sideMeal.sideMealsAuthor &&
            JSON.parse(sessionStorage.getItem("loggedInUser")) ===
            sideMeal.sideMealsAuthor._id && (
              <button
                className={styles.btn}
                onClick={(ev) => this.deleteSideMeal(sideMeal._id)}
              >
                מחיקה
              </button>
            )}
          {sideMeal.sideMealsAuthor &&
            JSON.parse(sessionStorage.getItem("loggedInUser")) ===
            sideMeal.sideMealsAuthor._id && (
              <Link to={"/sideMeals/save/" + sideMeal._id}>
                <button className={styles.btn}>עריכה</button>
              </Link>
            )}
        </div>
        {/* <Link to={'/sideMeals/' + sideMeal._id}><img src='sideMeal.sideMealImageUrl' alt="img" /></Link> */}
        {/* {sideMeal.sideMealImageUrl.length > 0 && sideMeal.sideMealImageUrl.map((img) => <img src={img} key={img} />)} */}
        <div className={styles.images}>
          {sideMeal.sideMealImageUrl.length > 0 && <div className={styles.prevNext}>
            <button className={styles.prev} onClick={this.prevSlides}>&#10094;</button>
            <button className={styles.next} onClick={this.nextSlides}>&#10095;</button>
          </div>}
          {sideMeal.sideMealImageUrl.length > 0 && sideMeal.sideMealImageUrl.map((url) =>
            <div name="sideMealSlide" key={url}>
              <img src={url} alt='' />
            </div>
          )}
          {/* {this.showSlides(this.state.slideIndex)} */}
        </div>
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
