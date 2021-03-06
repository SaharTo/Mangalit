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
    fetch(`/mangal/meals/${id}`, { credentials: "include" })
      .then((res) => {
        if (res.ok) {
          res.json()
            .then((meal) => {
              this.setState({ meal });
              this.checkLike();
            })
        }
        else res.text().then((data) => console.log(data));
      })
      .catch((err) => {
        alert(err);
      });
  };


  deleteMeal = async (mealId) => {
    fetch(`/mangal/meals/${mealId}`, {
      method: "DELETE",
      credentials: "include",
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
    fetch(`/mangal/meals/${id}/like`, {
      method: "PUT",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((meal) => {
        this.setState({ meal });
        this.checkLike();
      })
      .catch((err) => {
        alert('cant like: ', err);
      });
  };

  unLike = () => {
    const id = this.props.match.params.id;
    fetch(`/mangal/meals/${id}/like`, {
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
        alert('cant unlike: ', err);
      });
  };

  render() {
    const { meal, islike } = this.state;
    if (!meal) return <h1 dir="rtl">???????? ??????...</h1>;
    return (
      <div className={styles.mealPage}>
        <div dir="rtl" className={styles.meal}>
          <div className={styles.continer}>
            <h1>{meal.mealName}</h1>
            <p>??????????: {meal.mealSummary}</p>
            <p>?????? ????????: {meal.mealPreparationDifficult}</p>
            <div>
              ?????? ??????:
              {meal.mealMeatInfo.map((meat) => {
                return <p key={meat._id}> - {meat.meatName}</p>;
              })}
            </div>
            <p>???????? ???????? (????????): {meal.mealMeatQuantityGram}</p>
            {meal.mealRecommendedSideMeals.map((sideMeal) => {
              return (
                <div key={sideMeal._id}>
                  <p>???????? ???? ??????????????: {sideMeal.sideMealName}</p>
                </div>
              );
            })}
            <p>?????????????? ????????????: {meal.mealAdditionalIngredients}</p>
            <p>???????????? ????????: {meal.mealPreparationTechniques}</p>
            <p>?????? ????????: {meal.mealPreparationTime}</p>
            <p>???????? ??????????:
              <br />
              <textarea className={styles.mealDes} name="mealDescription" id="mealDescription" cols="50" rows="10" readonly>
                {meal.mealDescription}
              </textarea>
            </p>
            <p>???????? ?????????? ???? ??????????: {meal.mealNumberOfPeopleItSuits}</p>
            <p>????????: {meal.mealTotalPrice}???</p>
            {meal.mealAuthor ? (
              <p>????????: {meal.mealAuthor.fullName}</p>
            ) : (
              <p>????????: Unknown</p>
            )}
            {JSON.parse(sessionStorage.getItem("loggedInUser")) &&
              (!islike ? (
                <div dir="ltr">
                  <button className={styles.btnLike} onClick={this.like}>
                    ????
                  </button>
                  <label>{meal.mealLikes.length}</label>
                </div>
              ) : (
                <div dir="ltr">
                  <button className={styles.btnLike} onClick={this.unLike}>
                    ??????
                  </button>
                  <label className={styles}>{meal.mealLikes.length}</label>
                </div>
              ))}
            {JSON.parse(!sessionStorage.getItem("loggedInUser")) && (
              <div dir="ltr">?????? {meal.mealLikes.length}</div>
            )}
            <div className={styles.continerBtn}>
              {(meal.mealAuthor &&
                JSON.parse(sessionStorage.getItem("loggedInUser")) ===
                meal.mealAuthor._id && (
                  <button
                    className={styles.btn}
                    onClick={(ev) => this.deleteMeal(meal._id)}
                  >
                    ??????????
                  </button>
                )) ||
                (JSON.parse(sessionStorage.getItem("loggedInUserIsadmin")) ===
                  true && (
                    <button
                      className={styles.btn}
                      onClick={(ev) => this.deleteMeal(meal._id)}
                    >
                      ??????????
                    </button>
                  ))}

              {(meal.mealAuthor &&
                JSON.parse(sessionStorage.getItem("loggedInUser")) ===
                meal.mealAuthor._id && (
                  <Link to={"/meals/save/" + meal._id}>
                    <button className={styles.btn}>??????????</button>
                  </Link>
                )) ||
                (JSON.parse(sessionStorage.getItem("loggedInUserIsadmin")) ===
                  true && (
                    <Link to={"/meals/save/" + meal._id}>
                      <button className={styles.btn}>??????????</button>
                    </Link>
                  ))}
            </div>
          </div>
          <div className={styles.returnBtn}>
            <button className={styles.btn} onClick={this.goBack}>
              ???????? ?????? ??????????
            </button>
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
          {<Reviews className={styles.reviews} mealId={meal._id} reviewList={meal.mealReviews}></Reviews>}
        </div>
      </div>

    );
  }
}
