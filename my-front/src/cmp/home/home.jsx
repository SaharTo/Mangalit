import React, { Component } from "react";
import styles from "./home.module.css";
// import Beef from "../parts/beef/beef";
// import Chicken from "../parts/chicken/chicken";
// import Lamb from "../parts/lamb/lamb";

export class Home extends Component {
  state = {
    type: null,
  };

  componentDidMount() {
    this.setState({ type: "בקר" });
  }

  handleChange({ target }) {
    console.log(target.value);
    this.setState({ type: target.value });
  }

  render() {
    const { type } = this.state;
    if (!type) return <h1 dir="rtl">טוען...</h1>;
    return (
      <div dir="rtl">
        <h1 className={styles.title}>מנגלית</h1>
        <h4 className={styles.subtitle}>כל</h4>
        <h4 className={styles.subtitle}>שצריך</h4>{" "}
        <h4 className={styles.subtitle}>לדעת</h4>
        <h4 className={styles.subtitle}>לפני</h4>
        <h4 className={styles.subtitle}>שמכינים בשר.</h4>
        <div className={styles.recMeals}>
          <h2>לחץ/י כאן למנות מומלצות</h2>
          <p>רשימת המנות המומלצות של מנגלית</p>
          <p>בהתאם לבחירת הגולשים</p>
        </div>
        <div className={styles.recSideMeals}>
          <h2>לחץ/י כאן למנות צד המומלצות</h2>
          <p>רשימת מנות הצד המומלצות של מנגלית</p>
          <p>בהתאם לבחירת הגולשים</p>
        </div>
      </div>
    );
  }
}
