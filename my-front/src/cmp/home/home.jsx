import React, { Component } from "react";
import styles from "./home.module.css";
import { Link } from "react-router-dom";
import fries from "../../assets/fries.jpg";
import meatimg from "../../assets/meat.jpg";
import randImg from "../../assets/random.jpg";


export class Home extends Component {
  render() {
    return (
      <div dir="rtl" /*className={styles.homePage}*/>
        <h1 className={styles.title}>מנגלית</h1>
        <h4 className={styles.subtitle}>כל</h4>
        <h4 className={styles.subtitle}>שצריך</h4>{" "}
        <h4 className={styles.subtitle}>לדעת</h4>
        <h4 className={styles.subtitle}>לפני</h4>
        <h4 className={styles.subtitle}>שמכינים</h4>
        <h4 className={styles.subtitle}>בשר.</h4>
        <div className={styles.recMeals} name='recMeals'>
          <img className={styles.recImage} src={meatimg} alt="steakImage" />
          <Link to={"/recommendedMeals/"}>
            <h2>לחץ/י כאן למנות מומלצות</h2>
          </Link>
          <p>10 המנות האהובות על משתמשי מנגלית</p>
        </div>
        <div className={styles.recSideMeals} name='recSideMeals'>
          <img className={styles.recImage} src={fries} alt="friesImage" />
          <Link to={"/recommendedSideMeals/"}>
            <h2>לחץ/י כאן למנות צד מומלצות</h2>
          </Link>
          <p>10 מנות הצד האהובות על משתמשי מנגלית</p>
        </div>

        <div className={styles.randomMeal} name='randomMeal'>
          <img className={styles.recImage} src={randImg} alt="randomMeal" />
          <Link to={"/roulette/"}>
            <h2>לחץ/י כאן לבחירת מנה רנדומלית</h2>
          </Link>
          <p>בחירת מנה רנדומלית</p>
        </div>

      </div>
    );
  }
}
