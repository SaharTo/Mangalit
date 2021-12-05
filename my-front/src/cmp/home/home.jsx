import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styles from "./home.module.css";
import Beef from "../parts/beef/beef";
import Chicken from "../parts/chicken/chicken";
import Lamb from "../parts/lamb/lamb";

export class Home extends Component {
  state = {
    type: null,
  }

  componentDidMount() {
    this.setState({ type: 'בקר' });
  }

  handleChange({ target }) {
    console.log(target.value);
    this.setState({ type: target.value });
  }

  render() {
    const { type } = this.state
    console.log(type);
    if (!type) return <div>Loading...</div>
    return (
      <div dir="rtl">
        <div className={styles.homePage}>
          <h1>home page</h1>
          <NavLink className={styles.rndMealsLink} to={`/roulette/`}>
            לחץ כדי לעבור גלגל של מנות רנדומליות
          </NavLink>
          <label htmlFor="type">
            בחירת סוג בשר
            <select name="type" id="type" value={type} onChange={this.handleChange.bind(this)}>
              <option value="בקר">
                בקר
              </option>
              <option value="כבש">
                כבש
              </option>
              <option value="עוף">
                עוף
              </option>
            </select>
          </label>
        </div>
        {type === 'בקר' && <Beef />}
        {type === 'כבש' && <Lamb />}
        {type === 'עוף' && <Chicken />}
      </div>
    );
  }
}
