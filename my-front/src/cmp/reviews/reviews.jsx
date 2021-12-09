import { useState } from "react";
import styles from "./reviews.module.css";

const Reviews = (props) => {
  const [reviews, setReviews] = useState([]);
  const [reviewsIsShown, setReviewsIsShown] = useState(false);
  const [createReviewIsShown, setCreateReviewIsShown] = useState(false);
  const showReviewsHandler = () => {
    setReviewsIsShown(!reviewsIsShown);
    setReviews(props.reviewList);
  };
  const createReviewHandler = () => {
    setCreateReviewIsShown(!createReviewIsShown);
  };
  const deleteReview = (ev, id) => {
    ev.preventDefault();
    // console.log(`${props.mealId}/review/${id}`);
    if (props.mealId) {
      fetch(`http://localhost:3030/meals/${props.mealId}/review/${id}`, {
        method: "DELETE",
        credentials: "include",
      })
        .then((res) => {
          if (res.ok) {
            res.text().then((data) => {
              console.log(data);
              window.location.reload();
            });
          } else res.text().then((data) => console.log(data));
        });
    }
    if (props.sideMealId) {
      fetch(
        `http://localhost:3030/sideMeals/${props.sideMealId}/review/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      )
        .then((res) => {
          if (res.ok) {
            res.text().then((data) => {
              console.log(data);
              window.location.reload();
            });
          } else res.text().then((data) => console.log(data));
        });
    }
  };
  //console.log("review state    ", reviews);
  //console.log(props.mealId);
  //const ifMeal = `http://localhost:3030/meals/${props.mealId}/review?_method=PUT`;
  // const ifSideMeal = `http://localhost:3030/meals/${props.sideMealId}/review?_method=PUT`;
  return (
    <div>
      <button className={styles.btn} onClick={showReviewsHandler}>לחץ כאן כדי לצפות בתגובות </button>
      {/*<button onClick={setReviewsIsShown(!reviewsIsShown)}>x</button>*/}
      {reviews.map(
        (r) =>
          reviewsIsShown && (
            <div className={styles.review} key={r._id}>
              {r.reviewAuthor ? (
                <h3 className={styles.author}>{r.reviewAuthor.fullName}</h3>
              ) : (
                <h3 className={styles.author}>כותב לא ידוע</h3>
              )}
              <p>{r.reviewBody}</p>
              <h4>{r.reviewRating}</h4>
              {(
                sessionStorage.getItem("loggedInUserIsadmin") === 'true' &&
                <button className={styles.btn} onClick={(ev) => deleteReview(ev, r._id)}>
                  מחק/י תגובה
                </button>
              ) || ((r.reviewAuthor &&
                JSON.parse(sessionStorage.getItem("loggedInUser")) ===
                r.reviewAuthor._id) && (
                  <button className={styles.btn} onClick={(ev) => deleteReview(ev, r._id)}>
                    מחק/י תגובה
                  </button>
                ))
              }
            </div>
          )
      )}
      {sessionStorage.getItem("loggedInUser") && (
        <button onClick={createReviewHandler} className={styles.btn}>הוספת תגובה</button>
      )}
      {createReviewIsShown && (
        <form
          className={styles.grid}
          method="POST"
          action={
            props.mealId
              ? `http://localhost:3030/meals/${props.mealId}/review?_method=PUT`
              : `http://localhost:3030/sideMeals/${props.sideMealId}/review?_method=PUT`
          }
        >
          <label htmlFor="reviewRating">דירוג תגובה</label>
          <input
            id="reviewRating"
            type="number"
            min="0"
            max="10"
            name="review[reviewRating]"
          />
          <label htmlFor="reviewBody">תוכן תגובה</label>
          <input
            id="reviewBody"
            type="text"
            min="3"
            max="100"
            name="review[reviewBody]"
          ></input>
          <button className={styles.btn}> הוסף תגובה</button>
        </form>
      )}
    </div>
  );
};
export default Reviews;
