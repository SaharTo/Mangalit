import React, { Component } from "react";
import styles from "./home.module.css";
import { Link } from "react-router-dom";
// import fries from "https://res.cloudinary.com/manglit/image/upload/v1640104950/assets/fries_y3ot6h.jpg";
// import meatimg from "https://res.cloudinary.com/manglit/image/upload/v1640104952/assets/meat_wbube1.jpg";
// import randImg from "https://res.cloudinary.com/manglit/image/upload/v1640104955/assets/random_zopmmo.jpg";


export class Home extends Component {
  render() {
    return (
      <div dir="rtl" className={styles.homePage}>
        <h1 className={styles.title}>מנגלית</h1>
        <h4 className={styles.subtitle}>כל</h4>
        <h4 className={styles.subtitle}>שצריך</h4>{" "}
        <h4 className={styles.subtitle}>לדעת</h4>
        <h4 className={styles.subtitle}>לפני</h4>
        <h4 className={styles.subtitle}>שמכינים</h4>
        <h4 className={styles.subtitle}>בשר.</h4>
        <Link to={"/recommendedMeals/"}>
          <div className={styles.recMeals} name='recMeals'>
            <img className={styles.recImage} src="https://res.cloudinary.com/manglit/image/upload/v1640104952/assets/meat_wbube1.jpg" alt="steakImage" />
            <h2> נדב שלטייייי   לחץ/י כאן למנות מומלצות</h2>
            <p>10 המנות האהובות על משתמשי מנגלית</p>
          </div>
        </Link>
        <Link to={"/recommendedSideMeals/"}>
          <div className={styles.recSideMeals} name='recSideMeals'>
            <img className={styles.recImage} src="https://res.cloudinary.com/manglit/image/upload/v1640104950/assets/fries_y3ot6h.jpg" alt="friesImage" />
            <h2>לחץ/י כאן למנות צד מומלצות</h2>
            <p>10 מנות הצד האהובות על משתמשי מנגלית</p>
          </div>
        </Link>
        <Link to={"/roulette/"}>
          <div className={styles.randomMeal} name='randomMeal'>
            <img className={styles.recImage} src="https://res.cloudinary.com/manglit/image/upload/v1640104955/assets/random_zopmmo.jpg" alt="randomMeal" />
            <h2>לחץ/י כאן לבחירת מנה רנדומלית</h2>
            <p>בחירת מנה רנדומלית</p>
          </div>
        </Link>

      </div>
    );
  }
}
