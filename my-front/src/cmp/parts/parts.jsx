import React, { Component } from "react";
import Beef from "./beef/beef";
import Chicken from "./chicken/chicken";
import Lamb from "./lamb/lamb";
import styles from "./parts.module.css";

export class Parts extends Component {
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
    if (!type) return <div>Loading...</div>;
    return (
      <div className={styles.parts}>
        <label dir="rtl" htmlFor="type">
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
    );
  }
}
