import React, { Component } from "react";
import { Link } from "react-router-dom";
import Reviews from "../reviews/reviews";
import styles from "./sideMeal.module.css";
export class SideMeal extends Component {
  state = {
    sideMeal: null,
    slideIndex: 1,
    islike: false,
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
      .then((sideMeal) => {
        this.setState({ sideMeal })
        this.checkLike();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteSideMeal = async (sideMealId) => {
    fetch(`http://localhost:3030/sideMeals/${sideMealId}`, {
      credentials: "include",
      method: "DELETE",
    })
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

  checkLike = () => {
    const { sideMeal } = this.state;
    if (sideMeal.sideMealLikes && sideMeal.sideMealLikes.length > 0) {
      for (let i = 0; i < sideMeal.sideMealLikes.length; i++) {
        const id = sideMeal.sideMealLikes[i];
        if (JSON.parse(sessionStorage.getItem("loggedInUser")) === id) {
          this.setState({ islike: true })
        }
      }
    }
  }

  like = () => {
    const id = this.props.match.params.id;
    fetch(`http://localhost:3030/sideMeals/${id}/like`, {
      method: "PUT",
      credentials: "include",
    })
      .then(() => this.goBack())
      .catch((err) => {
        console.log(err);
      });
  }

  unLike = () => {
    const id = this.props.match.params.id;
    fetch(`http://localhost:3030/sideMeals/${id}/like`, {
      method: "DELETE",
      credentials: "include",
    })
      .then(() => this.goBack())
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { sideMeal, islike } = this.state;
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
          {JSON.parse(sessionStorage.getItem("loggedInUser")) && (!islike ? <button className={styles.btn} onClick={this.like}>like</button> : <button className={styles.btn} onClick={this.unLike}>unLike</button>)}
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
