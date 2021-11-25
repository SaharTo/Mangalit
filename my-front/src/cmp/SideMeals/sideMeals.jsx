import styles from "./sideMeals.module.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export class SideMeals extends Component {
  state = {
    sideMeals: null,
  };
  componentDidMount() {
    this.getSideMeals();
  }

  getSideMeals = async () => {
    fetch("http://localhost:3030/sideMeals", { credentials: "include" })
      .then((res) => res.json())
      .then((sideMeals) => this.setState({ sideMeals }))
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { sideMeals } = this.state;
    if (!sideMeals) return <h1>Loading...</h1>;
    return (
      <div dir="rtl" className="sideMeals">
        <Link className={styles.add} to="/sideMeals/edit/">
          Add SideMeal
        </Link>
        <div dir="rtl" className={styles.container}>
          {sideMeals.map((sideMeal) => (
            <div dir="rtl" className={styles.preview} key={sideMeal._id}>
              <Link to={"/sideMeals/" + sideMeal._id}>
                <h1>Name: {sideMeal.sideMealName}</h1>
              </Link>
              <p>Summary: {sideMeal.sideMealSummary}</p>
              <p>Price: {sideMeal.sideMealEstimatedPrice}₪</p>
              {/* <Link to={'/sideMeals/' + sideMeal._id}><img src='sideMeal.sideMealImageUrl' alt="img" /></Link> */}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
