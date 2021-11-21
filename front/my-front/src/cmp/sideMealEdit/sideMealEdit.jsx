import React, { Component } from "react";
import styles from "./sideMealEdit.module.css";

export class SideMealEdit extends Component {
  state = {
    sideMeal: null,
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    if (id) this.getSideMeal(id);
    else this.getEmptySideMeal();
  }
  goBack = () => {
    const id = this.props.match.params.id;
    if (id) this.props.history.push(`/sideMeals/${id}`);
    else this.props.history.push("/sideMeals/");
  };

  getSideMeal = async (id) => {
    fetch(`http://localhost:3030/sideMeals/${id}`)
      .then((res) => res.json())
      .then((sideMeal) => this.setState({ sideMeal }))
      .catch((err) => {
        console.log(err);
      });
  };
  getEmptySideMeal = async () => {
    const sideMeal = {
      sideMealName: "",
      sideMealSummary: "",
      sideMealDifficult: "",
      sideMealEstimatedPrice: "",
      sideMealIngriedents: "",
      sideMealPreperationDescription: "",
      sideMealPreperationEstimatedTime: "",
      sideMealnumberOfPeopleItSuits: "",
    };
    this.setState({ sideMeal });
  };

  handleChange = ({ target }) => {
    const field = target.id;
    const value = target.value;
    this.setState((prevState) => ({
      sideMeal: { ...prevState.sideMeal, [field]: value },
    }));
  };

  onSaveSideMeal = async (ev) => {
    ev.preventDefault();
    const { sideMeal } = this.state;
    console.log(sideMeal);
    const id = this.props.match.params.id;
    if (id) {
      delete sideMeal._id;
      delete sideMeal.sideMealsReviews;
      delete sideMeal.sideMealsAuthor;
      delete sideMeal.__v;
      fetch(`http://localhost:3030/sideMeals/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sideMeal: sideMeal }),
      })
        .then(() => this.goBack())
        .catch((err) => console.log(err));
    } else {
      fetch(`http://localhost:3030/sideMeals/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sideMeal: sideMeal }),
      })
        .then(() => this.goBack())
        .catch((err) => console.log(err));
    }
  };

  render() {
    const { sideMeal } = this.state;
    if (!sideMeal) return <div>Loading...</div>;
    return (
      <div dir="rtl" className={styles.edit}>
        <h1>Edit SideMeal</h1>
        <form className={styles.sideMeal} name="sideMeal">
          <label htmlFor="sideMealName">
            Name:
            <input
              type="text"
              value={sideMeal.sideMealName}
              id="sideMealName"
              name="sideMealName"
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="sideMealSummary">
            Summary:
            <input
              type="text"
              value={sideMeal.sideMealSummary}
              name="sideMealSummary"
              id="sideMealSummary"
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="sideMealDifficult">
            Difficult:
            <select
              id="sideMealDifficult"
              name="sideMealDifficult"
              value={sideMeal.sideMealDifficult}
              onChange={this.handleChange}
            >
              <option value="" disabled="disabled">
                בחר
              </option>
              <option value="easy">קל</option>
              <option value="medium">בינוני</option>
              <option value="hard">קשה</option>
            </select>
          </label>
          <label htmlFor="sideMealIngriedents">
            Ingriedents:
            <textarea
              rows="3"
              cols="30"
              value={sideMeal.sideMealIngriedents}
              name="sideMealIngriedents"
              id="sideMealIngriedents"
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="sideMealPreperationDescription">
            Description:
            <textarea
              rows="10"
              cols="50"
              value={sideMeal.sideMealPreperationDescription}
              name="sideMealPreperationDescription"
              id="sideMealPreperationDescription"
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="sideMealPreperationEstimatedTime">
            Preperation Time:
            <input
              type="number"
              min="5"
              max="60"
              value={sideMeal.sideMealPreperationEstimatedTime}
              name="sideMealPreperationEstimatedTime"
              id="sideMealPreperationEstimatedTime"
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="sideMealnumberOfPeopleItSuits">
            People It Suits:
            <input
              type="number"
              min="1"
              max="30"
              value={sideMeal.sideMealnumberOfPeopleItSuits}
              name="sideMealnumberOfPeopleItSuits"
              id="sideMealnumberOfPeopleItSuits"
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="sideMealEstimatedPrice">
            Price:
            <input
              type="number"
              min="5"
              max="100"
              value={sideMeal.sideMealEstimatedPrice}
              name="sideMealEstimatedPrice"
              id="sideMealEstimatedPrice"
              onChange={this.handleChange}
            />
          </label>
          <div>
            <button onClick={this.onSaveSideMeal}>Save</button>
            <button onClick={this.goBack}> Go Back</button>
          </div>
        </form>
      </div>
    );
  }
}
