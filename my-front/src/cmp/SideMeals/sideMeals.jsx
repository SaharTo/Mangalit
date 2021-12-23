import styles from "./sideMeals.module.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export class SideMeals extends Component {
  state = {
    sideMeals: null,
    filter: "",
    smToshow: null,
  };
  componentDidMount() {
    this.getSideMeals();
  }

  getSideMeals = async () => {
    fetch("http://localhost:3030/sideMeals", { credentials: "include" })
      .then((res) => res.json())
      .then((sideMeals) => {
        this.setState({ sideMeals });
        this.setState({ smToshow: sideMeals });
      })
      .catch((err) => {
        alert(err);
      });
  };

  handleChange = async (ev) => {
    this.setState({ filter: ev.target.value });
    const filterSM = this.state.sideMeals.filter((sm) =>
      sm.sideMealName.toLowerCase().includes(ev.target.value.toLowerCase())
    );
    this.setState({ smToshow: filterSM });
  };

  render() {
    const { sideMeals, smToshow } = this.state;
    if (!sideMeals || !smToshow) return <h1 dir="rtl">טוען...</h1>;
    return (
      <div dir="rtl" className={styles.sideMeals}>
        {sessionStorage.getItem("loggedInUser") && (
          <Link className={styles.add} name='add' to="/sideMeals/save/">
            הוספת מנת צד
          </Link>
        )}
        <div className={styles.searchDiv}>
          <label className={styles.searchLabel} htmlFor="filter">
            מנות צד
          </label>
          <input
            className={styles.searchInput}
            type="text"
            id="filter"
            value={this.state.filter}
            onChange={this.handleChange}
            placeholder="חפש/י כאן..."
            autoComplete="off"
          />
        </div>
        <div dir="rtl" className={styles.container}>
          {smToshow.map((sideMeal) => (
            <div dir="rtl" className={styles.preview} key={sideMeal._id}>
              {sideMeal.sideMealImageUrl.length === 0 && <img className={styles.noImg} src="https://res.cloudinary.com/manglit/image/upload/v1640108564/assets/noImage_p7jtki.jpg" alt="" />}
              {sideMeal.sideMealImageUrl.length > 0 && <img src={sideMeal.sideMealImageUrl[0]} alt="" />}
              <Link to={"/sideMeals/" + sideMeal._id}>
                <h1>שם המנה: {sideMeal.sideMealName}</h1>
              </Link>
              <p>פירוט על המנה: {sideMeal.sideMealSummary}</p>
              <p>מחיר: {sideMeal.sideMealEstimatedPrice}₪</p>
              <p dir="ltr">❤️ {sideMeal.sideMealLikes.length}</p>

              {/* <Link to={'/sideMeals/' + sideMeal._id}><img src='sideMeal.sideMealImageUrl' alt="img" /></Link> */}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
