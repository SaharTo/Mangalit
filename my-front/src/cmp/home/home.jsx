import React, { Component } from "react";
import styles from "./home.module.css";
import Beef from "../parts/beef/beef";
import Chicken from "../parts/chicken/chicken";
import Lamb from "../parts/lamb/lamb";

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
        <h4 className={styles.subtitle}>כל מה</h4>
        <h4 className={styles.subtitle}>שצריך לדעת</h4>
        <h4 className={styles.subtitle}>לפני</h4>
        <h4 className={styles.subtitle}>שמכינים בשר.</h4>
        {/* <NavLink className={styles.rndMealsLink} to={`/roulette/`}>
          לחץ כדי לעבור גלגל של מנות רנדומליות
        </NavLink> */}
        {/*<div className={styles.homePage}>
          <label htmlFor="type">
            בחירת סוג בשר
            <select
              name="type"
              id="type"
              value={type}
              onChange={this.handleChange.bind(this)}
            >
              <option value="בקר">בקר</option>
              <option value="כבש">כבש</option>
              <option value="עוף">עוף</option>
            </select>
          </label>

          {type === "בקר" && <Beef />}
          {type === "כבש" && <Lamb />}
          {type === "עוף" && <Chicken />}
        </div>
    */}
      </div>
    );
  }
}
