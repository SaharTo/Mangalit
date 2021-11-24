import { useState } from "react";

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
  //console.log("review state    ", reviews);
  //console.log(props.mealId);
  //const ifMeal = `http://localhost:3030/meals/${props.mealId}/review?_method=PUT`;
  // const ifSideMeal = `http://localhost:3030/meals/${props.sideMealId}/review?_method=PUT`;
  return (
    <div>
      <button onClick={showReviewsHandler}>
        click me to see/not see reviews
      </button>
      {/*<button onClick={setReviewsIsShown(!reviewsIsShown)}>x</button>*/}
      {reviews.map(
        (r) =>
          reviewsIsShown && (
            <div key={r._id}>
              {r.reviewAuthor ? (
                <h3>Author Name:{r.reviewAuthor.fullName}</h3>
              ) : (
                <h3>Author: Unknown</h3>
              )}
              <h4>{r.reviewRating}</h4>
              <p>{r.reviewBody}</p>
            </div>
          )
      )}
      <button onClick={createReviewHandler}>Insert A Comment</button>
      {createReviewIsShown && (
        <form
          method="POST"
          action={
            props.mealId
              ? `http://localhost:3030/meals/${props.mealId}/review?_method=PUT`
              : `http://localhost:3030/sideMeals/${props.sideMealId}/review?_method=PUT`
          }
        >
          <label htmlFor="AuthorName">
            {/*here We Need To Insert The LoogedIn User*/}
          </label>
          <label htmlFor="reviewRating">Rate It</label>
          <input
            id="reviewRating"
            type="number"
            min="0"
            max="10"
            name="review[reviewRating]"
          />
          <label htmlFor="reviewBody">Write your review</label>
          <input
            id="reviewBody"
            type="text"
            min="3"
            max="100"
            name="review[reviewBody]"
          ></input>
          <button> miao</button>
        </form>
      )}
    </div>
  );
};
export default Reviews;
