import React, { Component } from "react";
import { Link } from "react-router-dom";
import Reviews from "../reviews/reviews";
import styles from "./meal.module.css";

export class Meal extends Component {
  state = {
    meal: null,
  };
  componentDidMount() {
    this.getMeal();
  }

  goBack = () => {
    this.props.history.push("/meals");
  };

  getMeal = async () => {
    const id = this.props.match.params.id;
    fetch(`http://localhost:3030/meals/${id}`)
      .then((res) => res.json())
      .then((meal) => this.setState({ meal }))
      .catch((err) => {
        console.log(err);
      });
  };

  deleteMeal = async (ev, mealId) => {
    fetch(`http://localhost:3030/meals/${mealId}`, { method: "DELETE" })
      .then(() => this.goBack())
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { meal } = this.state;
    if (!meal) return <h1>Loading...</h1>;
    return (
      <div className={styles.meal}>
        <h1>Name: {meal.mealName}</h1>
        <p>Summary: {meal.mealSummary}</p>
        <p>Description: {meal.mealDescription}</p>
        <p>Difficult: {meal.mealPreparationDifficult}</p>
        <div>Meat Name:
          {meal.mealMeatInfo.map((meat) => {
            return (
              <p key={meat._id}> {meat.meatName}</p>
            );
          })}
        </div>
        <p>Meat Quantity Gram: {meal.mealMeatQuantityGram}</p>
        {meal.mealRecommendedSideMeals.map((sideMeal) => {
          return (
            <div key={sideMeal._id}>
              <p>Recommended SideMeals: {sideMeal.sideMealName}</p>
            </div>
          );
        })}
        <p>Preparation Techniques: {meal.mealPreparationTechniques}</p>
        <p>Preperation Time: {meal.mealPreparationTime}</p>
        <p>Preperation Description: {meal.mealPreparationDifficult}</p>
        <p>Additional Ingredients: {meal.mealAdditionalIngredients}</p>
        <p>number Of People It Suits: {meal.mealNumberOfPeopleItSuits}</p>
        <p>Price: {meal.mealTotalPrice}₪</p>
        {meal.mealAuthor ? <p>Author: {meal.mealAuthor.fullName}</p> : <p>Author: Unknown</p>}
        <button onClick={(ev) => this.deleteMeal(ev, meal._id)}> delete</button>
        <Link to={"/meals/edit/" + meal._id}>
          <button> Edit</button>
        </Link>
        <button onClick={this.goBack}> Back To All Meals</button>
        {/* <Link to={'/meals/' + meal._id}><img src='meal.sideMealImageUrl' alt="img" /></Link> */}
        {<Reviews mealId={meal._id} reviewList={meal.mealReviews}></Reviews>}
      </div>
    );
  }
}
