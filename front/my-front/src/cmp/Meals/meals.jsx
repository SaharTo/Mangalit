import React, { Component } from "react";
import { Link } from 'react-router-dom';


export class Meals extends Component {
  state = {
    meals: null,
  };
  componentDidMount() {
    this.getMeals();
  }

  getMeals = async () => {
    fetch('http://localhost:3030/meals')
      .then(res => res.json())
      .then(meals => this.setState({ meals }))
      .catch(err => {
        console.log(err);
      })

  };

  render() {
    const { meals } = this.state;
    if (!meals) return <h1>Loading...</h1>;
    return (
      <div className="container">
        {meals.map((meal) => (
          <div className="preview" key={meal._id}>
            <Link to={'/meals/' + meal._id}><h1>Name: {meal.mealName}</h1></Link>
            <p>Summary: {meal.mealSummary}</p>
            <p>Price: {meal.mealTotalPrice}₪</p>
            {/* <img src='meal.mealImageUrl' alt="img" /> */}
          </div>
        ))}
      </div>
    );
  }
}
