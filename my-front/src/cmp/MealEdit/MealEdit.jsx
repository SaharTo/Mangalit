import React, { Component } from "react";
import styles from "./mealEdit.module.css";
import Chosen from "../helpers/chosen";

export class MealEdit extends Component {
  state = {
    meal: null,
    addOrEdit: null,
    meat: null,
  };
  /*state = {
    addOrEdit: null,
  };*/

  componentDidMount() {
    const id = this.props.match.params.id;
    if (id) {
      this.setState({ addOrEdit: "edit" });
      this.getMeal(id);
    } else {
      this.setState({ addOrEdit: "add" });
      this.getEmptyMeal();
      this.getMeatInfo();
    }
  }
  goBack = () => {
    const id = this.props.match.params.id;
    if (id) {
      this.props.history.push(`/meals/${id}`);
    } else {
      this.props.history.push("/meals/");
    }
  };

  getMeatInfo = async () => {
    fetch(`http://localhost:3030/meats`)
      .then((res) => res.json())
      .then((meat) => this.setState({ meat }))
      //.then((meat) => this.setState({ meat }))
      .catch((error) => {
        console.log(error);
      });
    //const { meat } = this.state;
    console.log("before     ", this.state);
    /*const meatList = this.state.meat.map((mt) => (
      <option value={this.state.meal.mealMeatInfo}>{mt.meatName}</option>
    ));
    this.setState({ meat: meatList });*/
    //console.log("This is the list after   ", this.state.meat);
  };

  getMeal = async (id) => {
    await fetch(`http://localhost:3030/meals/${id}`)
      .then((res) => res.json())
      .then((meal) => this.setState({ meal }))
      .catch((err) => {
        console.log(err);
      });
    this.setState({ meat: this.state.meal.mealMeatInfo });

    //console.log("mmmmmmmmmmmmmmm", this.state.meal);
    //console.log("yyyyy", this.state.meat);
  };
  getEmptyMeal = async () => {
    const meal = {
      mealName: "",
      mealSummary: "",
      mealMeatInfo: [],
      mealPreparationTechniques: "",
      mealPreparationTime: "",
      mealPreparationDifficult: "",
      mealNumberOfPeopleItSuits: "",
      mealRecommendedSideMeals: [],
      mealImage: [],
      mealMeatQuantityGram: "",
      //   mealEstimatedMeatPrice: "",
      mealAdditionalIngredients: "",
      //mealAdditionalsIngredientsPrice: 6,
      mealTotalPrice: "",
      mealDescription: "",
    };
    this.setState({ meal });
  };
  handleChange = ({ target }) => {
    const field = target.id;
    const value = target.value;
    this.setState((prevState) => ({
      meal: { ...prevState.meal, [field]: value },
    }));
  };

  handleSelectChange = (data) => {
    const mealMeatInfo = data.map((m) => m.value);
    this.setState((prevState) => ({
      meal: { ...prevState.meal, mealMeatInfo },
    }));

    // this.state.meal.mealMeatInfo = data.map((m) => m.value);
  };

  onSaveMeal = async (ev) => {
    ev.preventDefault();
    console.log("after     ", this.state);
    const { meal } = this.state;
    const id = this.props.match.params.id;
    if (id) {
      delete meal._id;
      delete meal.mealReviews;
      delete meal.mealAuthor;
      delete meal.mealIsRecommended;
      delete meal.__v;
      fetch(`http://localhost:3030/meals/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ meal: meal }),
      })
        .then(() => this.goBack())
        .catch((err) => console.log(err));
    } else {
      fetch(`http://localhost:3030/meals/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ meal: meal }),
      })
        .then(() => this.goBack())
        .catch((err) => console.log(err));
    }
  };

  render() {
    const { meal, meat, addOrEdit } = this.state;
    /*if (!meal) {
      return <div>Searching the meal... please wait.</div>;
    }
    if (!meat) {
      return <div>Searching the meat... please wait.</div>;
    }*/
    if (!meal || !meat) return <div>Loading...</div>;
    const opt = meat.map((m) => {
      return { label: m.meatName, value: m._id };
    });
    return (
      <div /*dir="rtl"*/ className={styles.edit}>
        {addOrEdit === "edit" && <h1>Edit Meal</h1>}
        {addOrEdit === "add" && <h1>Add Meal</h1>}
        <form className={styles.meal} name="meal">
          <label htmlFor="mealName">
            Name:
            <input
              type="text"
              value={meal.mealName}
              id="mealName"
              name="mealName"
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="mealSummary">
            Summary:
            <input
              type="text"
              value={meal.mealSummary}
              name="mealSummary"
              id="mealSummary"
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="mealDescription">
            Description:
            <textarea
              rows="10"
              cols="50"
              value={meal.mealDescription}
              name="mealDescription"
              id="mealDescription"
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="mealPreparationDifficult">
            Difficult:
            <select
              id="mealPreparationDifficult"
              name="mealPreparationDifficult"
              value={meal.mealPreparationDifficult}
              onChange={this.handleChange}
            >
              <option value="" disabled="disabled">
                בחר
              </option>
              <option value="קל">קל</option>
              <option value="בינוני">בינוני</option>
              <option value="קשה">קשה</option>
            </select>
          </label>
          <label htmlFor="mealPreparationTechniques">
            Techniques:
            <select
              id="mealPreparationTechniques"
              name="mealPreparationTechniques"
              value={meal.mealPreparationTechniques}
              onChange={this.handleChange}
            >
              <option value="" disabled="disabled">
                בחר
              </option>
              <option value="תנור">תנור</option>
              <option value="מנגל">מנגל</option>
              <option value="מחבת">מחבת</option>
              {/*<option value="גז">גז</option>*/}
            </select>
          </label>
          {addOrEdit === "edit" && (
            <label htmlFor="mealMeatInfo">
              Meat Info:
              <input
                type="text"
                value={meal.mealMeatInfo.map((m) => m.meatName)}
                disabled="disabled"
              />
            </label>
          )}
          {addOrEdit === "add" && (
            <label htmlFor="mealMeatInfo">
              Meat Info:
              <Chosen opt={opt} parentCallback={this.handleSelectChange} />
              {/* <MultiSelect
                // id="mealMeatInfo"
                name="mealMeatInfo"
                value={meal.mealMeatInfo}
                onChange={}
                // multiple
                options={opt}
              >
                { {meat.map((opt) => (
                  <option key={opt._id} value={opt._id}>
                    {opt.meatName}
                  </option>
                ))} }
              </MultiSelect> */}
            </label>
          )}
          <label htmlFor="mealMeatQuantityGram">
            Meat Quantity Gram:
            <input
              type="number"
              min="100"
              value={meal.mealMeatQuantityGram}
              name="mealMeatQuantityGram"
              id="mealMeatQuantityGram"
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="mealPreparationTime">
            Preparation Time:
            <input
              type="number"
              min="100"
              value={meal.mealPreparationTime}
              name="mealPreparationTime"
              id="mealPreparationTime"
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="mealAdditionalIngredients">
            Ingriedents:
            <textarea
              rows="3"
              cols="30"
              value={meal.mealAdditionalIngredients}
              name="mealAdditionalIngredients"
              id="mealAdditionalIngredients"
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="mealNumberOfPeopleItSuits">
            People It Suits:
            <input
              type="number"
              min="1"
              max="30"
              value={meal.mealNumberOfPeopleItSuits}
              name="mealNumberOfPeopleItSuits"
              id="mealNumberOfPeopleItSuits"
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="mealTotalPrice">
            Price:
            <input
              type="number"
              min="5"
              value={meal.mealTotalPrice}
              name="mealTotalPrice"
              id="mealTotalPrice"
              onChange={this.handleChange}
            />
          </label>
          <div>
            <button onClick={this.onSaveMeal}>Save</button>
            <button onClick={this.goBack}> Go Back</button>
          </div>
        </form>
      </div>
    );
  }
}
