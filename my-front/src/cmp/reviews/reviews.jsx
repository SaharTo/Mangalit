import { useState } from "react";
import styles from "./reviews.module.css";

const Reviews = (props) => {
  const [reviews, setReviews] = useState([]);
  const [reviewsIsShown, setReviewsIsShown] = useState(false);
  const [reviewToadd, setReviewToadd] = useState({});

  const showReviewsHandler = () => {
    if (!reviewsIsShown) getReviews();
    setReviewsIsShown(!reviewsIsShown);
  };

  const getReviews = () => {
    if (props.mealId) {
      fetch(`/mangal/meals/${props.mealId}/reviews`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setReviews(data);
          });
        } else res.text().then((data) => alert(data));
      });
    }
    if (props.sideMealId) {
      fetch(`/mangal/sideMeals/${props.sideMealId}/reviews`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setReviews(data);
          });
        } else res.text().then((data) => alert(data));
      });
    }
  }

  const addReview = (ev) => {
    ev.preventDefault();
    if (props.mealId) {
      fetch(`/mangal/meals/${props.mealId}/review`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ review: reviewToadd }),
      }).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setReviews(data);
            setReviewToadd({})
          });
        } else res.text().then((data) => alert(data));
      });
    };
    if (props.sideMealId) {
      fetch(`/mangal/sideMeals/${props.sideMealId}/review`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ review: reviewToadd }),
      }).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setReviews(data);
            setReviewToadd({})
          });
        } else res.text().then((data) => alert(data));
      });
    };


  };

  const deleteReview = (ev, id) => {
    ev.preventDefault();
    if (props.mealId) {
      fetch(`/mangal/meals/${props.mealId}/review/${id}`, {
        method: "DELETE",
        credentials: "include",
      })
        .then((res) => {
          if (res.ok) {
            res.json().then((data) => {
              setReviews(data);
            });
          } else res.text().then((data) => alert(data));
        });
    }
    if (props.sideMealId) {
      fetch(`/mangal/sideMeals/${props.sideMealId}/review/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      )
        .then((res) => {
          if (res.ok) {
            res.json().then((data) => {
              setReviews(data);
            });
          } else res.text().then((data) => alert(data));
        });
    }
  };

  const handleChange = ({ target }) => {
    const field = target.id;
    const value = target.value;
    reviewToadd[field] = value;
    setReviewToadd(reviewToadd)
  };

  return (
    <div className={props.className}>
      {sessionStorage.getItem("loggedInUser") && (
        <form
          className={styles.grid}
          onSubmit={addReview}
        >
          <input
            id="reviewRating"
            type="number"
            min="1"
            max="10"
            value={reviewToadd.reviewRating}
            placeholder="דירוג"
            onChange={handleChange}
            required
          />
          <input
            id="reviewBody"
            type="text"
            value={reviewToadd.reviewBody}
            min="3"
            max="100"
            onChange={handleChange}
            placeholder="תוכן"
            required
          ></input>
          <button className={styles.btn} > הוסף תגובה</button>
        </form>
      )}
      {
        (props.reviewList.length > 0 && <button className={styles.btn} onClick={showReviewsHandler}>לחץ כאן כדי לצפות בתגובות </button>) ||
        (reviews.length > 0 && <button className={styles.btn} onClick={showReviewsHandler}>לחץ כאן כדי לצפות בתגובות </button>)}
      {
        reviews.length > 0 && reviews.map(
          (r) =>
            reviewsIsShown && (
              <div className={styles.review} key={r._id}>
                <div className={styles.reviewName}>
                  {r.reviewAuthor ? (
                    <h3 className={styles.author}>{r.reviewAuthor.fullName}</h3>
                  ) : (
                    <h3 className={styles.author}>כותב לא ידוע</h3>
                  )}
                  {(
                    sessionStorage.getItem("loggedInUserIsadmin") === 'true' &&
                    <button className={styles.deleteBtn} onClick={(ev) => deleteReview(ev, r._id)}>
                      ❌
                    </button>
                  ) || ((r.reviewAuthor &&
                    JSON.parse(sessionStorage.getItem("loggedInUser")) ===
                    r.reviewAuthor._id) && (
                      <button className={styles.deleteBtn} onClick={(ev) => deleteReview(ev, r._id)}>
                        ❌
                      </button>
                    ))}
                </div>
                <div className={styles.reviewComment}>
                  <h4>{r.reviewRating}</h4>
                  <p>{r.reviewBody}</p>
                </div>

              </div>
            )
        )
      }

    </div >
  );
};
export default Reviews;
