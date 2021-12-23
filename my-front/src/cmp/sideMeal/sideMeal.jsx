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
  }
  componentDidUpdate() {
    this.showSlides(this.state.slideIndex);
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
      .then((sideMeal) => {
        this.setState({ sideMeal });
        this.checkLike();
      })
      .catch((err) => {
        alert(err);
      });
  };

  deleteSideMeal = async (sideMealId) => {
    fetch(`http://localhost:3030/sideMeals/${sideMealId}`, {
      credentials: "include",
      method: "DELETE",
    })
      .then(() => this.goBack())
      .catch((err) => {
        alert(err);
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
    const slides = document.getElementsByName("sideMealSlide");
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
    const { sideMeal } = this.state;
    if (sideMeal.sideMealLikes && sideMeal.sideMealLikes.length > 0) {
      for (let i = 0; i < sideMeal.sideMealLikes.length; i++) {
        const id = sideMeal.sideMealLikes[i];
        if (JSON.parse(sessionStorage.getItem("loggedInUser")) === id) {
          this.setState({ islike: true });
        }
      }
    }
  };

  like = () => {
    const id = this.props.match.params.id;
    fetch(`http://localhost:3030/sideMeals/${id}/like`, {
      method: "PUT",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((sideMeal) => {
        this.setState({ sideMeal });
        this.checkLike();
      })
      .catch((err) => {
        alert(err);
      });
  };

  unLike = () => {
    const id = this.props.match.params.id;
    fetch(`http://localhost:3030/sideMeals/${id}/like`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((sideMeal) => {
        this.setState({ sideMeal });
        this.setState({ islike: false });
        this.checkLike();
      })
      .catch((err) => {
        alert(err);
      });
  };

  render() {
    const { sideMeal, islike } = this.state;
    if (!sideMeal) return <h1 dir="rtl">מחפש מנת צד...</h1>;
    return (
      <div className={styles.sideMealPage}>
        <div dir="rtl" className={styles.sideMeal}>
          <div className={styles.continer}>
            <h1>שם המנה: {sideMeal.sideMealName}</h1>
            <p>פירוט: {sideMeal.sideMealSummary}</p>
            <p>רמת קושי: {sideMeal.sideMealDifficult}</p>
            <p>מרכיבים: {sideMeal.sideMealIngriedents}</p>
            <p>אופן ההכנה: {sideMeal.sideMealPreperationDescription}</p>
            <p>זמן ההכנה: {sideMeal.sideMealPreperationEstimatedTime} דקות</p>
            <p>לכמה אנשים זה מתאים: {sideMeal.sideMealnumberOfPeopleItSuits}</p>
            <p>מחיר: {sideMeal.sideMealEstimatedPrice}₪</p>
            {sideMeal.sideMealsAuthor ? (
              <p>יוצר: {sideMeal.sideMealsAuthor.fullName}</p>
            ) : (
              <p>יוצר: לא ידוע</p>
            )}
            {JSON.parse(sessionStorage.getItem("loggedInUser")) &&
              (!islike ? (
                <div dir="ltr">
                  <button className={styles.btnLike} onClick={this.like}>
                    🤍
                  </button>
                  <label>{sideMeal.sideMealLikes.length}</label>
                </div>
              ) : (
                <div dir="ltr">
                  <button className={styles.btnLike} onClick={this.unLike}>
                    ❤️
                  </button>
                  <label>{sideMeal.sideMealLikes.length}</label>
                </div>
              ))}
            {JSON.parse(!sessionStorage.getItem("loggedInUser")) && (
              <div dir="ltr">❤️ {sideMeal.sideMealLikes.length}</div>
            )}
            <div className={styles.continerBtn}>
              {(sideMeal.sideMealsAuthor &&
                JSON.parse(sessionStorage.getItem("loggedInUser")) ===
                sideMeal.sideMealsAuthor._id && (
                  <button
                    className={styles.btn}
                    onClick={(ev) => this.deleteSideMeal(sideMeal._id)}
                  >
                    מחיקה
                  </button>
                )) ||
                (JSON.parse(sessionStorage.getItem("loggedInUserIsadmin")) ===
                  true && (
                    <button
                      className={styles.btn}
                      onClick={(ev) => this.deleteSideMeal(sideMeal._id)}
                    >
                      מחיקה
                    </button>
                  ))}
              {(sideMeal.sideMealsAuthor &&
                JSON.parse(sessionStorage.getItem("loggedInUser")) ===
                sideMeal.sideMealsAuthor._id && (
                  <Link to={"/sideMeals/save/" + sideMeal._id}>
                    <button className={styles.btn}>עריכה</button>
                  </Link>
                )) ||
                (JSON.parse(sessionStorage.getItem("loggedInUserIsadmin")) ===
                  true && (
                    <Link to={"/sideMeals/save/" + sideMeal._id}>
                      <button className={styles.btn}>עריכה</button>
                    </Link>
                  ))}
            </div>
          </div>
          <div className={styles.returnBtn}>
            <button className={styles.btn} onClick={this.goBack}>
              חזרה למנות צד
            </button>
          </div>

          <div className={styles.images}>
            {sideMeal.sideMealImageUrl.length > 0 &&
              sideMeal.sideMealImageUrl.map((url) => (
                <div name="sideMealSlide" key={url}>
                  <img src={url} alt="" />
                </div>
              ))}
            {sideMeal.sideMealImageUrl.length > 1 && (
              <div className={styles.prevNext}>
                <button className={styles.prev} onClick={this.prevSlides}>
                  &#10094;
                </button>
                <button className={styles.next} onClick={this.nextSlides}>
                  &#10095;
                </button>
              </div>
            )}
          </div>
          {
            <Reviews
              className={styles.reviews}
              sideMealId={sideMeal._id}
              reviewList={sideMeal.sideMealsReviews}
            ></Reviews>
          }
        </div >
      </div>
    );
  }
}
