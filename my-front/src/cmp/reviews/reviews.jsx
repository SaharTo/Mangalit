import { useState } from "react";
import styles from "./reviews.module.css";

const Reviews = (props) => {
  const [reviews, setReviews] = useState([]);
  const [reviewsIsShown, setReviewsIsShown] = useState(false);
  const [reviewToadd, setReviewToadd] = useState({});

  const showReviewsHandler = () => {
    setReviewsIsShown(!reviewsIsShown);
    getReviews()
  };
  const getReviews = () => {
    //bring from back
    if (props.mealId) {
      fetch(`http://localhost:3030/meals/${props.mealId}/reviews`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        //body: JSON.stringify({ review: reviewToadd }),
      }).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            console.log("inside getReviews func, this is the return data ", data);
            //adjust
            //setReviews()
            //console.log(data);
            setReviews(data);
            console.log("this is the reviews state ", reviews)
            //
          });
        } else res.text().then((data) => console.log(data));
      });
    }
    if (props.sideMealId) {
      fetch(`http://localhost:3030/sideMeals/${props.sideMealId}/reviews`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        //body: JSON.stringify({ review: reviewToadd }),
      }).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            console.log("inside getReviews func, this is the return data ", data);
            //adjust
            setReviews(data);
            console.log("this is the reviews state ", reviews);
            //
          });
        } else res.text().then((data) => console.log(data));
      });
    }
  }

  const addReview = (ev) => {
    ev.preventDefault();
    if (props.mealId) {
      fetch(`http://localhost:3030/meals/${props.mealId}/review`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ review: reviewToadd }),
      }).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setReviewToadd({})
            //getReviews()
            //adjust
            //console.log(data);
            setReviews(data);
            //
          });
        } else res.text().then((data) => console.log(data));
      });
    };
    if (props.sideMealId) {
      fetch(`http://localhost:3030/sideMeals/${props.sideMealId}/review`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ review: reviewToadd }),
      }).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            //adjust
            setReviewToadd({})
            //getReviews()

            /*console.log(data);*/
            setReviews(data);
            //
          });
        } else res.text().then((data) => console.log(data));
      });
    };
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
            res.json().then((data) => {
              //adjust
              console.log(data);
              setReviews(data);
              //
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
            res.json().then((data) => {
              //adjust
              console.log(data);
              setReviews(data);
              //
            });
          } else res.text().then((data) => console.log(data));
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
            min="0"
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
      <button className={styles.btn} onClick={showReviewsHandler}>לחץ כאן כדי לצפות בתגובות </button>
      {reviews.length > 0 && reviews.map(
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
      )}

    </div>
  );
};
export default Reviews;
